"use server";
import prisma from "@/lib/db";
import { checkPermission } from "@/utils/facades/serverFacades/scurityFacade";
import { tenantModuleScope } from "./tenantFacade";
import { getMembership } from "@/utils/facades/serverFacades/userFacade";

export const getAllTenants = async () => {
  const { permissions } = await getMembership();

  checkPermission(permissions, tenantModuleScope);

  return await prisma.profile.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      profileMemberships: {
        include: {
          user: true,
        },
      },
      Amounts: {
        include: {
          Currency: true,
        },
      },
    },
  });
};

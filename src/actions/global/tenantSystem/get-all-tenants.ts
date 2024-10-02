"use server";
import prisma from "@/lib/db";
import { checkPermission } from "@/utils/facades/serverFacades/securityFacade";
import { tenantModuleScope } from "./tenantFacade";
import { getMembership } from "@/utils/facades/serverFacades/userFacade";

export const getAllTenants = async () => {
  const { userMembership } = await getMembership();
  const permissions = userMembership.permissions.map((p) => p.name);

  checkPermission(permissions, tenantModuleScope);

  return await prisma.organization.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      userMemberships: {
        include: {
          user: true,
        },
      },
    },
  });
};

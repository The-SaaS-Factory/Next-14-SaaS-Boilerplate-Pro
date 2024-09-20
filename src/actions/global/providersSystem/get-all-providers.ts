"use server";
import prisma from "@/lib/db";
import { checkPermission } from "@/utils/facades/serverFacades/scurityFacade";
import { getMembership } from "@/utils/facades/serverFacades/userFacade";
import { providerModuleScope } from "./providerFacade";

export const getAllProviders = async () => {
  const { permissions } = await getMembership();

  checkPermission(permissions, providerModuleScope);

  return await prisma.provider.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      settings: true,
    },
  });
};

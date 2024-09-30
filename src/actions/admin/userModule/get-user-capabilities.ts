"use server";
import prisma from "@/lib/db";
import { getMembership } from "@/utils/facades/serverFacades/userFacade";

export const getUserCapabilities = async () => {
  
  const { organization } = await getMembership();

  return await prisma.organizationCapabilities.findMany({
    where: {
      organizationId: organization.id,
    },
  });
};

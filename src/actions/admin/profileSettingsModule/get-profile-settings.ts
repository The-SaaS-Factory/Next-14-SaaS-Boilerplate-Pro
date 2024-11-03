"use server";
import prisma from "@/lib/db";
import { getMembership } from "@/utils/facades/serverFacades/userFacade";

export const getProfileSettings = async () => {
  
  const { organization } = await getMembership();

  return await prisma.organizationSetting.findMany({
    where: { organizationId: organization.id },
  });
};

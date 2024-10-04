"use server";

import prisma from "@/lib/db";
import { refreshOrganizationData } from "@/utils/facades/serverFacades/organizationFacade";
import { getMembership } from "@/utils/facades/serverFacades/userFacade";

export const makeOrganizationOnboardingCompleted = async () => {
  const { organization } = await getMembership();

  await prisma.organization.update({
    where: {
      id: organization.id,
    },
    data: {
      isOnboardingCompleted: true,
    },
  });

  refreshOrganizationData();

  return "ok";
};

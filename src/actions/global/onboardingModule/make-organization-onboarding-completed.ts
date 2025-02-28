"use server";

import { constants } from "@/lib/constants";
import prisma from "@/lib/db";
import { checkMarketingActionsOnRegister } from "@/utils/facades/serverFacades/marketingFacade";
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

  !constants.demoMode && checkMarketingActionsOnRegister(organization.id);

  refreshOrganizationData();

  return "ok";
};

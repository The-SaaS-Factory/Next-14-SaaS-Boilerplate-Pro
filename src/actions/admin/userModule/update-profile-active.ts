"use server";

import prisma from "@/lib/db";
import { refreshOrganizationData } from "@/utils/facades/serverFacades/organizationFacade";
import { getMembership } from "@/utils/facades/serverFacades/userFacade";
export const updateUserProfileActive = async (organizationId: number) => {
  const { user } = await getMembership();


  await prisma.userMembership.updateMany({
    where: {
      userId: user.id,
    },
    data: {
      isActive: false,
    },
  });

  const userMembership = await prisma.userMembership.findFirst({
    where: {
      organizationId: organizationId,
      userId: user.id,
    },
  });


  const newUserMembership = await prisma.userMembership.update({
    where: {
      id: userMembership.id,
    },
    data: {
      isActive: true,
    },
  });

  refreshOrganizationData();

  return newUserMembership;
};

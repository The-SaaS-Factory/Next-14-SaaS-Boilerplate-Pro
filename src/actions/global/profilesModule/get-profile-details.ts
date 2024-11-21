"use server";

import prisma from "@/lib/db";
import { getMembership } from "@/utils/facades/serverFacades/userFacade";

export const getProfileDetails = async ({
  profileId,
}: {
  profileId: number;
}) => {
  const { organization } = await getMembership();
  
  return await prisma.profile.findUnique({
    where: {
      organizationId: organization.id,
      id: profileId,
    },
    include: {
      organization: true,
      settings: true,
    },
  });
};

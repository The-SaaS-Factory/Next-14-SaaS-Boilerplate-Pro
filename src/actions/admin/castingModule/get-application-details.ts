"use server";

import { getMembership } from "@/utils/facades/serverFacades/userFacade";

import prisma from "@/lib/db";

export const getApplicationDetails = async (applicationId: number) => {
  const { profile } = await getMembership();

  let orWhere = [
    {
      casting: {
        profileId: profile.id,
      },
    },
    {
      profileId: profile.id,
    },
  ];

  const application = await prisma.castingAplication.findUnique({
    where: {
      id: applicationId,
      OR: orWhere,
    },
    include: {
      casting: {
        include: {
          profile: true,
        },
      },
      informations: true,
      profile: true,
      role: true,
    },
  });

  return application;
};

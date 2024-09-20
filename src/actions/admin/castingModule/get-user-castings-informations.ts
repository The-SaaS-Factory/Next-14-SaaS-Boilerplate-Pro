"use server";
import prisma from "@/lib/db";

import { getMembership } from "@/utils/facades/serverFacades/userFacade";

export const getUserCastingInformations = async () => {
  const { profile } = await getMembership();

  return await prisma.castingInformations.findMany({
    where: {
      profileId: profile.id,
    },
  });
};

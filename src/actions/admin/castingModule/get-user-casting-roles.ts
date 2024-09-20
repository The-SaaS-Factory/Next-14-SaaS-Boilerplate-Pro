"use server";
import prisma from "@/lib/db";

import { getMembership } from "@/utils/facades/serverFacades/userFacade";
export const getUserCastingRoles = async () => {
  const { profile } = await getMembership();

  return await prisma.castingRoles.findMany({
    where: {
      profileId: profile.id,
    },
  });
};

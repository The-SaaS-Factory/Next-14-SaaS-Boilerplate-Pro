"use server";

import prisma from "@/lib/db";
import { getMembership } from "@/utils/facades/serverFacades/userFacade";

export const getCastingRoleDetails = async (roleId: number) => {
  const castingRoles = await prisma.castingRoles.findFirst({
    where: {
      id: roleId,
    },
  });

  return castingRoles;
};

export const getCastingRoles = async () => {
  const { profile } = await getMembership();

  const castingRoles = await prisma.castingRoles.findMany({
    where: {
      profileId: profile.id
    },
  });

  return castingRoles;
};



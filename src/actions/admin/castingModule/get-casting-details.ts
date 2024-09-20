"use server";

import { getMembership } from "@/utils/facades/serverFacades/userFacade";
import { Prisma } from "@prisma/client";
import prisma from "@/lib/db";
import { hasPermission } from "@/utils/facades/serverFacades/scurityFacade";

export const getCastingDetails = async (castingId: number) => {
  const { profile } = await getMembership();

  let ANDQUERY: Prisma.CastingWhereInput[] = [];

  if (hasPermission(profile.permissions, "superAdmin:castings:read")) {
    ANDQUERY = [
      {
        id: castingId,
      },
    ];
  } else {
    ANDQUERY = [
      {
        id: castingId,
        profileId: profile.id,
      },
    ];
  }

  const casting = await prisma.casting.findFirst({
    where: {
      AND: ANDQUERY,
    },
    include: {
      profile: true,
      categories: true,
      roles: true,
      aplications: true,
      informations: true,
    },
  });
  return casting;
};


export const getCastingDetailsForAllUsers = async (castingId: number) => {
  const casting = await prisma.casting.findFirst({
    where: {
      id: castingId,
    },
    include: {
      profile: true,
      categories: true,
      roles: true,
      aplications: true,
      informations: true,
    },
  });

  return casting;
};

export const getCastingApplications = async (castingId: number) => {
  const casting = await prisma.castingAplication.findMany({
    where: {
      castingId: castingId,
    },
    include: {
      profile: true,
      informations: true,
      role: true,
    },
  });

  return casting;
}

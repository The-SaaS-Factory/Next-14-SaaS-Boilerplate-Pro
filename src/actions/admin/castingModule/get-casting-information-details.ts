"use server";

 
import { getMembership } from "@/utils/facades/serverFacades/userFacade";
import { Prisma } from "@prisma/client";
import prisma from "@/lib/db";
import { hasPermission } from "@/utils/facades/serverFacades/scurityFacade";

export const getCastingInformationsDetails = async (informationId: number) => {

 const { profile } = await getMembership();

  let ANDQUERY: Prisma.CastingInformationsWhereInput[] = [];

  if (hasPermission(profile.permissions, "superAdmin:castings:read")) {
    ANDQUERY = [
      {
        id: informationId,
      },
    ];
  } else {
    ANDQUERY = [
      {
        id: informationId,
      },
    ];
  }

  const information = await prisma.castingInformations.findFirst({
    where: {
      AND: ANDQUERY,
    },
  });

  return information;
};

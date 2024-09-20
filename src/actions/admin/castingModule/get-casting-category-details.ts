"use server";

 
import { getMembership } from "@/utils/facades/serverFacades/userFacade";
import { Prisma } from "@prisma/client";
import prisma from "@/lib/db";
import { hasPermission } from "@/utils/facades/serverFacades/scurityFacade";

export const getCastingCategoryDetails = async (informationId: number) => {





  const { profile } = await getMembership();

  let ANDQUERY: Prisma.CastingCategoryWhereInput[] = [];

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

  const information = await prisma.castingCategory.findFirst({
    where: {
      AND: ANDQUERY,
    },
  });

  return information;
};

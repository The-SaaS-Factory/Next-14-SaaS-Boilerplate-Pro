"use server";
import prisma from "@/lib/db";
 
import { getMembership } from "@/utils/facades/serverFacades/userFacade";
import { CastingAplicationStatus } from "@prisma/client";

export const getAgencyApplications = async ({
  status,
}: {
  status: CastingAplicationStatus;
}) => {



 const { profile } = await getMembership();

  const aplications = await prisma.castingAplication.findMany({
    where: {
      status,
      casting: {
        userId: profile.id,
      },
    },
    include: {
      casting: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return aplications;
};

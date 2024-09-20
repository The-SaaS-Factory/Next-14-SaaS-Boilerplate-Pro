"use server";
import prisma from "@/lib/db";

import { CastingAplicationStatus } from "@prisma/client";

export const getModelApplications = async ({
  status,
}: {
  status: CastingAplicationStatus;
}) => {

  const aplications = await prisma.castingAplication.findMany({
    where: {
      status,
    },
    include: {
      casting: true
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return aplications;
};

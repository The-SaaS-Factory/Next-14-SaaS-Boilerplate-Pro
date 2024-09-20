"use server";

import { CastingStatus } from "@prisma/client";
import prisma from "@/lib/db";
 
export const getCastingDetailsPublic = async (castingId: number) => {
 
  const casting = await prisma.casting.findFirst({
    where: {
      status: CastingStatus.OPEN,
      id: castingId,
    },
    include: {
      // user: {
      //   select: {
      //     id: true,
      //     name: true,
      //     avatar: true,
      //     email: true,
      //   },
      // },
      categories: true,
      roles: true,
      aplications: true,
      informations: true,
    },
  });

  return casting;
};

"use server";

import prisma from "@/lib/db";
import { getMembership } from "@/utils/facades/serverFacades/userFacade";

export const getTenantMembers = async () => {
  const { profile } = await getMembership();

  return await prisma.profileMembership.findMany({
    where: {
      profileId: profile.id,
    },
    include: {
      user: {
        select: {
          email: true,
          name: true,
        },
      },
      permissions: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
};

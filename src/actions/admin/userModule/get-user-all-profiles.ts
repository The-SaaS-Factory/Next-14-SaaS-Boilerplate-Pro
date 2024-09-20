"use server";

import { authOptions } from "@/actions/nextauth";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";

export const getUserAllProfiles = async () => {
  const session = await getServerSession(authOptions);

  return await prisma.profile.findMany({
    where: {
      profileMemberships: {
        some: {
          user: {
            id: Number(session?.user.id),
          },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

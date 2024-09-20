"use server";

import { authOptions } from "@/actions/nextauth";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";

export const updateUserProfileActive = async (profileId: number) => {
  const session = await getServerSession(authOptions);

  await prisma.profileMembership.updateMany({
    where: {
      userId: Number(session?.user?.id),
    },
    data: {
      isActive: false,
    },
  });

  return await prisma.profileMembership.update({
    where: {
      id: profileId,
      userId: Number(session?.user?.id),
    },
    data: {
      isActive: true,
    },
  });
};

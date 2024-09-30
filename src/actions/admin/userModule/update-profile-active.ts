"use server";

import { authOptions } from "@/actions/nextauth";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";

export const updateUserProfileActive = async (organizationId: number) => {
  const session = await getServerSession(authOptions);

  await prisma.userMembership.updateMany({
    where: {
      userId: Number(session?.user?.id),
    },
    data: {
      isActive: false,
    },
  });

  return await prisma.userMembership.update({
    where: {
      id: organizationId,
      userId: Number(session?.user?.id),
    },
    data: {
      isActive: true,
    },
  });
};

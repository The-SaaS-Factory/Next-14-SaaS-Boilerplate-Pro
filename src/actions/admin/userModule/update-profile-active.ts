"use server";

import { authOptions } from "@/actions/nextauth";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { userAgent } from "next/server";

export const updateUserProfileActive = async (organizationId: number) => {
  const session = await getServerSession(authOptions);

  const user = await prisma.user.findFirst({
    where: {
      email: session.user.email,
    },
  });

  await prisma.userMembership.updateMany({
    where: {
      userId: user.id,
    },
    data: {
      isActive: false,
    },
  });

  return await prisma.userMembership.update({
    where: {
      id: organizationId,
      userId: user.id,
    },
    data: {
      isActive: true,
    },
  });
};

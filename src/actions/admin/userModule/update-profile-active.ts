"use server";

import { authOptions } from "@/actions/nextauth";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";

export const updateUserProfileActive = async (organizationId: number) => {
  console.log(organizationId);

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

  const userMembership = await prisma.userMembership.findFirst({
    where: {
      organizationId: organizationId,
      userId: user.id,
    },
  });

  return await prisma.userMembership.update({
    where: {
      id: userMembership.id,
    },
    data: {
      isActive: true,
    },
  });
};

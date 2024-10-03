"use server";

import { authOptions } from "@/actions/nextauth";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";

export const getUserAllOrganizations = async () => {
  const session = await getServerSession(authOptions);

  return await prisma.organization.findMany({
    where: {
      userMemberships: {
        some: {
          user: {
            email: session?.user.email,
          },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

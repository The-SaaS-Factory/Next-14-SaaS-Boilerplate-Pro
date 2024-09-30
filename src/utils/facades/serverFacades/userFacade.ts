"use server";

import { authOptions } from "@/actions/nextauth";
import { IUserMembership } from "@/interfaces/saasTypes";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const getMembership = async () => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const membership: IUserMembership = await prisma.userMembership.findFirst({
    where: {
      user: {
        id: Number(session.user.id),
      },
      OR: [{ isActive: true }, { isActive: false }],
    },
    orderBy: {
      isActive: "desc",
    },
    include: {
      permissions: true,
      settings: true,
      organization: {
        include: {
          permissions: true,
          membership: true,
        },
      },
      user: true,
    },
  });

  if (!membership) {
    throw new Error("User does not have an active or inactive membership");
  }

  const authData = {
    userMembership: {
      id: membership.id,
      role: membership.role,
      name: membership.user.name,
      settings: membership.settings,
      permissions: membership.permissions,
    },
    user: {
      id: membership.user.id,
      name: membership.user.name,
      email: membership.user.email,
    },
    organization: {
      id: membership.organization?.id,
      name: membership.organization.name,
      avatar: membership.organization.avatar,
      status: membership.organization.status,
      permissions: membership.organization.permissions,
      membership: membership.organization.membership,
    },
  };

  return authData;
};

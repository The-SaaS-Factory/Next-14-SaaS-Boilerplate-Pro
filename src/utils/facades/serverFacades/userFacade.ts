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
        email: session.user.email,
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
          subscription: {
            include: {
              plan: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
      user: true,
    },
  });

  if (!membership) {
    redirect("/login");
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
      isOnboardingCompleted:
        membership.organization.isOnboardingCompleted ?? false,
      status: membership.organization.status,
      permissions: membership.organization.permissions,
      subscription: membership.organization.subscription,
    },
  };

  return authData;
};

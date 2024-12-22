"use server";

import { authOptions } from "@/actions/nextauth";
import { IUserMembership } from "@/interfaces/saasTypes";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { cache } from "react";
import { createOrganization } from "./organizationFacade";
import { logout } from "@/actions/auth";

export const getMembership = cache(async () => {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");

  let membership: IUserMembership;

  membership = await prisma.userMembership.findFirst({
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
                include: {
                  PlanCapabilities: true,
                },
              },
            },
          },
          organizationCapabilities: {
            include: {
              capability: true,
            },
          },
        },
      },
      user: true,
    },
  });

  if (!membership) {
    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    //User Registered not have more tenants, then create one
    const newOrganizationPayload = {
      ...user,
      profileName: user.name,
    };

    membership = await createOrganization(newOrganizationPayload);
  }

  if (!membership) {
    logout();
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
      capabilities: membership.organization.organizationCapabilities,
    },
  };

  return authData;
});

"use server";
import prisma from "@/lib/db";
import { checkMarketingActionsOnRegister } from "./marketingFacade";
import { UserMembershipRole } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { notifyToSuperAdmin } from "./notificationFacade";
import { constants } from "@/lib/constants";

export const createOrganization = async (
  user: {
    id: number;
    name?: string;
    email: string;
    profileName?: string;
    address?: string;
    phone?: string;
  },
  isMainTenant?: boolean
) => {
  
  const userDB = await prisma.user.findFirst({
    where: {
      email: user.email,
    },
  });

  const permissions = await prisma.permission.findMany({
    where: {
      name: {
        startsWith: "organization",
      },
    },
  });

  const userMemberships = await prisma.userMembership.findMany({
    where: {
      id: userDB.id,
    },
  });

  await prisma.userMembership.updateMany({
    where: {
      id: {
        in: userMemberships.map((m) => m.id),
      },
    },
    data: {
      isActive: false,
    },
  });

  const org = await prisma.organization.create({
    data: {
      name: user.profileName,
      email: user.email,
      isMainTenant: isMainTenant,
      address: user.address,
      phone: user.phone,
      status: "ACTIVE",
    },
  });

  const newProfileMembership = await prisma.userMembership.create({
    data: {
      user: {
        connect: {
          id: userDB.id,
        },
      },
      organization: {
        connect: {
          id: org.id,
        },
      },
      role: UserMembershipRole.ADMIN,
      isActive: true,
      permissions: {
        connect: permissions,
      },
    },
    include: {
      organization: true,
    },
  });

  checkMarketingActionsOnRegister(newProfileMembership.organization.id);
  notifyToSuperAdmin(`New ${constants.tanantModelName} created`);

  return newProfileMembership;
};

export const refreshOrganizationData = () => {
  revalidatePath("/home", "layout");
};

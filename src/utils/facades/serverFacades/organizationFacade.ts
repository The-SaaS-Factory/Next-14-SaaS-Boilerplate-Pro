"use server";
import prisma from "@/lib/db";
import { checkMarketingActionsOnRegister } from "./marketingFacade";
import { UserMembershipRole } from "@prisma/client";
import { IUserMembership } from "@/interfaces/saasTypes";

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
  const permissions = await prisma.permission.findMany({
    where: {
      name: {
        startsWith: "organization",
      },
    },
  });

  //Desactive all other profiles
  const userMemberships = await prisma.userMembership.findMany({
    where: {
      userId: user.id,
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
          id: user.id,
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

  return newProfileMembership;
};


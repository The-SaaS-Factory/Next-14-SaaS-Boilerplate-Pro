"use server";
import prisma from "@/lib/db";
import { checkMarketingActionsOnRegister } from "./marketingFacade";
import { createAmountByDefaultForAgencies } from "@/actions/admin/walletModule/create-amount-movement";
export const createProfile = async (
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
        startsWith: "agency",
      },
    },
  });

  //Desactive all other profiles
  const userMemberships = await prisma.profileMembership.findMany({
    where: {
      userId: user.id,
    },
  });

  await prisma.profileMembership.updateMany({
    where: {
      id: {
        in: userMemberships.map((m) => m.id),
      },
    },
    data: {
      isActive: false,
    },
  });

  const profile = await prisma.profile.create({
    data: {
      name: user.profileName,
      email: user.email,
      isMainTenant: isMainTenant,
      address: user.address,
      phone: user.phone,
      status: "ACTIVE",
    },
  });

  const newProfileMembership = await prisma.profileMembership.create({
    data: {
      user: {
        connect: {
          id: user.id,
        },
      },
      profile: {
        connect: {
          id: profile.id,
        },
      },
      isActive: true,
      permissions: {
        connect: permissions,
      },
    },
    include: {
      profile: true,
    },
  });

  checkMarketingActionsOnRegister(newProfileMembership.profile.id);
  createAmountByDefaultForAgencies({ id: newProfileMembership.profile.id });

  return newProfileMembership;
};

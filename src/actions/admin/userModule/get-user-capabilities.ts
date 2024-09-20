"use server";
import prisma from "@/lib/db";
import { getMembership,   } from "@/utils/facades/serverFacades/userFacade";

export const getUserCapabilities = async () => {
  const { id } = await getMembership();
  return await prisma.profileCapabilities.findMany({
    where: {
      profileId: id,
    },
  });
};

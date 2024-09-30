"use server";
import prisma from "@/lib/db";
import { getMembership  } from "@/utils/facades/serverFacades/userFacade";
export const getEcommerceBannerDetails = async (bannerId: number) => {
  const { id } = await getMembership();
  return await prisma.banner.findUnique({
    where: {
      id: bannerId,
      organizationId: id,
    },
  });
};

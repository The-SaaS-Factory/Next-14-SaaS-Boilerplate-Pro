"use server";
import prisma from "@/lib/db";
 import { getMembership} from "@/utils/facades/serverFacades/userFacade";
export const getShippingZoneDetails = async (modelId: number) => {
  const { id } = await getMembership();
  return await prisma.profileShippingZone.findUnique({
    where: {
      id: modelId,
      profileId: id,
    },
  });
};

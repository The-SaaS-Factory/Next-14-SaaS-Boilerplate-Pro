"use server";
import prisma from "@/lib/db";
import { getMembership  } from "@/utils/facades/serverFacades/userFacade";
export const getEcommerceCollectionDetails = async (modelId: number) => {
  const { id } = await getMembership();
  return await prisma.collection.findUnique({
    where: {
      id: modelId,
      profileId: id,
    },
  });
};

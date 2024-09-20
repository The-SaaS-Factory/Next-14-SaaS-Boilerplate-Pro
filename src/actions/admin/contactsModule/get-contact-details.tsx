"use server";
import prisma from "@/lib/db";
import { getMembership } from "@/utils/facades/serverFacades/userFacade";

export const getContactDetails = async (modelId: number) => {
  const { id } = await getMembership();

  return await prisma.contacts.findFirst({
    where: {
      id: modelId ? modelId : undefined,
      profileId: id,
    },
  });
};

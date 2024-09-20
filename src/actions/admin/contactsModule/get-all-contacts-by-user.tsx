"use server";
import prisma from "@/lib/db";
import { getMembership } from "@/utils/facades/serverFacades/userFacade";

export const getUserContacts = async () => {
  const { id } = await getMembership();

  return await prisma.contacts.findMany({
    where: {
      profileId: id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

"use server";

import { getMembership } from "@/utils/facades/serverFacades/userFacade";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
export const cancelModelApplication = async (applicationId: number) => {
  const { profile } = await getMembership();

  await prisma.castingAplication.delete({
    where: {
      id: applicationId,
      profileId: profile.id,
    },
  });

  revalidatePath("/home/applications/pendings");

  return true;
};

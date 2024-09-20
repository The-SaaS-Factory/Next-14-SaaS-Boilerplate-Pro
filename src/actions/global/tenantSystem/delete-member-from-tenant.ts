"use server";

import prisma from "@/lib/db";
import { getMembership } from "@/utils/facades/serverFacades/userFacade";
import { revalidatePath } from "next/cache";

export const deleteTenantMember = async (modelId: number) => {
  const { profile } = await getMembership();

  await prisma.profileMembership.delete({
    where: {
      profileId: profile.id,
      id: modelId,
    },
  });

  revalidatePath("home/admin/agentes");
};

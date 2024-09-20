"use server";

import { getMembership } from "@/utils/facades/serverFacades/userFacade";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export const upsertCastingRole = async ({
  modelId,
  payload,
}: {
  modelId?: number;
  payload: any;
}) => {
  const { profile } = await getMembership();

  try {
    await prisma.castingRoles.upsert({
      where: {
        id: modelId || -1,
      },
      update: {
        ...payload,
      },
      create: {
        ...payload,
        profileId: profile.id,
      },
    });

    revalidatePath(` /home/admin/settings/roles`);
    return true;
  } catch (error) {
    throw new Error(String(error));
  }
};

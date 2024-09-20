"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export const upsertCastingCategory = async ({
  modelId,
  payload,
}: {
  modelId?: number;
  payload: any;
}) => {
  try {
    await prisma.castingCategory.upsert({
      where: {
        id: modelId || -1,
      },
      update: {
        ...payload,
      },
      create: {
        ...payload,
      },
    });

    revalidatePath(`/admin/castings/categories`);

    return true;
  } catch (error) {
    throw new Error(String(error));
  }
};

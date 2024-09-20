"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/db";

export const deleteEcommerceCollection = async (modelId) => {
  try {
    await prisma.collection.delete({
      where: {
        id: modelId,
      },
    });

    revalidatePath("/home/collections");
  } catch (error: any) {
    throw new Error(error.message);
  }
};

"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/db";

export const deleteEcommerceBanner = async (modelId) => {
  try {
    await prisma.banner.delete({
      where: {
        id: modelId,
      },
    });

    revalidatePath("/home/banners");
  } catch (error: any) {
    throw new Error(error.message);
  }
};

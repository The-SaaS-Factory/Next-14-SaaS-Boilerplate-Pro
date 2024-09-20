"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/db";

export const deleteShippingZone = async (modelId) => {
  try {
    await prisma.profileShippingZone.delete({
      where: {
        id: modelId,
      },
    });

    revalidatePath("/home/shipping/zones");
  } catch (error: any) {
    throw new Error(error.message);
  }
};

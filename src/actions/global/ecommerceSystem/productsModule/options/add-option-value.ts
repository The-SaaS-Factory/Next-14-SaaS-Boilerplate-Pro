"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/db";

export const addEcommerceProductOptionValue = async (modelId, value: any) => {
  try {
    await prisma.optionValue.create({
      data: {
        optionId: modelId,
        value: value,
      },
    });

    revalidatePath("/home/products/options");
  } catch (error: any) {
    throw new Error(error.message);
  }
};

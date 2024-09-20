"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/db";

export const deleteEcommerceProductOptionValue = async (
  modelId,
  valueId: number
) => {
  try {
    await prisma.optionValue.delete({
      where: {
        optionId: modelId,
        id: valueId,
      },
    });

    revalidatePath("/home/products/options");
  } catch (error: any) {
    throw new Error(error.message);
  }
};

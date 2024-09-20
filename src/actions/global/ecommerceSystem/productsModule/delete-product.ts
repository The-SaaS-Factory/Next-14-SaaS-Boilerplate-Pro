"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/db";
 import { getMembership} from "@/utils/facades/serverFacades/userFacade";

export const deleteProduct = async (modelId: number) => {
  const { id } = await getMembership();

  try {
    await prisma.product.delete({
      where: {
        id: modelId,
        profileId: id,
      },
    });

    revalidatePath("/home/products");
  } catch (error: any) {
    throw new Error(error.message);
  }
};

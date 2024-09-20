"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/db";
 import { getMembership} from "@/utils/facades/serverFacades/userFacade";

export const deleteProductCategory = async (modelId: number) => {
  const { id } = await getMembership();

  try {
    await prisma.productCategory.delete({
      where: {
        id: modelId,
        profileId: id,
      },
    });

    revalidatePath("/home/products/ubications");
  } catch (error: any) {
    throw new Error(error.message);
  }
};

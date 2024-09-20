"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/db";
 import { getMembership} from "@/utils/facades/serverFacades/userFacade";

export const deleteEcommerceProductOption = async (modelId: number) => {
  const { id } = await getMembership();

  try {
    await prisma.option.delete({
      where: {
        id: modelId,
        profileId: id,
      },
    });

    revalidatePath("/home/products/options");
  } catch (error: any) {
    throw new Error(error.message);
  }
};

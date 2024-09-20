"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/db";
 import { getMembership} from "@/utils/facades/serverFacades/userFacade";

export const addProductFavorite = async (productId: number) => {
  const { id } = await getMembership();
  const exitProduct = await prisma.productFavorite.findFirst({
    where: {
      productId,
      profileId: id,
    },
  });

  if (exitProduct) return;

  try {
    await prisma.productFavorite.create({
      data: {
        productId,
        profileId: id,
      },
    });

    revalidatePath("/home/favorites");
  } catch (error: any) {
    throw new Error(error.message);
  }
};

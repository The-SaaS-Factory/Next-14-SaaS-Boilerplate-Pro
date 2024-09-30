"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/db";
 import { getMembership} from "@/utils/facades/serverFacades/userFacade";

export const deleteProductFavorite = async (
  modelId: number,
  productId?: number
) => {
  const { id } = await getMembership();

  try {
    let product: any = null;

    if (modelId) {
      product = await prisma.productFavorite.findUnique({
        where: {
          id: modelId,
          organizationId: id,
        },
      });
    } else {
      product = await prisma.productFavorite.findFirst({
        where: {
          productId: productId,
          organizationId: id,
        },
      });
    }

    if (!product) return;

    await prisma.productFavorite.delete({
      where: {
        id: product.id,
      },
    });

    revalidatePath("/home/favorites");
  } catch (error: any) {
    throw new Error(error.message);
  }
};

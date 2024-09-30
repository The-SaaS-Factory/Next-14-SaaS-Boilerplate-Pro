"use server";
import prisma from "@/lib/db";
 import { getMembership} from "@/utils/facades/serverFacades/userFacade";
export const getProductDetails = async (productId: number) => {
  const { id } = await getMembership();
  return await prisma.product.findUnique({
    where: {
      id: productId,
      organizationId: id,
    },
    include: {
      categories: true,
    },
  });
};

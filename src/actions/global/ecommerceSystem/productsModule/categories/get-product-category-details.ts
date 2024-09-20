"use server";
import prisma from "@/lib/db";
 import { getMembership} from "@/utils/facades/serverFacades/userFacade";
export const getProductCategoryDetails = async (modelId: number) => {
  const { id } = await getMembership();
  return await prisma.productCategory.findUnique({
    where: {
      id: modelId,
      profileId: id,
    },
  });
};

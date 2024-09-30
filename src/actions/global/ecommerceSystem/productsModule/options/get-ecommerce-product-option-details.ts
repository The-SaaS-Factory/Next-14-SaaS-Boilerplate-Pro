"use server";
import prisma from "@/lib/db";
 import { getMembership} from "@/utils/facades/serverFacades/userFacade";
export const getEcommerceProductOptionDetails = async (optionId: number) => {
  const { id } = await getMembership();
  return await prisma.option.findUnique({
    where: {
      id: optionId,
      organizationId: id,
    },
    include: {
      values: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });
};

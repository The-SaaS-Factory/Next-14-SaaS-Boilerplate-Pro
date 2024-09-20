"use server";

 import { getMembership} from "@/utils/facades/serverFacades/userFacade";
import prisma from "@/lib/db";

export const getClientFavorites = async () => {
  const { id } = await getMembership();

  return await prisma.productFavorite.findMany({
    where: {
      profileId: id,
    },
    include: {
      product: {
        select: {
          id: true,
          name: true,
          slug: true,
          image: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

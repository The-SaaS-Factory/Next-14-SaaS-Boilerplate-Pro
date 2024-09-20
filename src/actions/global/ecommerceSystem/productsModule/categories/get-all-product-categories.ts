"use server";

 import { getMembership} from "@/utils/facades/serverFacades/userFacade";
import prisma from "@/lib/db";
import { constants } from "@/lib/constants";

export const getUserAllProductsCategories = async (ubication?: string) => {
  let where = {};

  if (ubication === "landing") {
    return await prisma.productCategory.findMany({
      where: {
        ...where,
        products: {
          some: {}, // Verifica la existencia de al menos un producto
        },
      },
      include: {
        _count: {
          select: {
            products: true,
          },
        },
        parent: true,
        children: {
          where: {
            products: {
              some: {}, // Verifica que los children tengan al menos un producto
            },
          },
          include: {
            _count: {
              select: {
                products: true,
              },
            },
            parent: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
  }
  const { id } = await getMembership();
  if (constants.multiTenant) {
    where = {
      id: id,
    };
  }

  return await prisma.productCategory.findMany({
    where: {
      ...where,
    },
    include: {
      _count: {
        select: {
          products: true,
        },
      },
      parent: true,
      children: true,
    },
  });
};

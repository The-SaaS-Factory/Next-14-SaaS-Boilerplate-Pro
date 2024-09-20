"use server";

import prisma from "@/lib/db";

export const getBestSellersPorducts = async () => {
  const data = await prisma.product.findMany({
    where: {
      stock: {
        gt: 0,
      },
      status: "ACTIVE",
    },
    include: {
      currency: true,
    },
    orderBy: {
      salesTotal: "desc",
    },
  });

  return { data };
};

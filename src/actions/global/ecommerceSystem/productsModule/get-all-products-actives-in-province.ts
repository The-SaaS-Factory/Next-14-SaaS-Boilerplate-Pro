"use server";
import prisma from "@/lib/db";

export const getAllProductsActivesInProvince = async (province: string) => {
  const products = await prisma.product.findMany({
    where: {
      profile: {
        shippingZones: {
          some: {
            OR: [
              {
                state: province,
                country: "Cuba",
                city: null,
              },
              {
                state: null,
                country: "Cuba",
                city: null,
              },
            ],
          },
        },
      },
      status: "ACTIVE",
    },
    include: {
      profile: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
  return products;
};

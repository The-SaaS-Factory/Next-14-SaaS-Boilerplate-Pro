"use server";

import prisma from "@/lib/db";

export const getEcommerceSearchFilters = async () => {
  // const days = await prisma.days.findMany();

  const prices = await prisma.product.findMany({
    where: {
      status: "ACTIVE",
    },
    select: {
      regularPrice: true,
    },
    distinct: ["regularPrice"],
  });
  const categories = await prisma.productCategory.findMany({
    where: {
      products: {
        some: {
          status: "ACTIVE",
        },
      },
    },
    select: {
      name: true,
      slug: true,
    },
    distinct: ["name"],
  });

  const priceValues = prices.map((item) => item.regularPrice);

  const minPrice = Math.min(...priceValues);
  const maxPrice = Math.max(...priceValues);

  const range1 = minPrice;
  const range2 = range1 + (maxPrice - range1) / 3;
  const range3 = range2 + (maxPrice - range1) / 3;

  const priceRanges = [
    `$0 - $${range1.toFixed(2)}`,
    `$${range1.toFixed(2)} - $${range2.toFixed(2)}`,
    `$${range2.toFixed(2)} - $${range3.toFixed(2)}`,
    `$${range3.toFixed(2)}+`,
  ];

  const filters = [
    {
      id: "categories",
      name: "Categorías",
      options: categories.map((cat) => ({
        value: cat.slug,
        label: cat.name,
      })),
    },
    {
      id: "prices",
      name: "Precios",
      options: priceRanges.map((price) => ({
        value: price,
        label: price,
      })),
    },
  ];

  return filters;
};

"use server";
import prisma from "@/lib/db";

export const getProductDetailsInLanding = async (productSlug: string) => {
  const product = await prisma.product.findUnique({
    where: {
      slug: productSlug,
    },
    include: {
      categories: true,
      profile: { select: { name: true } },
    },
  });

  if (product) {
    const relatedProducts = await prisma.product.findMany({
      where: {
        status: "ACTIVE",
        profileId: product.profileId,
        categories: {
          some: {
            id: {
              in: product.categories.map((category) => category.id),
            },
          },
        },
        NOT: {
          id: product.id,
        },
      },
    });

    return {
      product,
      relatedProducts,
    };
  }

  return null;
};

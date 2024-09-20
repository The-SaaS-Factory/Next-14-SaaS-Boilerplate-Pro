"use server";
import prisma from "@/lib/db";

export const getOpenCategories = async () => {
  return await prisma.castingCategory.findMany({
    where: {
      castings: {
        some: {
          status: "OPEN",
        },
      },
    },
  });
};

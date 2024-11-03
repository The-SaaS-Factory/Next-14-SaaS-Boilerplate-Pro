"use server";
import prisma from "@/lib/db";
export const getAllPlansPricings = async () => {
  return await prisma.pricing.findMany({
    where: {
      Plan: {
        status: "ACTIVE",
      },
    },
    include: {
      Plan: true,
    },
  });
};

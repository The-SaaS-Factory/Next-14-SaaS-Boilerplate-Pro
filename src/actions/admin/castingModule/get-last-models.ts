"use server";
import prisma from "@/lib/db";

export const getLastModels = async () => {
  const models = await prisma.profile.findMany({
    take: 5,
    orderBy: {
      createdAt: "desc",
    },
  });

  return models;
};

"use server";
import prisma from "@/lib/db";

export const getProfileSettings = async (organizationId: number) => {
  return await prisma.organizationSetting.findMany({
    where: { organizationId },
  });
};

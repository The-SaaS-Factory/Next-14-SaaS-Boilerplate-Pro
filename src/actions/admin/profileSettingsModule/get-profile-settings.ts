"use server";
import prisma from "@/lib/db";

export const getProfileSettings = async (organizationId: number, p0: string) => {
  return await prisma.organizationSetting.findMany({
    where: { organizationId },
  });
};

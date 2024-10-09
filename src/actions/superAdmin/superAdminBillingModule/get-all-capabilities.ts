"use server";
import prisma from "@/lib/db";
export const getAllCapabilities = async () => {
  return await prisma.capability.findMany();
};

"use server";
import prisma from "@/lib/db";
export const getAllCastingInformations = async () => {
   return await prisma.castingInformations.findMany();
};

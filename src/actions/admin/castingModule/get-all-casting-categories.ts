"use server";
import prisma from "@/lib/db";
export const getAllCastingCategories = async () => {
   return await prisma.castingCategory.findMany();
};

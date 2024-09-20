"use server";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export const deleteCastingCategory = async (categoryId: number) => {
  await prisma.castingCategory.delete({
    where: {
      id: categoryId,
    },
  });

  revalidatePath("/admin/castings/categories");
};

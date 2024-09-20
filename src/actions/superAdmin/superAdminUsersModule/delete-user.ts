"use server";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export const deleteUser = async (id: number) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!user) throw new Error("User not found");

  await prisma.user.delete({
    where: {
      id,
    },
  });

  revalidatePath(`/admin/users`);
};

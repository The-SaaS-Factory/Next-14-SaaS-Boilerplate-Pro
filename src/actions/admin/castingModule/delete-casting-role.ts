"use server";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export const deleteCastingRole = async (castingRoleId: number) => {
  await prisma.castingRoles.delete({
    where: {
      id: castingRoleId,
    },
  });

  revalidatePath(" /home/admin/settings/roles");
};

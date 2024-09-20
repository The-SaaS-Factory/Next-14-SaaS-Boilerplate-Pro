"use server";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export const deleteCastingInformation = async (castingRoleId: number) => {
  await prisma.castingInformations.delete({
    where: {
      id: castingRoleId,
    },
  });

  revalidatePath(" /home/admin/settings/roles");
};

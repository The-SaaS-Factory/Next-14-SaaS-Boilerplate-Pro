"use server";
import { revalidatePath } from "next/cache";
import prisma from "../../../lib/db";

export const deleteCapabilitie = async (CapabilitieId: number) => {
  await prisma.capability.delete({
    where: {
      id: CapabilitieId,
    },
  });

  revalidatePath("admin/billing/plans/capabilities");

  return true;
};

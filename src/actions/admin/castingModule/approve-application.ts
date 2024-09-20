"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { CastingAplicationStatus } from "@prisma/client";
import { redirect } from "next/navigation";
export const approveModelApplication = async (applicationId: number) => {
  await prisma.castingAplication.update({
    where: {
      id: applicationId,
    },
    data: {
      status: CastingAplicationStatus.APPROVED,
    },
  });

  revalidatePath("/home/applications/pendings");
  revalidatePath("/home/applications/inprocess");

  redirect("/home/agency/applications/inprocess");

  return true;
};

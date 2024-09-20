"use server";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { getMembership } from "@/utils/facades/serverFacades/userFacade";

export const deleteCasting = async (castingId: number) => {
  const { profile } = await getMembership();

  const casting = await prisma.casting.findUnique({
    where: {
      id: castingId,
    },
  });

  await prisma.log.create({
    data: {
      userId: profile.id,
      castingId: casting.id,
      action: "DELETE",
      changes: {
        before: casting,
        after: null,
      },
    },
  });

  await prisma.casting.delete({
    where: {
      id: castingId,
    },
  });
  revalidatePath("/home/admin/castings/all");

  // redirect("/home/castings");
};

"use server";

import prisma from "@/lib/db";

export const logAction = async ({
  userId,
  castingId,
  action,
  changes,
}: {
  userId: number;
  castingId: number;
  action: "CREATE" | "UPDATE" | "DELETE";
  changes: any;
}) => {
  await prisma.log.create({
    data: {
      userId,
      castingId,
      action,
      changes,
      createdAt: new Date(),
    },
  });
};

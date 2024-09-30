"use server";

import prisma from "@/lib/db";

export const logAction = async ({
  organizationId,
  action,
  changes,
}: {
  organizationId: number;
  action: "CREATE" | "UPDATE" | "DELETE";
  changes: any;
}) => {
  await prisma.log.create({
    data: {
      organizationId,
      action,
      changes,
      createdAt: new Date(),
    },
  });
};

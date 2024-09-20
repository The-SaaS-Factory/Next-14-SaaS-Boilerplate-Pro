"use server";
import prisma from "@/lib/db";
import { checkPermission } from "@/utils/facades/serverFacades/scurityFacade";
import { getMembership } from "@/utils/facades/serverFacades/userFacade";

import { revalidatePath } from "next/cache";
const scope = "superAdmin:billing:upsert";

export const deletePlanPrice = async (
  planId: number | undefined,
  priceId: number | undefined
) => {
  const { permissions } = await getMembership();

  checkPermission(permissions, scope);

  await prisma.pricing.delete({
    where: {
      id: priceId,
    },
  });

  revalidatePath("/admin/billing/edit/" + planId);
};

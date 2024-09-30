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
 const { userMembership } = await getMembership(); const permissions  = userMembership.permissions.map((p) => p.name);

  checkPermission(permissions, scope);

  await prisma.pricing.delete({
    where: {
      id: priceId,
    },
  });

  revalidatePath("/admin/billing/edit/" + planId);
};

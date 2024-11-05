"use server";
import prisma from "@/lib/db";
import { checkPermission } from "@/utils/facades/serverFacades/securityFacade";
import { getMembership } from "@/utils/facades/serverFacades/userFacade";

import { revalidatePath } from "next/cache";
const scope = "superAdmin:billing:upsert";
export const upsertPlanPrice = async ({
  modelId,
  payload,
}: {
  modelId?: number;
  payload: any;
}) => {
  const { userMembership } = await getMembership();
  const permissions = userMembership.permissions.map((p) => p.name);

  checkPermission(permissions, scope);

  try {
    await prisma.pricing.upsert({
      where: {
        id: modelId ? modelId : 0,
      },
      update: {
        price: payload.price,
        status: payload.status,
        frequency: payload.frequency,
        planId: payload.planId,
      },
      create: {
        price: payload.price,
        status: payload.status,
        frequency: payload.frequency,
        planId: payload.planId,
      },
    });

    revalidatePath("/admin/billing/plans/plans/edit/" + payload.planId);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

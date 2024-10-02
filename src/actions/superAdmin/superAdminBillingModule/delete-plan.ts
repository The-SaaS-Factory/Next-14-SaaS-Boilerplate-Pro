"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/db";

import { getMembership } from "@/utils/facades/serverFacades/userFacade";
import { checkPermission } from "@/utils/facades/serverFacades/securityFacade";
const scope = "superAdmin:billing:upsert";

export const deletePlan = async (modelId: number) => {
  const { userMembership } = await getMembership();
  const permissions = userMembership.permissions.map((p) => p.name);

  checkPermission(permissions, scope);
  try {
    await prisma.plan.delete({
      where: {
        id: modelId,
      },
    });

    revalidatePath("/admin/billing/plans");
  } catch (error: any) {
    throw new Error(error.message);
  }
};

"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/db";
 
import { checkPermission } from "@/utils/facades/serverFacades/scurityFacade";
import { getMembership  } from "@/utils/facades/serverFacades/userFacade";
const scope = "superAdmin:billing:upsert";

export const deletePlan = async (modelId: number) => {
const { permissions } = await getMembership();

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

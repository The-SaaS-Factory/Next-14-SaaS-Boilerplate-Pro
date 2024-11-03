"use server";
import prisma from "@/lib/db";
import { checkPermission } from "@/utils/facades/serverFacades/securityFacade";
import { getMembership } from "@/utils/facades/serverFacades/userFacade";

import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
const scope = "superAdmin:billing:upsert";
export const upsertCapabilitie = async ({
  modelId,
  payload,
}: {
  modelId?: number;
  payload: Prisma.CapabilitieCreateInput | Prisma.CapabilitieUpdateInput;
}) => {
  const { userMembership } = await getMembership();
  const permissions = userMembership.permissions.map((p) => p.name);

  checkPermission(permissions, scope);

  try {
    await prisma.capability.upsert({
      where: {
        id: modelId ? modelId : 0,
      },
      update: {
        name: payload.name,
        description: payload.description,
        type: payload.type,
        title: payload.title,
      },
      create: {
        name: payload.name as string,
        description: payload.description as string,
        type: payload.type as string,
        title: payload.title as string,
      },
    });

    revalidatePath("/admin/billing/plans/capabilities");
  } catch (error: any) {
    throw new Error(error.message);
  }
};

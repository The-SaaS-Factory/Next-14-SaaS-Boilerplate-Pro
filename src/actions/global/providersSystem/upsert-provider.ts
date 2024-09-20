"use server";
import prisma from "@/lib/db";
import { checkPermission } from "@/utils/facades/serverFacades/scurityFacade";
import { getMembership } from "@/utils/facades/serverFacades/userFacade";

import { Prisma, ProviderCategory, Status } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { providerModuleScope } from "./providerFacade";

export const upsertProvider = async ({
  modelId,
  payload,
}: {
  modelId?: number;
  payload: Prisma.ProviderCreateInput | Prisma.ProviderUpdateInput;
}) => {
  const { permissions } = await getMembership();
  console.log(payload);
  
  checkPermission(permissions, providerModuleScope);
  try {
    await prisma.provider.upsert({
      where: {
        id: modelId ? modelId : 0,
      },
      update: {
        name: payload.name,
        description: payload.description,
        category: payload.category,
        status: payload.status,
      },
      create: {
        name: payload.name as string,
        description: payload.description as string,
        category: payload.category as ProviderCategory,
        status: payload.status as Status,
      },
    });

    revalidatePath("/admin/proveedores");
  } catch (error: any) {
    throw new Error(error.message);
  }
};

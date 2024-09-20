"use server";

import prisma from "@/lib/db";
import { checkPermission } from "@/utils/facades/serverFacades/scurityFacade";
import { getMembership } from "@/utils/facades/serverFacades/userFacade";
import { revalidatePath } from "next/cache";
import { tenantModuleScope } from "./tenantFacade";

export const deleteTenant = async (modelId: number) => {
  const { permissions } = await getMembership();

  checkPermission(permissions, tenantModuleScope);

  const tenant = await prisma.profile.delete({
    where: {
      id: modelId,
    },
  });

  console.log(tenant);

  revalidatePath("admin/agencias");
};

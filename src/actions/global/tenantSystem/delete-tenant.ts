"use server";

import prisma from "@/lib/db";
import { checkPermission } from "@/utils/facades/serverFacades/securityFacade";
import { getMembership } from "@/utils/facades/serverFacades/userFacade";
import { revalidatePath } from "next/cache";
import { tenantModuleScope } from "./tenantFacade";

export const deleteTenant = async (modelId: number) => {
  const { userMembership } = await getMembership();
  const permissions = userMembership.permissions.map((p) => p.name);

  checkPermission(permissions, tenantModuleScope);

  await prisma.organization.delete({
    where: {
      id: modelId,
    },
  });

  revalidatePath("admin/agencias");
};

"use server";

import prisma from "@/lib/db";
import { checkPermission } from "@/utils/facades/serverFacades/securityFacade";
import { getMembership } from "@/utils/facades/serverFacades/userFacade";
import { revalidatePath } from "next/cache";
const scope = "superAdmin:billing:upsert";

export const deleteCurrency = async (currencyId: number) => {
  const { userMembership } = await getMembership();
  const permissions = userMembership.permissions.map((p) => p.name);
  checkPermission(permissions, scope);

  await prisma.adminCurrencies.delete({
    where: {
      id: currencyId,
    },
  });

  revalidatePath("/admin/settings/billing");
};

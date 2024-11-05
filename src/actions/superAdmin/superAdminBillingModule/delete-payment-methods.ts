"use server";

import prisma from "@/lib/db";
import { checkPermission } from "@/utils/facades/serverFacades/securityFacade";
import { getMembership } from "@/utils/facades/serverFacades/userFacade";

import { revalidatePath } from "next/cache";
const scope = "superAdmin:billing:upsert";

export const deletePaymentMethod = async (paymentMethodId: number) => {
  const { userMembership } = await getMembership();

  checkPermission(
    userMembership.permissions.map((p) => p.name),
    scope,
  );

  await prisma.paymentMethod.delete({
    where: {
      id: paymentMethodId,
    },
  });

  revalidatePath("/admin/settings/billing");
};

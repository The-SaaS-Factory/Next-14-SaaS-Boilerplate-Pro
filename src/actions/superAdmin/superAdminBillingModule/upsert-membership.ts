"use server";
import { updateMembership } from "@/utils/facades/serverFacades/membershipFacade";
import { checkPermission } from "@/utils/facades/serverFacades/securityFacade";
import { getMembership } from "@/utils/facades/serverFacades/userFacade";

import { revalidatePath } from "next/cache";

const scope = "superAdmin:billing:upsert";

export const upsertMembership = async ({ payload }: { payload: any }) => {
  const { userMembership } = await getMembership();
  const permissions = userMembership.permissions.map((p) => p.name);

  checkPermission(permissions, scope);

  const months = calculateMonts(payload.startDate, payload.endDate);

  updateMembership({
    currencyId: payload.currencyId,
    months: months,
    organizationId: payload.organizationId,
    planId: payload.planId,
    pricingId: payload.pricingId,
  });

  revalidatePath("/admin/billing/plans/plans");
};

const calculateMonts = (startDate: string, endDate: string) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return Math.ceil(diffDays / 30);
};

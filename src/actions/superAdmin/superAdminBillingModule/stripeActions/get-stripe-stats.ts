"use server";

import { getStripeMetrics } from "@/utils/facades/serverFacades/stripeFacade";

export async function getStripeStats() {
  return await getStripeMetrics();
}

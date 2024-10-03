"use server";
import prisma from "@/lib/db";
import { checkPermission } from "@/utils/facades/serverFacades/securityFacade";
 import { getMembership} from "@/utils/facades/serverFacades/userFacade";
 
import { revalidatePath } from "next/cache";

const scope = "superAdmin:billing:upsert";

export const upsertMembership = async ({
  modelId,
  payload,
}: {
  modelId?: number;
  payload: any;
}) => {
const { userMembership } = await getMembership(); const permissions = userMembership.permissions .map((p) => p.name);

  checkPermission(permissions, scope);
  
  try {
    await prisma.subscription.upsert({
      where: {
        id: modelId ? modelId : 0,
      },
      update: {
        organization: {
          connect: {
            id: payload.userId as number,
          },
        },
        plan: {
          connect: {
            id: payload.planId as number,
          },
        },
        pricing: {
          connect: {
            id: payload.pricingId as number,
          },
        },
        currency: {
          connect: {
            id: payload.currencyId as number,
          },
        },
        startDate: payload.startDate as Date,
        endDateFreeTrial: payload.endDateFreeTrial  === '' ? null : payload.endDateFreeTrial as Date,
        endDate: payload.endDate as Date,
      },
      create: {
        organization: {
          connect: {
            id: payload.userId as number,
          },
        },
        plan: {
          connect: {
            id: payload.planId as number,
          },
        },
        pricing: {
          connect: {
            id: payload.pricingId as number,
          },
        },
        currency: {
          connect: {
            id: payload.currencyId as number,
          },
        },
        startDate: payload.startDate as Date,
        endDateFreeTrial: payload.endDateFreeTrial  === '' ? null : payload.endDateFreeTrial as Date,
        endDate: payload.endDate as Date,
      },
    });

    revalidatePath("/admin/billing/plans/plans");
  } catch (error: any) {
    throw new Error(error.message);
  }
};

"use server";
import { CouponDuration } from "@prisma/client";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/db";
import { checkPermission } from "../../../../utils/facades/serverFacades/scurityFacade";
 import { getMembership} from "@/utils/facades/serverFacades/userFacade";
const scope = "superAdmin:billing:upsert";
export const upsertCoupon = async ({
  modelId,
  payload,
}: {
  modelId?: number;
  payload: any;
}) => {
  const { permissions } = await getMembership();
  checkPermission(permissions, scope);

  try {
    let codeGenerated = payload.code;

    if (!modelId) {
      codeGenerated = Math.random().toString(36).substring(2, 7);

      while (
        await prisma.coupon.findFirst({ where: { code: codeGenerated } })
      ) {
        codeGenerated = Math.random().toString(36).substring(2, 7);
      }
    } else {
      const oldCoupon = await prisma.coupon.findFirst({
        where: {
          id: modelId,
        },
      });

      codeGenerated = oldCoupon?.code;
    }

    await prisma.coupon.upsert({
      where: {
        id: modelId ? modelId : 0,
      },
      update: {
        name: payload.name,
        amountOff: payload.amountOff,
        duration: payload.duration,
        durationInMonths: payload.durationInMonths,
        maxRedemptions: payload.maxRedemptions,
        percentOff: payload.percentOff,
        profileId: payload.userId,
        status: payload.status,
        code: codeGenerated,
      },
      create: {
        name: payload.name as string,
        amountOff: payload.amountOff as number,
        duration: payload.duration as CouponDuration,
        durationInMonths: payload.durationInMonths as number,
        maxRedemptions: payload.maxRedemptions as number,
        percentOff: payload.percentOff as number,
        status: payload.status as string,
        profileId: payload.userId,
        code: codeGenerated,
      },
    });

    revalidatePath("/admin/billing/coupons");
  } catch (error: any) {
    throw new Error(error.message);
  }
};

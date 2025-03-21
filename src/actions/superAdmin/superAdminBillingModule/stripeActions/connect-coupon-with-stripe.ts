"use server";
import prisma from "@/lib/db";
import {
  stripeCreateCoupon,
  stripeCreatePromotionCode,
} from "@/utils/facades/serverFacades/stripeFacade";
import { Coupon } from "@prisma/client";
import { revalidatePath } from "next/cache";
import Stripe from "stripe";
export const connectCouponWithStripe = async ({
  couponId,
  currencyCode,
  pathToRevalidate,
}: {
  couponId: number;
  currencyCode: string;
  pathToRevalidate: string;
}) => {
  const coupon: Coupon | null = await prisma.coupon.findUnique({
    where: { id: couponId },
  });

  if (coupon) {
    try {
      const currency = await prisma.adminCurrencies.findFirst({
        where: {
          code: currencyCode.toLowerCase() ?? "usd",
        },
      });

      if (!currency) {
        throw new Error("Currency not found");
      }

      let couponPayload: Stripe.CouponCreateParams = {
        currency: currencyCode.toLowerCase() ?? "usd",
        name: coupon.name,
      };

      if (coupon.amountOff) {
        couponPayload.amount_off = coupon.amountOff;
      }

      if (coupon.percentOff && !coupon.amountOff) {
        couponPayload.percent_off = coupon.percentOff;
      }

      const stripeCoupon = await stripeCreateCoupon(couponPayload).catch(
        (error) => {
          console.log(error);
        },
      );

      if (stripeCoupon) {
        //create an promotion code
        const promoCode = await stripeCreatePromotionCode({
          coupon: stripeCoupon.id,
        });

        const couponSetting = await prisma.couponSettings.findFirst({
          where: {
            couponId: coupon.id,
            name: "stripeCouponId_" + currencyCode.toLowerCase(),
          },
        });

        const promotionalCodeSetting = await prisma.couponSettings.findFirst({
          where: {
            couponId: coupon.id,
            name: "stripeCouponPromotionCode",
          },
        });

        await prisma.couponSettings.upsert({
          where: {
            id: couponSetting?.id ?? 0,
          },
          update: {
            value: stripeCoupon.id,
          },
          create: {
            couponId: coupon.id,
            name: "stripeCouponId_" + currencyCode.toLowerCase(),
            value: stripeCoupon.id,
          },
        });

        await prisma.couponSettings.upsert({
          where: {
            id: promotionalCodeSetting?.id ?? 0,
          },
          update: {
            value: promoCode.code,
          },
          create: {
            couponId: coupon.id,
            name: "stripeCouponPromotionCode",
            value: promoCode.code,
          },
        });

        revalidatePath(pathToRevalidate);

        return true;
      }
    } catch (error: any) {
      console.log(error);

      throw new Error(error.message);
    }
  } else {
    throw new Error("Local plan not found");
  }
};

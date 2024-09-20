"use server";
import prisma from "@/lib/db";

export const checkCoupon = async (couponCode: string) => {
  const coupon = await prisma.coupon.findFirst({
    where: {
      code: couponCode,
      status: "ACTIVE",
    },
  });

  if (!coupon) {
    return null;
  }

  return coupon;
};

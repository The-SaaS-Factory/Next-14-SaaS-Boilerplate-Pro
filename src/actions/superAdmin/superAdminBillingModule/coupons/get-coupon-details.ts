"use server";
import prisma from "@/lib/db";
export const getCouponDetails = async (couponId: number) => {
  return await prisma.coupon.findUnique({
    where: {
      id: couponId,
    },
    include: {
      organization: {
        select: {
          id: true,
          email: true,
          name: true,
        },
      },
      settings: true,
    },
  });
};

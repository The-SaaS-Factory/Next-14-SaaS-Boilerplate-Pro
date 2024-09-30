"use server";
import prisma from "@/lib/db";

export const getPublicInvoice = async (invoiceId) => {
  return await prisma.invoice.findUnique({
    where: {
      id: invoiceId,
    },
    include: {
      organization: {
        select: {
          id: true,
          name: true,
          avatar: true,
          email: true,
        },
      },
      Items: true,
      user: true,
      coupons: true,
      Currency: true,
    },
  });
};

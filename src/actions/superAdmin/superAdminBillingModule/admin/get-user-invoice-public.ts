"use server";
import prisma from "@/lib/db";

export const getPublicInvoice = async (invoiceId) => {
  return await prisma.invoice.findUnique({
    where: {
      id: invoiceId,
    },
    include: {
      profile: {
        select: {
          id: true,
          name: true,
          avatar: true,
          email: true,
        },
      },
      Items: true,
      order: {
        include: {
          contact: true,
        },
      },
      user: true,
      coupons: true,
      Currency: true,
    },
  });
};

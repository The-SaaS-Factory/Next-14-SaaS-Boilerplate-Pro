"use server";

import { Prisma } from "@prisma/client";
import prisma from "@/lib/db";
import { hasPermission } from "@/utils/facades/serverFacades/scurityFacade";
import { getMembership  } from "@/utils/facades/serverFacades/userFacade";

export const getInvoiceDetails = async (invoiceId: number) => {
  const { id, permissions } = await getMembership();

  let ANDQUERY: Prisma.InvoiceWhereInput[] = [];

  if (hasPermission(permissions, "superAdmin:billing:read")) {
    ANDQUERY = [
      {
        id: invoiceId,
      },
    ];
  } else {
    ANDQUERY = [
      {
        id: invoiceId,
        organizationId: id,
      },
    ];
  }

  const invoice = await prisma.invoice.findFirst({
    where: {
      AND: ANDQUERY,
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
      user: true,
      Currency: true,
      coupons: true,
      Items: true,
    },
  });

  return invoice;
};

"use server";

import { Prisma } from "@prisma/client";
import prisma from "@/lib/db";
import { getMembership } from "@/utils/facades/serverFacades/userFacade";
import { hasPermission } from "@/utils/facades/serverFacades/securityFacade";

export const getInvoiceDetails = async (invoiceId: number) => {
  const { userMembership, organization } = await getMembership();
  const permissions = userMembership.permissions.map((p) => p.name);

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
        organizationId: organization.id,
      },
    ];
  }

  const invoice = await prisma.invoice.findFirst({
    where: {
      AND: ANDQUERY,
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
      user: true,
      Currency: true,
      coupons: true,
      Items: true,
    },
  });

  return invoice;
};

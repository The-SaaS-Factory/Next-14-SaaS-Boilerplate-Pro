"use server";

import {
  processInvoiceItemInPayment,
  updateInvoice,
} from "@/utils/facades/serverFacades/paymentFacade";
import prisma from "@/lib/db";
import { InvoiceItem } from "@prisma/client";
import { checkPermission } from "@/utils/facades/serverFacades/securityFacade";

import { revalidatePath } from "next/cache";
import { getMembership } from "@/utils/facades/serverFacades/userFacade";
const scope = "superAdmin:billing:upsert";

export const makeInvoicePaid = async (
  invoiceId: number,
  gateway = "manualAdmin",
) => {
  const { userMembership } = await getMembership();
  const permissions = userMembership.permissions.map((p) => p.name);

  if (gateway === "manualAdmin") {
    //Is from Admin
    checkPermission(permissions, scope);
  }

  const payload = {
    gateway,
  };

  const invoice = await prisma.invoice.findFirst({
    where: {
      id: invoiceId,
    },
    include: {
      Items: true,
    },
  });

  if (!invoice) throw new Error("Invoice not found");

  await Promise.all(
    invoice.Items.map(async (invoiceItem: InvoiceItem) => {
      const pricing = await prisma.pricing.findFirst({
        where: {
          id: invoiceItem.pricingBdId ?? 0,
        },
      });

      if (pricing) {
        return await processInvoiceItemInPayment(invoiceItem, invoice, pricing);
      } else {
        return await processInvoiceItemInPayment(invoiceItem, invoice);
      }
    }),
  )
    .then(async () => {
      await updateInvoice(invoice.id, payload);
    })
    .catch((error) => {
      throw new Error(error.message);
    });

  revalidatePath("admin/billing/invoices");
  revalidatePath(`admin/billing/invoices/${invoiceId}`);
};

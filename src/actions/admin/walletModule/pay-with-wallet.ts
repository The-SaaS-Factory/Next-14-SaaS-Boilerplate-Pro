"use server";
import { makeInvoicePaid } from "@/actions/superAdmin/superAdminBillingModule/make-invoice-paid";
import prisma from "@/lib/db";

import { MovementAmountType } from "@prisma/client";
import { createMovementAmountForUser } from "./create-amount-movement";
import { revalidatePath } from "next/cache";
import { calculateInvoiceTotal } from "@/utils/facades/serverFacades/paymentFacade";
import { getMembership } from "@/utils/facades/serverFacades/userFacade";
export const payInvoiceWitWallet = async (invoiceId: number) => {
  const { id } = await getMembership();

  const invoice = await prisma.invoice.findFirst({
    where: {
      id: invoiceId,
    },
    include: {
      Items: true,
      coupons: true,
    },
  });

  if (!invoice) throw new Error("invoice not found");

  try {
    const { total, totalDiscount } = calculateInvoiceTotal(
      invoice.Items,
      invoice.coupons
    );

    await createMovementAmountForUser({
      amount: total,
      currencyId: invoice.currencyId,
      profileId: id,
      details:
        "Invoice payment" + totalDiscount
          ? ` - with $${totalDiscount} discount`
          : "",
      type: MovementAmountType.DEBIT,
    })
      .then(async () => {
        await makeInvoicePaid(invoiceId, "wallet");
      })
      .catch((error) => {
        throw new Error(error.message);
      });

    revalidatePath("/home/invoices" + invoiceId);
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

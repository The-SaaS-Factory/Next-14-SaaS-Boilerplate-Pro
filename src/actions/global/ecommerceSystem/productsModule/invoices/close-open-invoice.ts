"use server";

import prisma from "@/lib/db";
 import { getMembership} from "@/utils/facades/serverFacades/userFacade";
import { InvoiceStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const closeOpenInvoice = async (invoiceId: number) => {
  const { id } = await getMembership();
  await prisma.invoice.update({
    where: {
      id: invoiceId,
      profileId: id,
    },
    data: {
      status: InvoiceStatus.PAID,
      paidAt: new Date(),
    },
  });

  revalidatePath("home/invoices/" + invoiceId);
};

"use server";
import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

export type CreateInvoiceItem = {
  price: number;
  quantity: number;
  name: string;
  description: string;
  invoiceId: number;
};

export const createInvoiceItemToInvoice = async ({
  payload,
}: {
  payload: CreateInvoiceItem;
}) => {
  //Create Invoice Item
  const payloadInvoiceItem: Prisma.InvoiceItemCreateInput = {
    Invoice: {
      connect: {
        id: payload.invoiceId,
      },
    },
    description: payload.description,
    name: payload.name,
    price: payload.price,
    quantity: payload.quantity,
  };

  const invoiceItem = await prisma.invoiceItem.create({
    data: payloadInvoiceItem,
  });

  revalidatePath("/admin/billing/invoices/" + payload.invoiceId);

  return invoiceItem;
};

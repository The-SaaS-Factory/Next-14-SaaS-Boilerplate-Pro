"use server";
import prisma from "@/lib/db";
import { sendLoopsTransactionalEventToUser } from "@/utils/facades/serverFacades/loopsEmailMarketingFacade";
import {
  notifyToSuperAdmin,
   sendInternalNotification,
} from "@/utils/facades/serverFacades/notificationFacade";
import { getSuperAdminSetting } from "@/utils/facades/serverFacades/superAdminFacade";
import { InvoiceStatus } from "@prisma/client";

export const checkInvoicesOnExpiration = async () => {
  try {
    const invoicesWithExpirationDateInThisWeek = await prisma.invoice.findMany({
      where: {
        dueAt: {
          lte: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),  
          gte: new Date(),  
        },
        notifiedAt: null,
        paidAt: null,
      },
      include: {
        organization: true,
        Items: true,
        Currency: true,
        coupons: true,
      },
    });

    const invoicesExpired = await prisma.invoice.findMany({
      where: {
        dueAt: {
          lte: new Date(),
        },
        paidAt: null,
      },
    });

    //Delete the invoices that are expired
    Promise.all(
      invoicesExpired.map(async (invoice) => {
        await prisma.invoice.update({
          where: {
            id: invoice.id,
          },
          data: {
            status: InvoiceStatus.EXPIRED,
          },
        });
      })
    );

    //Check if invoices for due in this week,  and notify the user
    Promise.all(
      invoicesWithExpirationDateInThisWeek.map(async (invoice) => {
        await prisma.invoice.update({
          where: {
            id: invoice.id,
          },
          data: {
            notifiedAt: new Date(),
          },
        });

        if (!invoice.organization?.id) return;

         sendInternalNotification(
          invoice.organization.id,
          `Hola ${invoice.organization.name}, tienes una factura pendiente por pagar.`
        );

        notifyToSuperAdmin(
          `La factura con id ${invoice.id} vence esta semana, ya contactaron al usuario ${invoice.organization.name} para notificarle?. A trabajar!!!`
        );

        if (!invoice.organization?.email) return;

        const transactionaId = await getSuperAdminSetting(
          "LOOPS_INVOICE_NOTIFIED_TRANSACTIONAL_ID"
        );

        if (!transactionaId) return;

        sendLoopsTransactionalEventToUser({
          email: invoice.organization.email,
          transactionalId: transactionaId,
          dataVariables: {
            userName: invoice.organization.name,
            invoiceId: invoice.id,
          },
        });
      })
    );

    await prisma.cronJobs.create({
      data: {
        name: "checkInvoicesOnExpiration",
        excuteAt: new Date(),
      },
    });
  } catch (error: any) {
    await prisma.cronJobs.create({
      data: {
        name: "checkInvoicesOnExpiration",
        excuteAt: new Date(),
        error: error.message,
      },
    });
  }
};

"use server";
import prisma from "@/lib/db";
import { getSuperAdminSetting } from "@/utils/facades/serverFacades/adminFacade";
import { sendLoopsTransactionalEventToUser } from "@/utils/facades/serverFacades/loopsEmailMarketingFacade";
import {
  notifyToSuperAdmin,
  sendInternalNotificatoin,
} from "@/utils/facades/serverFacades/notificationFacade";
import { InvoiceStatus } from "@prisma/client";

export const checkInvoicesOnExpiration = async () => {
  try {
    const invoicesWithExpirationDateInThisWeek = await prisma.invoice.findMany({
      where: {
        dueAt: {
          lte: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000), //prixima semana
          gte: new Date(), //Desde ahora
        },
        notifiedAt: null,
        paidAt: null,
      },
      include: {
        profile: true,
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

        if (!invoice.profile?.id) return;

        sendInternalNotificatoin(
          invoice.profile.id,
          `Hola ${invoice.profile.name}, tienes una factura pendiente por pagar.`
        );

        notifyToSuperAdmin(
          `La factura con id ${invoice.id} vence esta semana, ya contactaron al usuario ${invoice.profile.name} para notificarle?. A trabajar!!!`
        );

        if (!invoice.profile?.email) return;

        const transactionaId = await getSuperAdminSetting(
          "LOOPS_INVOICE_NOTIFIED_TRANSACTIONAL_ID"
        );

        if (!transactionaId) return;

        sendLoopsTransactionalEventToUser({
          email: invoice.profile.email,
          transactionalId: transactionaId,
          dataVariables: {
            userName: invoice.profile.name,
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

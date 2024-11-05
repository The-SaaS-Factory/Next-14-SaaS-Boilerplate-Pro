"use server";
import { notifyToSuperAdmin } from "@/utils/facades/serverFacades/notificationFacade";

import { PublicationContentType } from "@prisma/client";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/db";
import { getMembership } from "@/utils/facades/serverFacades/userFacade";

export const createSupportTickets = async (args: any) => {
  await prisma.$transaction(
    async (tx: any) => {
      try {
        const { organization } = await getMembership();
        const id = organization.id;

        let dataForTicket = {};
        let dataForFirstMessage = {};
        const payload = args.payload;

        dataForTicket = {
          organization: {
            connect: {
              id,
            },
          },
        };
        dataForFirstMessage = {
          organizationId: id,
        };

        const ticket = await tx.supportTicket.create({
          data: {
            ...dataForTicket,
            subject: payload.subject,
            department: payload.department,
          },
        });

        const firstMessage = await tx.supportTicketMessage.create({
          data: {
            ticketId: ticket.id,
            ...dataForFirstMessage,
          },
        });

        let contents: any = [];

        const images = payload.images && JSON.parse(payload.images);

        if (images && images.length > 0) {
          contents = await Promise.all(
            images.map(async (image: any) => {
              let data = image.url;

              return {
                messageId: firstMessage.id,
                content: data,
                type: PublicationContentType.GALLERY,
              };
            }),
          );
        }

        const description = {
          messageId: firstMessage.id,
          content: payload.description,
          type: PublicationContentType.TEXT,
        };

        contents.push(description);

        if (contents) {
          await tx.supportTicketMessageContent.createMany({
            data: contents,
          });
        }
      } catch (error: any) {
        console.log(error);
        throw new Error(error);
      }
    },
    {
      maxWait: 5000,
      timeout: 10000,
    },
  );

  revalidatePath("/home/support");
  notifyToSuperAdmin(`New Support Ticket`);
};

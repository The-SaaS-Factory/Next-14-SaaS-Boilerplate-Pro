"use server";

import { Prisma } from "@prisma/client";
import prisma from "@/lib/db";
import { getMembership } from "@/utils/facades/serverFacades/userFacade";

export const getSupportTicketById = async (ticketId: number): Promise<any> => {
  if (!ticketId) throw new Error("Ticket id is required");

  const { organization } = await getMembership();

  let whereOwner: Prisma.SupportTicketWhereInput;

  whereOwner = {
    organizationId: organization.id,
  };

  const ticket = await prisma.supportTicket.findFirst({
    where: {
      id: ticketId,
      ...whereOwner,
    },
    include: {
      organization: {
        select: {
          name: true,
        },
      },
      SupportTicketMessage: {
        include: {
          organization: {
            select: {
              name: true,
              avatar: true,
              email: true,
            },
          },

          SupportTicketMessageContent: true,
        },
      },
    },
  });

  return ticket;
};

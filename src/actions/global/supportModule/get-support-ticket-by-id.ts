"use server";
 
import { Prisma } from "@prisma/client";
import prisma from "@/lib/db";
 import { getMembership} from "@/utils/facades/serverFacades/userFacade";

export const getSupportTicketById = async (ticketId: number): Promise<any> => {
  if (!ticketId) throw new Error("Ticket id is required");

    
   const {id} = await getMembership();

  let whereOwner: Prisma.SupportTicketWhereInput;

  whereOwner = {
      profileId: id,
  };

  const ticket = await prisma.supportTicket.findFirst({
    where: {
      id: ticketId,
      ...whereOwner,
    },
    include: {
      profile: {
        select: {
          name: true,
        },
      },
      SupportTicketMessage: {
        include: {
          profile: {
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

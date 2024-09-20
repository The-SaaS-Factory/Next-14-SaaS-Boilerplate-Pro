"use server";
import prisma from "@/lib/db";
export const getSupportTicketDetails = async (
  ticketId: number
): Promise<any> => {
  if (!ticketId) throw new Error("Ticket id is required");
  const ticket = await prisma.supportTicket.findFirst({
    where: {
      id: ticketId,
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

"use server";
import prisma from "@/lib/db";
import { getMembership } from "@/utils/facades/serverFacades/userFacade";

export const getUserSupportTickets = async ({
  args,
}: {
  args: {
    limit: number;
    offset: number;
    search: string;
  };
}) => {
  const { offset, limit } = args;

  const { id } = await getMembership();

  let whereSearch: any;

  whereSearch = {};

  if (args.search) {
    whereSearch = {
      subject: {
        contains: args.search,
      },
    };
  }

  let whereOwner: any;

  whereOwner = {
    organizationId: id,
  };

  const data = await prisma.supportTicket.findMany({
    where: {
      ...whereOwner,
      ...whereSearch,
    },
    include: {
      profile: {
        select: {
          id: true,
          email: true,
          avatar: true,
          name: true,
        },
      },
    },
    skip: offset,
    take: limit,
    orderBy: {
      createdAt: "desc",
    },
  });

  const totalCount = await prisma.supportTicket.count({
    where: { ...whereSearch },
  });

  const totalPages = Math.ceil(totalCount / limit);

  return { data, totalCount, totalPages };
};

export const getSupportTicketsActivesCount = async () => {
  const { id } = await getMembership();

  let whereOwner: any;

  whereOwner = {
    organizationId: id,
  };

  const data = await prisma.supportTicket.count({
    where: {
      ...whereOwner,
      status: "OPEN",
    },
  });

  return data;
};

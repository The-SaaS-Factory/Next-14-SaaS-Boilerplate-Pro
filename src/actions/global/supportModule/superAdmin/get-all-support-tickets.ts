"use server";

import prisma from "@/lib/db";
import { checkPermission } from "@/utils/facades/serverFacades/securityFacade";
import { getMembership } from "@/utils/facades/serverFacades/userFacade";

const scope = "superAdmin:support:read";

export const getAllSupportTicket = async ({
  args,
}: {
  args: {
    limit: number;
    offset: number;
    search: string;
  };
}) => {
  const { offset, limit } = args;

  const { userMembership } = await getMembership();

  checkPermission(
    userMembership.permissions.map((p) => p.name),
    scope,
  );

  let whereSearch: any = {};

  if (args.search) {
    whereSearch = {
      OR: [
        {
          subject: {
            contains: args.search,
            mode: "insensitive",
          },
        },
        {
          user: {
            email: {
              contains: args.search,
              mode: "insensitive",
            },
          },
        },
        {
          user: {
            name: {
              contains: args.search,
              mode: "insensitive",
            },
          },
        },
        {
          Organization: {
            name: {
              contains: args.search,
              mode: "insensitive",
            },
          },
        },
      ],
    };
  }

  const data = await prisma.supportTicket.findMany({
    where: {
      ...whereSearch,
    },
    include: {
      organization: {
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
    where: {
      ...whereSearch,
    },
  });

  const totalPages = Math.ceil(totalCount / limit);

  return { data, totalCount, totalPages };
};

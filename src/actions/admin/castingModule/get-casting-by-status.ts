"use server";

import { Prisma } from "@prisma/client";
import prisma from "@/lib/db";
export const getCastings = async ({
  args,
}: {
  args: {
    limit?: number;
    offset?: number;
    search?: string;
  };
}) => {
  let whereSearch: Prisma.CastingWhereInput;
  const limit = args.limit ?? 10;
  const offset = args.offset ?? 0;

  whereSearch = {};

  if (args.search) {
    whereSearch = {
      categories: {
        some: {
          name: {
            contains: args.search,
          },
        },
      },
    };
  }

  console.log(whereSearch);

  const data = await prisma.casting.findMany({
    where: {
      ...whereSearch,
      status: "OPEN",
    },
    orderBy: {
      createdAt: "desc",
    },
    take: limit,
    skip: offset,
    include: {
      profile: {
        select: {
          avatar: true,
          name: true,
        },
      },
      _count: {
        select: {
          aplications: true,
        },
      },
    },
  });

  console.log(data);

  const totalCount = await prisma.casting.count({
    where: {
      ...whereSearch,
      status: "OPEN",
    },
  });

  const totalPages = Math.ceil(totalCount / limit);

  return { data, totalCount, totalPages };
};

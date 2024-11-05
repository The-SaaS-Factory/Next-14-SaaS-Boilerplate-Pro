"use server";
import prisma from "@/lib/db";

export const getAllSuscriptions = async ({
  args,
}: {
  args: {
    limit: number;
    offset: number;
    search: string;
  };
}) => {
  const limit = args.limit;
  const offset = args.offset;

  let whereSearch = {};

  if (args.search) {
    whereSearch = {
      organization: {
        name: {
          contains: args.search,
        },
      },
    };
  }
  const data = await prisma.subscription.findMany({
    where: {
      ...whereSearch,
    },
    skip: offset,
    take: limit,
    include: {
      organization: {
        select: {
          id: true,
          name: true,
          avatar: true,
          email: true,
        },
      },
      plan: true,
    },
  });

  const totalCount = await prisma.subscription.count({
    where: whereSearch,
  });

  const totalPages = Math.ceil(totalCount / limit);

  return { data, totalCount, totalPages };
};
//

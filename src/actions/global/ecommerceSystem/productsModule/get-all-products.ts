"use server";

 import { getMembership} from "@/utils/facades/serverFacades/userFacade";
import prisma from "@/lib/db";

export const getUserAllProducts = async ({
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

  let findId: string | number =
    typeof args.search === "string"
      ? args.search.replace(/\D/g, "")
      : args.search;

  if (typeof findId === "string" && findId !== "") {
    findId = parseInt(findId);
  }

  if (args.search) {
    whereSearch = {
      OR: [
        {
          name: {
            contains: args.search,
          },
        },
      ],
    };
  }

  const { id } = await getMembership();

  const data = await prisma.product.findMany({
    skip: offset,
    take: limit,
    where: {
      organizationId: id,
      ...whereSearch,
    },
    include: {
      currency: true,
    },
  });

  const totalCount = await prisma.product.count();

  const totalPages = Math.ceil(totalCount / limit);

  return { data, totalCount, totalPages };
};

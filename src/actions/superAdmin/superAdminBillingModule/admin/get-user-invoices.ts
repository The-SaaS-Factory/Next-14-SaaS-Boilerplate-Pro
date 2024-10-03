"use server";
import prisma from "@/lib/db";
 import { getMembership} from "@/utils/facades/serverFacades/userFacade";

export const getUserInvoices = async ({
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

  const { organization } = await getMembership();

  let whereSearch: any;

  whereSearch = {};

  if (args.search) {
    whereSearch = {
      OR: [
        {
          details: {
            contains: args.search,
          },
        },
        {
          id: parseInt(args.search),
        },
      ],
    };
  }

  const data = await prisma.invoice.findMany({
    where: {
      organizationId: organization.id,
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
      Items: true,
      Currency: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const totalCount = await prisma.userMembership.count();

  const totalPages = Math.ceil(totalCount / limit);

  return { data, totalCount, totalPages };
};
//

export const getUserInvoicesPendingCount = async () => {
  const { organization } = await getMembership();
  const data = await prisma.invoice.count({
    where: {
      organizationId: organization.id,
      status: "PENDING",
    },
  });

  return data;
};

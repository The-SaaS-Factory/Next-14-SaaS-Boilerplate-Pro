"use server";
import prisma from "@/lib/db";
 import { getMembership} from "@/utils/facades/serverFacades/userFacade";
import { InvoiceStatus } from "@prisma/client";

export const getBusinessInvoices = async ({
  args,
}: {
  args: {
    limit: number;
    offset: number;
    search: string;
    invoiceStatus: InvoiceStatus;
  };
}) => {
  const limit = args.limit;
  const offset = args.offset;

  const { id } = await getMembership();

  let whereSearch: any;

  whereSearch = {};

  let findId: string | number =
    typeof args.search === "string"
      ? args.search.replace(/\D/g, "")
      : args.search;

  if (typeof findId === "string" && findId !== "") {
    findId = parseInt(findId);
  } else if (typeof findId === "string" && findId === "") {
    findId = 0;
  }

  if (args.search) {
    whereSearch = {
      OR: [
        {
          details: {
            contains: args.search,
          },
        },
        {
          id: findId,
        },
        {
          client: {
            name: {
              contains: args.search,
            },
          },
        },
      ],
    };
  }

  const data = await prisma.invoice.findMany({
    where: {
      organizationId: id,
      ...whereSearch,
      status: args.invoiceStatus ?? InvoiceStatus.PAID,
    },
    skip: offset,
    take: limit,
    include: {
      profile: {
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

  const totalCount = await prisma.invoice.count({
    where: {
      organizationId: id,
      ...whereSearch,
      status: args.invoiceStatus ?? InvoiceStatus.PAID,
    },
  });

  const totalPages = Math.ceil(totalCount / limit);

  return { data, totalCount, totalPages };
};
//

export const getUserInvoicesPendingCount = async () => {
  const { id } = await getMembership();
  const data = await prisma.invoice.count({
    where: {
      organizationId: id,
      status: "PENDING",
    },
  });

  return data;
};

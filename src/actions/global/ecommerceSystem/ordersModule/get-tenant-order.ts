"use server";
import prisma from "@/lib/db";
 import { getMembership} from "@/utils/facades/serverFacades/userFacade";
import { OrderStatus } from "@prisma/client";

export const getTenantOrders = async ({
  args,
}: {
  args: {
    limit?: number;
    offset?: number;
    query?: string;
    status?: OrderStatus;
  };
}) => {
  const limit = args.limit || 1000;
  const offset = args.offset;

  let whereSearch: any;

  whereSearch = {};

  let findId: string | number =
    typeof args.query === "string" ? args.query.replace(/\D/g, "") : args.query;

  if (typeof findId === "string" && findId !== "") {
    findId = parseInt(findId);
  } else if (typeof findId === "string" && findId === "") {
    findId = 0;
  }

  if (args.query) {
    whereSearch = {
      OR: [
        {
          invoices: {
            some: {
              id: findId,
            },
          },
        },
        {
          user: {
            OR: [
              {
                name: {
                  contains: args.query,
                },
              },
              {
                phone: {
                  contains: args.query,
                },
              },
              {
                email: {
                  contains: args.query,
                },
              },
            ],
          },
        },
        {
          contact: {
            OR: [
              {
                name: {
                  contains: args.query,
                },
              },
              {
                phone: {
                  contains: args.query,
                },
              },
              {
                email: {
                  contains: args.query,
                },
              },
            ],
          },
        },
        {
          id: findId,
        },
      ],
    };
  }

  const { id } = await getMembership();

  const data = await prisma.order.findMany({
    where: {
      organizationId: id,
      status: args.status,
      ...whereSearch,
    },
    include: {
      user: true,
      cart: {
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
      },
      contact: true,
      currency: true,
      invoices: true,
    },
    skip: offset,
    take: limit,
    orderBy: {
      createdAt: "desc",
    },
  });

  const totalCount = await prisma.order.count({
    where: { organizationId: id },
  });

  const totalPages = Math.ceil(totalCount / limit);

  return { data, totalCount, totalPages };
};

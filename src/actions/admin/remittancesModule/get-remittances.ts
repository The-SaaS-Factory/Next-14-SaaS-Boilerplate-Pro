"use server";

import prisma from "@/lib/db";

export const getRemittances = async ({
  args,
}: {
  args: {
    query: string,
    search: Record<string, any>;
    limit: number;
    offset: number;
  };
}) => {
  let whereSearch: any = {};
  const limit = args.limit;

  if (!args.search || Object.keys(args.search).length === 0) {
    args.search = {};
  }


  if (args.query) {
    whereSearch = {
      OR: [
        {
          name: {
            contains: args.query,
          },
        },
      ],
    };
  }

  // Elimina la propiedad 'page' de searchParams si está presente
  const searchParams = { ...args.search };
  delete searchParams.page;

  // Itera sobre el objeto y crea la cláusula where
  for (const [key, value] of Object.entries(searchParams)) {
    if (value !== "") {
      if (
        key === "sender" ||
        key === "recipient"
      ) {
        whereSearch = {
          ...whereSearch,
          [key]: {
            contains: value,
          },
        };
      }

      if (key === "invoiceNumber") {
        whereSearch = {
          ...whereSearch,
          [key]: {
            equals: parseInt(value, 10),
          },
        };
      }

      if (key === "startDate" || key === "endDate") {
        const startDate = searchParams.startDate
          ? new Date(searchParams.startDate)
          : undefined;
        const endDate = searchParams.endDate
          ? new Date(searchParams.endDate)
          : undefined;

        if (startDate && endDate) {
          whereSearch = {
            ...whereSearch,
            creationDate: {
              gte: startDate,
              lte: endDate,
            },
          };
        } else if (startDate) {
          whereSearch = {
            ...whereSearch,
            creationDate: {
              gte: startDate,
            },
          };
        } else if (endDate) {
          whereSearch = {
            ...whereSearch,
            creationDate: {
              lte: endDate,
            },
          };
        }
      }
    }
  }

  const data = await prisma.remittance.findMany({
    where: {
      ...whereSearch,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: limit,
    skip: args.offset,
    include: {
      sender: true,
      profile: true,
      profileMembership: {
        include: {
          user: {
            select: {
              name: true,
              email: true,
            },
          },
        },
      },
      recipient: true,
      provider: true,
    },
  });

  const totalCount = await prisma.remittance.count({
    where: {
      ...whereSearch,
    },
  });

  const totalPages = Math.ceil(totalCount / limit);

  return { data, totalCount, totalPages };
};

"use server";
import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";

export const getActivities = async ({
  args,
}: {
  args: {
    search: Record<string, any> | any; // Asegúrate de que args.search pueda contener cualquier tipo de datos
    limit: number;
    offset: number;
  };
}) => {
  let whereSearch: Prisma.LogWhereInput = {};
  const limit = args.limit;

  if (!args.search || Object.keys(args.search).length === 0) {
    args.search = {};
  }
  //delete page from searchParams
  const searchParams = { ...args.search };
  delete searchParams.page;

  // Manejo de filtros adicionales con `args.search`
  if (args.search && Object.keys(args.search).length > 0) {
    for (const [key, value] of Object.entries(args.search)) {
      if (value !== "") {
        if (key === "organization") {
          whereSearch = {
            ...whereSearch,
            organization: {
              id: { in: (value as any).split(",").map((i) => parseInt(i)) },
            },
          };
        } else if (key === "action") {
          whereSearch = {
            ...whereSearch,
            action: {
              equals: value as any,
            },
          };
        }
      }
    }
  }

  if (args.search.startDate || args.search.endDate) {
    let startDate = args.search.startDate
      ? new Date(args.search.startDate)
      : undefined;
    let endDate = args.search.endDate
      ? new Date(args.search.endDate)
      : undefined;

    if (startDate) {
      const startDateOnly = args.search.startDate;
      startDate = new Date(`${startDateOnly}T00:00:00.000Z`);
    }

    if (endDate) {
      const endDateOnly = endDate.toISOString().split("T")[0];
      endDate = new Date(`${endDateOnly}T23:59:59.999Z`);
    }

    if (startDate && endDate) {
      whereSearch = {
        ...whereSearch,
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      };
    } else if (startDate) {
      whereSearch = {
        ...whereSearch,
        createdAt: {
          gte: startDate,
        },
      };
    } else if (endDate) {
      whereSearch = {
        ...whereSearch,
        createdAt: {
          lte: endDate,
        },
      };
    }
  }

  const data = await prisma.log.findMany({
    where: {
      ...whereSearch,
    },
    take: limit,
    skip: args.offset,
    include: {
      organization: true,
    },
    orderBy: { createdAt: "desc" },
  });

  const totalCount = await prisma.log.count({
    where: {
      ...whereSearch,
    },
  });

  const totalPages = Math.ceil(totalCount / limit);

  return { data, totalCount, totalPages };
};

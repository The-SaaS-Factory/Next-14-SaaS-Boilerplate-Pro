"use server";

import { CastingStatus, Prisma } from "@prisma/client";
import prisma from "@/lib/db";
import { getMembership } from "@/utils/facades/serverFacades/userFacade";

export const getUserCastings = async ({
  args,
}: {
  args: {
    limit?: number;
    offset?: number;
    search: Record<string, any> | any; //Fix any
    query?: string;
    status?: CastingStatus;
  };
}) => {
  const { profile, permissions } = await getMembership();


  let whereSearch: Prisma.CastingWhereInput;
  const limit = args.limit ?? 10;
  const offset = args.offset ?? 0;


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

        {
          id: {
            equals: parseInt(args.query)
          },
        },
      ],
    };
  }

  //delete page from searchParams
  const searchParams = { ...args.search };
  delete searchParams.page;

  // Itera sobre el objeto y crea la cláusula where
  for (const [key, value] of Object.entries(searchParams)) {
    if (value !== "" && key !== "query") {
      if (typeof value === "string") {
        if (key === "firstName" || key === "email") {
          whereSearch = {
            ...whereSearch,
            [key]: {
              contains: value,
            },
          };
        } else if (key === "ciudad") {
          whereSearch = {
            ...whereSearch,
            ubication: {
              contains: value,
            },
          };
        } else if (key === "tipo") {
          whereSearch = {
            ...whereSearch,
            categories: {
              some: {
                name: { contains: value }
              },
            },
          };
        } else {
          if (value.includes(",")) {
            whereSearch = {
              ...whereSearch,
              [key]: {
                in: value.split(","),
              },
            };
          } else {
            whereSearch = {
              ...whereSearch,
              [key]: value,
            };
          }
        }
      }
    }
  }

  if (args.status) {
    whereSearch = { ...whereSearch, status: args.status }
  }

  if (permissions?.includes("agency:casting:admin")) {
    whereSearch = {
      ...whereSearch,
      profileId: profile.id
    }
  }

  const data = await prisma.casting.findMany({
    where: {
      ...whereSearch,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: limit,
    skip: offset,
    include: {
      profile: true,
      aplications: true,
      roles: true,
      _count: {
        select: {
          aplications: true,
        },
      },
    },
  });


  const totalCount = await prisma.casting.count({
    where: {
      ...whereSearch,
      profileId: profile.id,
    },
  });

  const totalPages = Math.ceil(totalCount / limit);

  return { data, totalCount, totalPages };
};

export const getAllCastings = async ({
  args,
}: {
  args: {
    limit?: number;
    offset?: number;
    search: Record<string, any> | any; //Fix any
    query?: string;
    status?: CastingStatus;
  };
}) => {


  let whereSearch: Prisma.CastingWhereInput;
  const limit = args.limit ?? 10;
  const offset = args.offset ?? 0;


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

  //delete page from searchParams
  const searchParams = { ...args.search };
  delete searchParams.page;

  // Itera sobre el objeto y crea la cláusula where
  for (const [key, value] of Object.entries(searchParams)) {
    if (value !== "" && key !== "query") {
      if (typeof value === "string") {
        if (key === "firstName" || key === "email") {
          whereSearch = {
            ...whereSearch,
            [key]: {
              contains: value,
            },
          };
        } else if (key === "ciudad") {
          whereSearch = {
            ...whereSearch,
            ubication: {
              contains: value,
            },
          };
        } else if (key === "tipo") {
          whereSearch = {
            ...whereSearch,
            categories: {
              some: {
                name: { contains: value }
              },
            },
          };
        } else {
          if (value.includes(",")) {
            whereSearch = {
              ...whereSearch,
              [key]: {
                in: value.split(","),
              },
            };
          } else {
            whereSearch = {
              ...whereSearch,
              [key]: value,
            };
          }
        }
      }
    }
  }

  if (args.status) {
    whereSearch = { ...whereSearch, status: args.status }
  }

  const data = await prisma.casting.findMany({
    where: {
      ...whereSearch,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: limit,
    skip: offset,
    include: {
      profile: true,
      aplications: true,
      roles: true,
      _count: {
        select: {
          aplications: true,
        },
      },
    },
  });


  const totalCount = await prisma.casting.count({
    where: {
      ...whereSearch,
    },
  });

  const totalPages = Math.ceil(totalCount / limit);

  return { data, totalCount, totalPages };
};

"use server";
import prisma from "@/lib/db";
 import { getMembership} from "@/utils/facades/serverFacades/userFacade";
import { Status } from "@prisma/client";

export const getTenantInstalledPlugins = async ({
  args,
}: {
  args: {
    limit: number;
    offset: number;
    search: string;
    status: Status;
  };
}) => {
  const { id } = await getMembership();

  const limit = args.limit;
  const offset = args.offset;

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
          id: findId,
        },
        {
          plugin: {
            name: {
              contains: args.search,
            },
          },
        },
      ],
    };
  }

  const data = await prisma.profilePlugin.findMany({
    where: {
      ...whereSearch,
      profileId: id,
    },
    skip: offset,
    include: {
      plugin: true,
    },
    take: limit,
    orderBy: {
      installedAt: "desc",
    },
  });

  const totalCount = await prisma.profilePlugin.count({
    where: {
      ...whereSearch,
      profileId: id,
    },
  });

  const totalPages = Math.ceil(totalCount / limit);

  return { data, totalCount, totalPages };
};

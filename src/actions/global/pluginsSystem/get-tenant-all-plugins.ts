"use server";
import prisma from "@/lib/db";
 import { getMembership} from "@/utils/facades/serverFacades/userFacade";
import { Status } from "@prisma/client";

export const getTenantAllPlugins = async ({
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
          name: {
            contains: args.search,
          },
        },
        {
          id: findId,
        },
      ],
    };
  }
  const data = await prisma.plugin.findMany({
    where: {
      ...whereSearch,
      status: args.status ?? Status.ACTIVE,
    },
    skip: offset,
    take: limit,
    include: {
      _count: {
        select: {
          installations: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const pluginsInstalleds = await prisma.profilePlugin.findMany({
    where: {
      profileId: id,
    },
  });

  // Crear un conjunto (Set) de los IDs de los plugins instalados para una búsqueda más rápida
  const installedPluginIds = new Set(
    pluginsInstalleds.map((plugin) => plugin.pluginId)
  );

  const dataWithInstalled = data.map((plugin) => ({
    ...plugin,
    installed: installedPluginIds.has(plugin.id),
  }));

  const totalCount = await prisma.plugin.count({
    where: {
      ...whereSearch,
      status: args.status ?? Status.ACTIVE,
    },
  });

  const totalPages = Math.ceil(totalCount / limit);

  return { data: dataWithInstalled, totalCount, totalPages };
};
//

export const getUserInvoicesPendingCount = async () => {
  const { id } = await getMembership();
  const data = await prisma.invoice.count({
    where: {
      profileId: id,
      status: "PENDING",
    },
  });

  return data;
};

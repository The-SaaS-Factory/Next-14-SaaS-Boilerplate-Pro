"use server";

 import { getMembership} from "@/utils/facades/serverFacades/userFacade";
import prisma from "@/lib/db";
import { capitalizarPalabras } from "@/utils/facades/serverFacades/stripeFacade";

export const getAllEcommerceProductsOptions = async ({
  args,
}: {
  args?: {
    search?: string;
  };
}) => {
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
            contains: capitalizarPalabras(args.search),
          },
        },
      ],
    };
  }

  const { id } = await getMembership();

  const data = await prisma.option.findMany({
    where: {
      organizationId: id,
      ...whereSearch,
    },
    include: {
      values: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
    orderBy: {
      position: "asc",
    },
  });

  return { data };
};

"use server";

import prisma from "@/lib/db";
import { provincesInCuba } from "@/lib/provincesInCuba";
import { capitalizarPalabras } from "@/utils/facades/serverFacades/stripeFacade";

export const getUserAllProductsActivesInSearch = async ({
  args,
}: {
  args: {
    limit: number;
    offset: number;
    query: string;
    categories: string;
    prices: string;
    colors: string;
    sort: string;
    province?: string;
  };
}) => {
  const limit = args.limit;
  const offset = args.offset;
  let whereSearch: any = {};

  let findId: string | number =
    typeof args.query === "string" ? args.query.replace(/\D/g, "") : args.query;

  if (typeof findId === "string" && findId !== "") {
    findId = parseInt(findId);
  }

  if (args.query) {
    whereSearch.OR = [
      {
        name: {
          contains: capitalizarPalabras(args.query),
        },
      },
      {
        description: {
          contains: capitalizarPalabras(args.query),
        },
      },
    ];
  }

  if (args.categories) {
    const categoriesArray = args.categories.split(",").map((cat) => cat.trim());
    whereSearch.categories = {
      some: {
        slug: {
          in: categoriesArray,
        },
      },
    };
  }
  if (args.province) {
    const province = provincesInCuba.find(
      (prov) => prov.url === args.province
    ) || {
      name: args.province,
    };

    whereSearch.profile = {
      shippingZones: {
        some: {
          OR: [
            {
              state: province.name,
              country: "Cuba",
              city: null,
              status: "ACTIVE",
            },
            {
              state: null,
              country: "Cuba",
              city: null,
              status: "ACTIVE",
            },
          ],
        },
      },
    };
  }

  if (args.colors) {
    const colorsArray = args.colors.split(",").map((col) => col.trim());

    whereSearch.options = {
      some: {
        AND: [
          {
            name: {
              in: ["Color", "color", "Colors", "colors"],
            },
          },
          {
            values: {
              some: {
                value: {
                  in: colorsArray.map(capitalizarPalabras),
                },
              },
            },
          },
        ],
      },
    };
  }
  if (args.prices) {
    const priceRanges = args.prices.split(",");
    let minPrice = Number.POSITIVE_INFINITY;
    let maxPrice = Number.NEGATIVE_INFINITY;

    priceRanges.forEach((range) => {
      if (range.includes("+")) {
        const min = parseFloat(range.replace(/[^0-9.-]+/g, ""));
        if (!isNaN(min) && min < minPrice) minPrice = min;
        maxPrice = Number.POSITIVE_INFINITY;
      } else {
        const [min, max] = range
          .split("-")
          .map((price) => parseFloat(price.replace(/[^0-9.-]+/g, "")));
        if (!isNaN(min) && min < minPrice) minPrice = min;
        if (!isNaN(max) && max > maxPrice) maxPrice = max;
      }
    });

    whereSearch.regularPrice = {
      gte: minPrice !== Number.POSITIVE_INFINITY ? minPrice : 0,
      ...(maxPrice !== Number.POSITIVE_INFINITY && { lte: maxPrice }),
    };
  }

  let orderBy: any = {};

  switch (args.sort) {
    // case "best-sellers":
    //   orderBy = { sales: "desc" }; // Assuming 'sales' is a field that tracks the number of sales
    //   break;
    // case "rated":
    //   orderBy = { rating: "desc" }; // Assuming 'rating' is a field for product ratings
    //   break;
    case "priceMax":
      orderBy = { regularPrice: "desc" }; // Assuming 'regularPrice' is a field for the product price
      break;
    case "priceMin":
      orderBy = { regularPrice: "asc" }; // Assuming 'regularPrice' is a field for the product price
      break;
    case "latest":
      orderBy = { createdAt: "desc" }; // Assuming 'createdAt' is a field for the creation date
      break;
    default:
      orderBy = {}; // No specific sorting if sort option is not provided or recognized
  }

  const data = await prisma.product.findMany({
    where: {
      stock: {
        gt: 0,
      },
      status: "ACTIVE",
      ...whereSearch,
    },
    skip: offset,
    take: limit,
    include: {
      currency: true,
    },
    orderBy,
  });

  const totalCount = await prisma.product.count({
    where: {
      stock: {
        gt: 0,
      },
      status: "ACTIVE",
      ...whereSearch,
    },
    orderBy,
  });

  const totalPages = Math.ceil(totalCount / limit);

  //If not orderBy and page params, order the data random
  if (Object.keys(orderBy).length === 0 && offset === 0) {
    data.sort(() => Math.random() - 0.5);
  }

  return { data, totalPages, totalCount };
};

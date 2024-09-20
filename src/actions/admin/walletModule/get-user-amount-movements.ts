"use server";

import prisma from "@/lib/db";
import { getMembership } from "@/utils/facades/serverFacades/userFacade";

export const getAmountMovements = async (currencyCode: string) => {
  const {id} = await getMembership();

  const currency = await prisma.adminCurrencies.findFirst({
    where: {
      code: currencyCode.toLowerCase(),
    },
  });

  if (!currency) return [];

  if (id)
    return await prisma.adminMovementsAmounts.findMany({
      where: {
        profileId: id,
        currencyId: currency.id,
      },
      include: {
        Currency: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
};

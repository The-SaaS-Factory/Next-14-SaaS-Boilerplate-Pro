"use server";

import prisma from "@/lib/db";
import { getMembership } from "@/utils/facades/serverFacades/userFacade";
import { OrderStatus } from "@prisma/client";

export const getDashboardStats = async () => {
  const { profile } = await getMembership();

  const ordersPendings = await prisma.order.count({
    where: {
      status: OrderStatus.PENDING,
      profileId: profile.id,
    },
  });

  const ordersInDelivery = await prisma.order.count({
    where: {
      status: OrderStatus.IN_DELIVERY,
      profileId: profile.id,
    },
  });
  const ordersActives = await prisma.order.count({
    where: {
      status: OrderStatus.IN_PROCESS,
      profileId: profile.id,
    },
  });
  const ordersCompleted = await prisma.order.count({
    where: {
      status: OrderStatus.COMPLETED,
      profileId: profile.id,
    },
  });
  const ordersCanceled = await prisma.order.count({
    where: {
      status: OrderStatus.CANCELED,
      profileId: profile.id,
    },
  });
  const productActives = await prisma.product.count({
    where: {
      status: "ACTIVE",
      profileId: profile.id,
    },
  });
  const productActivesWithOutStock = await prisma.product.count({
    where: {
      status: "ACTIVE",
      profileId: profile.id,
      stock: {
        lte: 1,
      },
    },
  });
  const productsInactives = await prisma.product.count({
    where: {
      status: "INACTIVE",
      profileId: profile.id,
    },
  });
  const productsInactivesWithStock = await prisma.product.count({
    where: {
      status: "INACTIVE",
      profileId: profile.id,
      stock: {
        gt: 0,
      },
    },
  });

  const currencies = await prisma.adminCurrencies.findMany({});

  const result = await prisma.product.groupBy({
    where: {
      profileId: profile.id,
      stock: {
        gte: 0,
      },
    },
    by: ["currencyId"],
    _sum: {
      regularPrice: true,
    },
  });

  const moneyInvestedInStock = result.map((item) => ({
    currency: currencies.find((c) => c.id === item.currencyId).name,
    totalPrice: item._sum.regularPrice,
  }));

  return {
    ordersCompleted,
    ordersCanceled,
    ordersInDelivery,
    ordersActives,
    ordersPendings,
    productActives,
    productActivesWithOutStock,
    productsInactives,
    productsInactivesWithStock,
    moneyInvestedInStock,
  };
};

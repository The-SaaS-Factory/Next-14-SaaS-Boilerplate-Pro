"use server";

import prisma from "@/lib/db";
import { AdminCurrencies } from "@prisma/client";
import { CarItemType } from "./ordersTypes";
import { calculateSubTotalFromCart } from "./ordersFacade";

export const createCar = async (
  userId: number,
  items: CarItemType[],
  currency: AdminCurrencies
) => {
  // Calcula el precio total utilizando el precio de venta o el precio regular
  const subtotal = calculateSubTotalFromCart(items, currency.rate);

  // Realiza la transacción para crear el carro y los ítems
  const car = await prisma.$transaction(async (prisma) => {
    // Crea el carro de compras
    const car = await prisma.shoppingCart.create({
      data: {
        priceTotal: subtotal,
        profile: {
          connect: { id: items[0].organizationId },
        },
        user: {
          connect: { id: userId },
        },
      },
    });

    // Crea los ítems del carro de compras
    await prisma.shoppingCarItem.createMany({
      data: items.map((item) => ({
        shoppingCarId: car.id,
        quantity: item.quantity,
        weight: item.weight,
        productId: item.id,
        price: currency.rate * (item.salesPrice ?? item.regularPrice),
        priceTotal:
          item.quantity *
          currency.rate *
          (item.salesPrice ?? item.regularPrice),
      })),
    });

    // Devuelve el objeto del carro de compras creado
    return car;
  });

  return car;
};

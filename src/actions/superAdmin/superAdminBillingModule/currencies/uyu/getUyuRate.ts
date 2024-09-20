"use server";
const URL = process.env.NEXTAUTH_URL;
import prisma from "@/lib/db";
export const getUyuRate = async () => {
  const response = await fetch(`${URL}/es/api/currencies/uyu`);
  // const response = await fetch(
  //   `https://administracion.repuestosdalcio.com/es/api/currencies`
  // );
  const data = await response.json();

  const uyuCurrency = await prisma.adminCurrencies.findFirst({
    where: {
      code: "uyu",
    },
  });

  const rate = (Number(data.dolarCompra) + Number(data.dolarVenta)) / 2;
  await prisma.adminCurrencies.update({
    where: {
      id: uyuCurrency.id,
    },
    data: {
      rate: rate,
    },
  });

  return {
    dolarCompra: data.dolarCompra,
    dolarVenta: data.dolarVenta,
  };
};

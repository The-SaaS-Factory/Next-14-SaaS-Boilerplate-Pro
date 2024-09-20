import { CarItemType } from "./ordersTypes";

export const calculateSubTotalFromCart = (
  items: CarItemType[],
  currencyRate = 1
) => {
  const priceTotal = items.reduce((total, item) => {
    const price = item.salesPrice ?? item.regularPrice;
    return total + item.quantity * price;
  }, 0);

  return priceTotal * currencyRate;
};

export const calculateTotalOrdenTax = (
  items: any[],
  currencyRate = 1
) => {
  const taxTotal = items.reduce((total, item) => {
    const price = item.tax;
    return total + item.quantity * price;
  }, 0);

  return taxTotal * currencyRate;
};

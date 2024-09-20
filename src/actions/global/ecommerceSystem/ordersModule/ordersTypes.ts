import { AdminCurrencies, Contacts } from "@prisma/client";

export interface IOrder {
  id: number;
  currencyId: number;
  contactId: number;
  contact: Contacts;
  currency: AdminCurrencies;
}
export type OrderCreateInput = {
  currencyId: number;
  contactId: number;
  coupon: string;
  shippingPrice: number;
  cart: CarItemType[];
};

export type CarItemType = {
  id: number;
  weight: number;
  quantity: number;
  salesPrice: number;
  tax: number;
  name: string;
  currencyId: number;
  regularPrice: number;
  profileId: number;
};

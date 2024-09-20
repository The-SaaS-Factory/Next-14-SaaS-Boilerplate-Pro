"use server";

import Stripe from "stripe";
import { stripeCreateCheckoutSession } from "@/utils/facades/serverFacades/stripeFacade";
import { getClientCustomer } from "@/utils/facades/serverFacades/paymentFacade";
import prisma from "@/lib/db";
import { InvoiceItem } from "@prisma/client";
 import { getMembership} from "@/utils/facades/serverFacades/userFacade";

export const createCheckoutSession = async (
  invoiceId: number,
  modelName: string
) => {
  if (!invoiceId) throw new Error("Invoice Id not found");
  let stripeModeSuscription = false;
  const invoice = await prisma.invoice.findUnique({
    where: { id: invoiceId },
    include: {
      Items: true,
      order: true,
      Currency: true,
      coupons: {
        include: {
          settings: true,
        },
      },
    },
  });

  let items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
  let coupons: Stripe.Checkout.SessionCreateParams.Discount[] = [];

  if (!invoice) throw new Error("Invoice not found");

  if (invoice.Items.length > 0) {
    invoice.Items.map((item: InvoiceItem) => {
      if (item.pricingId) {
        items.push({
          price: item.pricingId ? item.pricingId.toString() : "",
          quantity: item.quantity,
        });
        stripeModeSuscription = true;
      } else {
        items.push({
          price_data: {
            currency: invoice.Currency.code.toLowerCase(),
            product_data: {
              name: item.name,
            },
            unit_amount:  Math.round(item.price * 100),
            tax_behavior: "inclusive",
          },
          quantity: item.quantity,
        });
      }
    });
  }

  if (invoice.coupons.length > 0) {
    invoice.coupons.map((coupon) => {
      if (coupon.settings.length > 0) {
        coupon.settings.map((setting) => {
          if (
            setting.name ===
            "stripeCouponId_" + invoice.Currency.code.toLowerCase()
          ) {
            coupons.push({
              coupon: setting.value,
            });
          }
        });
      }
    });
  }

  const { id } = await getMembership();
  console.log("id", id);
  
  const client = await getClientCustomer(id);

  console.log(client);
  

  if (!client || (client && !client.customerId))
    throw new Error("Customer not found");

  const clientPayload = {
    customerId: client.customerId,
    userId: id,
  };

  return await stripeCreateCheckoutSession({
    items,
    coupons,
    clientPayload,
    referenceId: invoiceId.toString(),
    modelName: modelName,
    mode: stripeModeSuscription ? "subscription" : "payment",
    shippingPrice: invoice.order.shippingPrice,
  });
};

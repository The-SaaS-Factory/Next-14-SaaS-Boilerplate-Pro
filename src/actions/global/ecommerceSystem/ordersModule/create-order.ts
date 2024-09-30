"use server";

import { InvoiceModelType, InvoiceStatus, Prisma } from "@prisma/client";
import prisma from "@/lib/db";
import { getMembership } from "@/utils/facades/serverFacades/userFacade";
import { createCar } from "./create-cart";
import { createInvoice } from "@/utils/facades/serverFacades/paymentFacade";
import { OrderCreateInput } from "./ordersTypes";
import { createCheckoutSession } from "@/actions/superAdmin/superAdminBillingModule/stripeActions/create-checkout-session";
import { redirect } from "next/navigation";
import { notifyToSuperAdmin } from "@/utils/facades/serverFacades/notificationFacade";
import { checkCoupon } from "@/actions/superAdmin/superAdminBillingModule/coupons/check-coupon";
import { applyCouponToInvoice } from "@/actions/superAdmin/superAdminBillingModule/coupons/apply-coupon-to-invoice";

export const createOrder = async ({
  payload,
  directStripePayment,
}: {
  payload: OrderCreateInput;
  directStripePayment: boolean;
}) => {
  const { id } = await getMembership();
  const currency = await prisma.adminCurrencies.findFirst({
    where: { id: payload.currencyId },
  });

  if (!currency) {
    throw new Error("Currency not found");
  }

  const cart = await createCar(id, payload.cart, currency);

  if (!cart) {
    throw new Error("Problemas al crear el carrito");
  }

  const order = await prisma.order.create({
    data: {
      shippingPrice: payload.shippingPrice, //Fix This #DANGER
      subtotal: cart.priceTotal ?? 0,
      taxTotal: 0,
      total: cart.priceTotal + payload.shippingPrice,
      currency: {
        connect: {
          id: payload.currencyId,
        },
      },
      contact: {
        connect: {
          id: payload.contactId,
        },
      },
      user: {
        connect: {
          id: id,
        },
      },
      profile: {
        connect: {
          id: cart.organizationId,
        },
      },
      cart: {
        connect: {
          id: cart.id,
        },
      },
    },
    include: {
      user: true,
      cart: {
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
      },
    },
  });

  if (!order) {
    throw new Error("Error al crear la orden");
  }

  let productsItems = [];

  order.cart.items.map((item) =>
    productsItems.push({
      description: null,
      name: item.product.name,
      modelId: item.product.id,
      modelType: "PRODUCT",
      pricingId: null,
      pricingBdId: null,
      price: item.price + item.tax,
      tax: item.tax,
      quantity: item.quantity,
    })
  );

  const invoicePayload: Prisma.InvoiceCreateInput = {
    profile: {
      connect: {
        id: order.organizationId,
      },
    },
    order: {
      connect: {
        id: order.id,
      },
    },
    user: {
      connect: {
        id: order.userId,
      },
    },
    tax: order.taxTotal,
    type: InvoiceModelType.ORDER,
    Items: {
      create: productsItems,
    },
    Currency: {
      connect: {
        id: currency.id,
      },
    },
    subtotal: order.subtotal,
    total: order.total,
    gateway: null,
    details: "Pedido #" + order.id + " del cliente " + order.user.name,
    status: InvoiceStatus.PENDING,
    dueAt: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const invoice = await createInvoice(invoicePayload);

  if (!invoice) {
    await prisma.order.delete({
      where: {
        id: order.id,
      },
    });
    await prisma.shoppingCart.delete({
      where: {
        id: cart.id,
      },
    });
    throw new Error("Error al crear la factura");
  }

  if (payload.coupon) {
    const coupon = await checkCoupon(payload.coupon);

    if (coupon) {
      await applyCouponToInvoice({
        couponCode: coupon.code,
        invoiceId: invoice.id,
      });
    }
  }

  if (directStripePayment) {
    notifyToSuperAdmin(
      "Nueva orden creada de: " +
        order.user.name +
        " por $" +
        order.total +
        " en " +
        currency.code
    );
    const { url } = await createCheckoutSession(invoice.id, "ORDER");
    if (url) {
      redirect(url);
    }
  }

  return invoice;
};

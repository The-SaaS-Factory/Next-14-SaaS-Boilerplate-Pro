import Stripe from "stripe";
import { getSuperAdminSetting } from "./superAdminFacade";
import {
  invoiceItemPaid,
  processInvoiceItemInPayment,
  saveStripeCustomerId,
  stripeEventPaymentFailed,
  updateInvoice,
} from "./paymentFacade";
import prisma from "@/lib/db";
import { getPricingByStripePricingId } from "./paymentFacade";
import { InvoiceStatus, StripeCustomer } from "@prisma/client";
import {
  notifyToSuperAdmin,
   sendInternalNotification,
} from "./notificationFacade";

const makeStripeClient = async () => {
  const stripeMode = await getSuperAdminSetting("STRIPE_MODE");
  const STRIPE_CLIENT_SECRET_PRODUCTION = await getSuperAdminSetting(
    "STRIPE_CLIENT_SECRET_PRODUCTION"
  );
  const STRIPE_CLIENT_SECRET_SANDBOX = await getSuperAdminSetting(
    "STRIPE_CLIENT_SECRET_SANDBOX"
  );

  const stripeSectret =
    stripeMode === "prod"
      ? STRIPE_CLIENT_SECRET_PRODUCTION
      : STRIPE_CLIENT_SECRET_SANDBOX;

  if (!stripeSectret) throw new Error("Stripe secret not found");

  return new Stripe(stripeSectret, { apiVersion: "2023-10-16" });
};

export const stripeWebhook = async (requestBody: any) => {
  const stripe = await makeStripeClient();
  const payload = requestBody;

  const endpointSecret = await getSuperAdminSetting("STRIPE_ENDPOINT_SECRET");
  const secret = endpointSecret;

  if (!secret) throw new Error("Stripe secret not found");

  const header = stripe.webhooks.generateTestHeaderString({
    payload: payload,
    secret,
  });

  const event = stripe.webhooks.constructEvent(payload, header, secret);
  const eventData = event.data.object as Stripe.PaymentIntent;

  try {
    switch (event.type) {
      case "invoice.paid":
        await stripeEventInvoicePaid(eventData); //Second
        break;
      case "payment_intent.payment_failed":
        await stripeEventPaymentFailed(eventData);
        break;
      case "checkout.session.completed":
        await stripeEventCheckoutCompleted(eventData); //First
        break;

      default:
        break;
    }

    return "ok";
  } catch (err: any) {
    return `Webhook Error: ${err.message}`;
  }
};

export function capitalizarPalabras(str) {
  // Dividir el string en palabras individuales
  let palabras = str.split(" ");

  // Iterar sobre cada palabra y capitalizar la primera letra
  for (let i = 0; i < palabras.length; i++) {
    palabras[i] =
      palabras[i].charAt(0).toUpperCase() + palabras[i].slice(1).toLowerCase();
  }

  // Unir las palabras nuevamente en un solo string
  return palabras.join(" ");
}

export const stripeGetClientByCustomerId = async (customerId: string) => {
  const client = await prisma.stripeCustomer.findFirst({
    where: {
      customerId: customerId,
    },
  });

  return client;
};

export const stripeEventInvoicePaid = async (eventData: any) => {
  try {
    await Promise.all(
      eventData.lines.data.map(async (line: any) => {
        const priceId = line.price.id;
        const pricing = await getPricingByStripePricingId(priceId);

        await invoiceItemPaid({ stripePriceId: priceId, pricing, eventData });
      })
    );

    return "ok";
  } catch (error) {
    console.log(error);
  }
};

export const stripeRetriveSubscription = async (subscriptionId: string) => {
  const stripe = await makeStripeClient();
  return await stripe.subscriptions.retrieve(subscriptionId);
};
export const stripeRetriveInvoice = async (invoiceId: string) => {
  const stripe = await makeStripeClient();
  return await stripe.invoices.retrieve(invoiceId);
};

export const stripeEventCheckoutCompleted = async (eventData: any) => {
  try {
    const invoiceId = eventData.client_reference_id;

    if (invoiceId) {
      const invoice = await prisma.invoice.findUnique({
        where: { id: Number(invoiceId) },
        include: { Items: true, Currency: true },
      });

      if (!invoice) throw new Error("Invoice not found");

      const payload = {
        gateway: "stripe",
        invoicePdfUrl: eventData.invoice_pdf,
        gatewayId: eventData.invoice,
        invoiceUrl: eventData.hosted_invoice_url,
        subscriptionExternalId: eventData.subscription,
        status: InvoiceStatus.PAID,
      };

      //Notifica al usaurio
       sendInternalNotification(
        invoice.userId,
        `Tu factura #${invoice.id} ha sido pagada con éxito`,
        null
      );

      //Notifica al admin
      notifyToSuperAdmin(`New Invoice paid, # ${invoice.id}"`);

      await updateInvoice(invoice.id, payload);

      //**************************************************************MAIN************************************************** */
      if (invoice.type !== "ORDER") {
        Promise.all(
          invoice.Items.map(async (item: any) => {
            if (item.pricingId) {
              const pricing = await getPricingByStripePricingId(item.pricingId);
              await processInvoiceItemInPayment(item, invoice, pricing);
            } else {
              await processInvoiceItemInPayment(item, invoice);
            }
          })
        );
      } else {
        //
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const stripeCreateProduct = async (
  productPayload: Stripe.ProductCreateParams
) => {
  const stripe = await makeStripeClient();

  if (stripe) {
    const product = await stripe.products.create({
      name: productPayload.name,
    });

    return product.id;
  }

  return null;
};

export const stripeCreatePlan = async (
  productId: string,
  planPayload: Stripe.PlanCreateParams
) => {
  const stripe = await makeStripeClient();

  return await stripe.plans.create({
    amount: planPayload.amount ?? 1 * 100,
    currency: planPayload.currency,
    interval: planPayload.interval,
    product: productId,
  });
};

export const stripeCreateCoupon = async (
  couponPayload: Stripe.CouponCreateParams
) => {
  const stripe = await makeStripeClient();

  return await stripe.coupons.create(couponPayload);
};

export const stripeCreateCustomer = async (customerPayload: any) => {
  try {
    const stripe = await makeStripeClient();
    // const paymentMethod = await stripCreatePaymentMethod();

    // if (!paymentMethod) throw new Error("Error creating payment method");

    return await stripe.customers.create({
      name: customerPayload.name ?? null,
      email: customerPayload.email ?? null,
      // payment_method: paymentMethod.id,
      // invoice_settings: {
      //   default_payment_method: paymentMethod.id,
      // },
    });
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const stripCreatePaymentMethod = async () => {
  try {
    const stripe = await makeStripeClient();
    return await stripe.paymentMethods.create({
      type: "card",
    });
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export async function getStripeMetrics() {
  const stripe = await makeStripeClient();
  const charges = await stripe.charges.list({
    limit: 100,
  });

  const totalRevenue =
    charges.data
      .filter((charge) => charge.paid && charge.status === "succeeded")
      .reduce((acc, charge) => acc + charge.amount, 0) / 100; // Total en la moneda base

  const subscriptions = await stripe.subscriptions.list({
    limit: 100,
    status: "active",
  });

  const activeUsers = subscriptions.data.length;

  const canceledSubscriptions = await stripe.subscriptions.list({
    limit: 100,
    status: "canceled",
  });

  const churnRate =
    subscriptions.data.length == 0
      ? 0
      : (canceledSubscriptions.data.length /
          (subscriptions.data.length + canceledSubscriptions.data.length)) *
        100;

  console.log(churnRate);

  const MRR = subscriptions.data.reduce((acc, subscription) => {
    const planAmount = subscription.items.data[0]?.plan.amount / 100; // Verifica que el plan exista
    return acc + (planAmount || 0); // Suma el monto o 0 si no existe el plan
  }, 0);

  return {
    totalRevenue,
    activeUsers,
    churnRate,
    MRR,
  };
}

export const getStripeCustomer = async (customerId: string) => {
  try {
    const stripe = await makeStripeClient();
    const result = await stripe.customers.retrieve(customerId);
    return result;
  } catch (error) {
    return null;
  }
};

type ClientSessionPayloadType = {
  customerId: string;
  userId: number | null;
};

export const stripeCreateCheckoutSession = async ({
  items,
  coupons,
  clientPayload,
  referenceId,
  modelName,
  mode = "subscription",
}: {
  items: Stripe.Checkout.SessionCreateParams.LineItem[];
  coupons: Stripe.Checkout.SessionCreateParams.Discount[];
  clientPayload: ClientSessionPayloadType;
  referenceId: string;
  modelName: string;
  mode?: "subscription" | "payment";
}) => {
  try {
    const stripe = await makeStripeClient();
    const urls = await getUrlsForRedirect(modelName, referenceId);

    let sessionPayload: Stripe.Checkout.SessionCreateParams = {
      line_items: items,
      client_reference_id: referenceId,
      mode: mode,
      discounts: coupons,
      metadata: {
        modelId: clientPayload.userId,
      },
      ...urls,
      customer: clientPayload.customerId,
    };

    const session = await stripe.checkout.sessions.create(sessionPayload);

    return session;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const getUrlsForRedirect = async (
  modelName: string = "PLAN",
  invoiceId: number | string
) => {
  const domain = await getSuperAdminSetting("PLATFORM_FRONTEND_URL");

  if (modelName === "PLAN") {
    return {
      success_url: `${domain}/home/settings/billing/success`,
      cancel_url: `${domain}/home/settings/billing/buyPlan?paymentStatus=error`,
    };
  } else if (modelName === "SERVICE") {
    return {
      success_url: `${domain}/home/services?paymentStatus=success`,
      cancel_url: `${domain}/home/services?paymentStatus=error`,
    };
  } else if (modelName === "ORDER") {
    return {
      success_url: `${domain}/invoice/${invoiceId}?paymentStatus=success`,
      cancel_url: `${domain}/invoice/${invoiceId}?paymentStatus=error`,
    };
  }
};
export const createStripeCustomer = async (customerPayload: {
  name: string;
  email: string;
  organizationId: number;
}): Promise<StripeCustomer> => {
  const customer = await stripeCreateCustomer({
    name: customerPayload.name,
    email: customerPayload.email,
  });

  if (!customer) throw new Error("Error creating customer");
  const customerInBd = saveStripeCustomerId(
    customerPayload.organizationId,
    customer.id
  );
  return customerInBd;
};

export const stripeCreateSuscription = async (
  subscriptionPayload: Stripe.SubscriptionCreateParams
) => {
  const stripe = await makeStripeClient();

  return await stripe.subscriptions.create(subscriptionPayload);
};

export const stripeCreateInvoice = async (
  invoicePayload: Stripe.InvoiceCreateParams
) => {
  const stripe = await makeStripeClient();

  return await stripe.invoices.create(invoicePayload);
};

export const stripeCreateInvoiceItem = async (
  invoiceItemPayload: Stripe.InvoiceItemCreateParams
) => {
  const stripe = await makeStripeClient();

  return await stripe.invoiceItems.create(invoiceItemPayload);
};

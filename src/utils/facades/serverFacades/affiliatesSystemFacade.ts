import { Invoice, InvoiceItem } from "@prisma/client";
import prisma from "@/lib/db";
import { createMovementAmountForUser } from "@/actions/admin/walletModule/create-amount-movement";
import { getSuperAdminSetting } from "./adminFacade";
import { getUserCapabilitiesNames } from "./membershipFacade";

//An invoice can have many invoice items, because it, we need to process all of them to pay to affiliate

export const payToAffiliate = async (
  invoice: Invoice,
  invoiceItem: InvoiceItem
) => {
  if (!invoice.profileId) return;

  const invoiceFull = await prisma.invoice.findFirst({
    where: {
      id: invoice.id,
    },
    include: {
      coupons: true,
    },
  });

  if (invoiceFull?.coupons?.length) return;
 
  const userToPay = await prisma.referral.findFirst({
    where: {
      referId: invoice.profileId,
    },
    select: {
      referred: {
        select: {
          id: true,
        },
      },
    },
  });

  if (!userToPay) return;

  const profileId = userToPay.referred?.id ?? null;

  if (!profileId) return;

  const capabilitiesNames = await getUserCapabilitiesNames(profileId);

  if (capabilitiesNames?.includes("35% cashback for affiliates")) {
    const amount = invoiceItem.price * 0.35;
    const currency = invoice.currencyId;

    await createMovementAmountForUser({
      amount,
      currencyId: currency,
      profileId,
      details: `Cashback for affiliate ${invoice.profileId}`,
      type: "CREDIT",
    });
  } else if (
    capabilitiesNames?.includes("10% cashback for affiliates in VPS")
  ) {
    const amount = invoiceItem.price * 0.1;
    const currency = invoice.currencyId;

    await createMovementAmountForUser({
      amount,
      currencyId: currency,
      profileId,
      details: `Cashback for affiliate ${invoice.profileId}`,
      type: "CREDIT",
    });
  } else {
    //This user refered another user, but he doesn't have the 35% cashback for affiliates capability for his plan, then,
    //we need to pay with default affiliate system
    const defaultPorcent = await getSuperAdminSetting(
      "AFFILIATE_SYSTEM_DEFAULT_COMMISSION"
    );

    if (defaultPorcent) {
      const amount = invoiceItem.price * (Number(defaultPorcent) / 100);
      const currency = invoice.currencyId;

      await createMovementAmountForUser({
        amount,
        currencyId: currency,
        profileId,
        details: `Cashback for affiliate ${invoice.profileId}`,
        type: "CREDIT",
      });
    }
  }
};

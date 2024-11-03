"use server";
import prisma from "@/lib/db";
import { getMembership } from "@/utils/facades/serverFacades/userFacade";
import { revalidatePath } from "next/cache";

export const applyCouponToInvoice = async ({
  couponCode,
  invoiceId,
}: {
  couponCode: string;
  invoiceId: number;
}) => {
  try {
    const { organization } = await getMembership();

    const invoice = await prisma.invoice.findFirst({
      where: {
        id: invoiceId,
      },
      include: {
        Currency: true,
      },
    });

    if (!invoice) {
      throw new Error("Invoice not found");
    }

    const coupon = await prisma.coupon.findFirst({
      where: {
        code: couponCode,
        status: "ACTIVE",
      },
      include: {
        organization: true,
        settings: true,
      },
    });

    console.log(coupon);

    if (!coupon) {
      throw new Error("Coupon not found, or not active");
    }

    //Check if this coupon is connect with stripe (Ex if not are CUP (Cuba))
    if (invoice.Currency.code.toLowerCase() !== "cup") {
      const connection = coupon.settings.find(
        (setting) =>
          setting.name ===
          "stripeCouponId_" + invoice.Currency.code.toLowerCase(),
      );

      if (!connection && invoice.Currency.code.toLowerCase() !== "cup") {
        throw new Error("Coupon not connected with stripe");
      }
    }

    const organizationsFromUser = await prisma.organization.findMany({
      where: {
        referredBy: {
          some: {
            id: organization.id,
          },
        },
      },
    });

    //Check if coupon is valid for this user
    if (
      coupon.organization &&
      coupon.organization.id !== organization.id &&
      organizationsFromUser
        .map((organization) => organization.id)
        .includes(organization.id)
    ) {
      throw new Error("Coupon not valid for this user");
    }

    await prisma.invoice.update({
      where: {
        id: invoiceId,
      },
      data: {
        coupons: {
          connect: {
            id: coupon.id,
          },
        },
      },
    });

    revalidatePath("/home/invoices" + invoiceId);
    revalidatePath("/admin/invoices" + invoiceId);

    return {
      success: true,
    };
  } catch (error: any) {
    throw new Error(error.message);
  }
};

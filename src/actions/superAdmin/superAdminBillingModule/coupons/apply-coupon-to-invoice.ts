"use server";
import prisma from "@/lib/db";
 import { getMembership} from "@/utils/facades/serverFacades/userFacade";
import { revalidatePath } from "next/cache";

export const applyCouponToInvoice = async ({
  couponCode,
  invoiceId,
}: {
  couponCode: string;
  invoiceId: number;
}) => {
  try {
    const { id } = await getMembership();

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
        profile: true,
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
          "stripeCouponId_" + invoice.Currency.code.toLowerCase()
      );

      if (!connection && invoice.Currency.code.toLowerCase() !== "cup") {
        throw new Error("Coupon not connected with stripe");
      }
    }

    const organizationsFromUser = await prisma.profile.findMany({
      where: {
        referredBy: {
          some: {
            id,
          },
        },
      },
    });

    //Check if coupon is valid for this user
    if (
      coupon.profile &&
      coupon.profile.id !== id &&
      organizationsFromUser.map((organization) => organization.id).includes(id)
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

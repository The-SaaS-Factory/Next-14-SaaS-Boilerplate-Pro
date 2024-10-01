"use server";
import { InvoiceItemType } from "@/interfaces/billingModule";
import {   IUserMembership } from "@/interfaces/saasTypes";
import prisma from "@/lib/db";

export async function getTotalInvoiceAmount() {
  const invoices = await prisma.invoice.findMany({
    where: {
      status: "PAID",
    },
    select: {
      Items: {
        select: {
          price: true,
          quantity: true,
        },
      },
    },
  });
  let total = 0;

  invoices.forEach((invoice: any) => {
    invoice.Items?.forEach((item: InvoiceItemType) => {
      total += item.price * item.quantity;
    });
  });

  return total;
}

export const getCurrencyIdByCode = async (code: string) => {
  const currency = await prisma.adminCurrencies.findFirst({
    where: {
      code: code,
    },
  });

  return currency ? currency.id : null;
};

export const getSuperAdminSetting = async (settingName: string) => {
  const setting = await prisma.superAdminSetting.findFirst({
    where: {
      settingName: settingName,
    },
  });

  return setting ? setting.settingValue : null;
};

export const getAdminSettingValue = async (
  settingName: string,
  value: string
) => {
  const setting = await prisma.organizationSetting.findFirst({
    where: {
      settingName: settingName,
      settingValue: value,
    },
  });

  return setting ? setting : null;
};

export const isSuperAdmin = (userMembership: IUserMembership): boolean => {
  const userPermissions = new Set(
    userMembership.permissions.map((p) => p.name)
  );

  return userPermissions.has("superAdmin:administration:read");
};

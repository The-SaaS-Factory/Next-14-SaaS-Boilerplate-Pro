"use server";
import { createAmountByDefaultForAgencies } from "@/actions/admin/walletModule/create-amount-movement";
import prisma from "@/lib/db";
import { checkPermission } from "@/utils/facades/serverFacades/scurityFacade";
import { getMembership } from "@/utils/facades/serverFacades/userFacade";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

const scope = "superAdmin:billing:upsert";

export const upsertCurrency = async ({
  modelId,
  payload,
}: {
  modelId?: number;
  payload:
    | Prisma.AdminCurrenciesCreateInput
    | Prisma.AdminCurrenciesUpdateInput;
}) => {
  try {
    const { permissions } = await getMembership();

    checkPermission(permissions, scope);

    const currency = await prisma.adminCurrencies.upsert({
      where: {
        id: modelId ? modelId : 0,
      },
      update: {
        name: payload.name,
        main: 0,
        code: payload.code as string,
        rate: payload.rate as number,
      },
      create: {
        name: payload.name as string,
        main: 0,
        rate: payload.rate as number,
        code: payload.code as string,
      },
    });

    const agencies = await prisma.profile.findMany({});

    await Promise.all(
      agencies.map(async (agency) => {
        await createAmountByDefaultForAgencies({
          id: agency.id,
          currencyId: currency.id,
        });
      })
    );

    revalidatePath("/admin/settings/billing");
  } catch (error: any) {
    console.log(error);

    throw new Error(error.message);
  }
};

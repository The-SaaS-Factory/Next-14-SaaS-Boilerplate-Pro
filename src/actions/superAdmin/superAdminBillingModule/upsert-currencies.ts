"use server";
import prisma from "@/lib/db";
import { checkPermission } from "@/utils/facades/serverFacades/securityFacade";
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
    const { userMembership } = await getMembership();

    checkPermission(
      userMembership.permissions.map((p) => p.name),
      scope
    );

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

    revalidatePath("/admin/settings/billing");

    return currency;
  } catch (error: any) {
    console.log(error);

    throw new Error(error.message);
  }
};

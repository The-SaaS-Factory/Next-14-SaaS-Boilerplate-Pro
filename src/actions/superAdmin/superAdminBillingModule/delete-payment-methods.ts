"use server";

import prisma from "@/lib/db";
import { checkPermission } from "@/utils/facades/serverFacades/scurityFacade";
import { getMembership  } from "@/utils/facades/serverFacades/userFacade";
 
import { revalidatePath } from "next/cache";
const scope = "superAdmin:billing:upsert";

export const deletePaymentMethod = async (paymentMethodId: number) => {

const { permissions } = await getMembership();

  checkPermission(permissions, scope);


  await prisma.paymentMethod.delete({
    where: {
      id: paymentMethodId,
    },
  });

  revalidatePath("/admin/settings/billing");
};

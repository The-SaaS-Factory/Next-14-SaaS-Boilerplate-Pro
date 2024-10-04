"use server";

import prisma from "@/lib/db";
import { getMembership } from "@/utils/facades/serverFacades/userFacade";
import { revalidatePath } from "next/cache";

export const makeOrganizationOnboardingCompleted = async () => {
  const { organization } = await getMembership();

  await prisma.organization.update({
    where: {
      id: organization.id,
    },
    data: {
      isOnboardingCompleted: true,
    },
  });

  revalidatePath("/home");

  return "ok";
};

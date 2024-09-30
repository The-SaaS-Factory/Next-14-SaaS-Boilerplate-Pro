"use server";

import prisma from "@/lib/db";
import { getMembership } from "@/utils/facades/serverFacades/userFacade";
import { revalidatePath } from "next/cache";

export const deleteTenantMember = async (modelId: number) => {
  const { organization } = await getMembership();

  await prisma.userMembership.delete({
    where: {
      organizationId: organization.id,
      id: modelId,
    },
  });

  revalidatePath("home/admin/agentes");
};

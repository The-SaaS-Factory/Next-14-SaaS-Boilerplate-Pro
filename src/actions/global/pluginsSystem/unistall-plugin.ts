"use server";

import { getMembership } from "@/utils/facades/serverFacades/userFacade";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/db";

export const uninstallPlugin = async (pluginId: number) => {
  const { organization } = await getMembership();
  const id = organization.id;
  const installed = await prisma.organizationPlugin.findFirst({
    where: {
      organizationId: id,
      pluginId: pluginId,
    },
  });

  if (!installed) {
    throw new Error("El plugin no se encuentra instalado.");
  }

  await prisma.organizationPlugin.delete({
    where: {
      id: installed.id,
    },
  });

  revalidatePath("/home/plugins/actives");
};

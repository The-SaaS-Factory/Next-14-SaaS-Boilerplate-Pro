"use server";

 import { getMembership} from "@/utils/facades/serverFacades/userFacade";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/db";

export const installPlugin = async (pluginId: number) => {
  const { id } = await getMembership();

  const installed = await prisma.profilePlugin.findFirst({
    where: {
      organizationId: id,
      pluginId: pluginId,
    },
  });

  if (installed) {
    throw new Error("El plugin ya se encuentra instalado");
  }

  await prisma.profilePlugin.create({
    data: {
      organizationId: id,
      pluginId,
    },
  });

  revalidatePath("/home/plugins/actives");
};

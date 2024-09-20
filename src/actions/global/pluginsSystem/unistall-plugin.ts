"use server";

 import { getMembership} from "@/utils/facades/serverFacades/userFacade";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/db";

export const uninstallPlugin = async (pluginId: number) => {
  const { id } = await getMembership();

  const installed = await prisma.profilePlugin.findFirst({
    where: {
      profileId: id,
      pluginId: pluginId,
    },
  });

  if (!installed) {
    throw new Error("El plugin no se encuentra instalado.");
  }

  await prisma.profilePlugin.delete({
    where: {
      id: installed.id,
    },
  });

  revalidatePath("/home/plugins/actives");
};

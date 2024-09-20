"use server";
import prisma from "@/lib/db";
 import { getMembership} from "@/utils/facades/serverFacades/userFacade";
import { revalidatePath } from "next/cache";

export const updateTenantPluginConfiguration = async (
  profilePluginId: number,
  configuration: string
) => {
  const { id } = await getMembership();

  const configurationProfile = await prisma.profilePlugin.findFirst({
    where: {
      id: profilePluginId,
      profileId: id,
    },
    include: {
      plugin: true,
    },
  });

  if (!configurationProfile) {
    throw new Error("No se pudo guardar la configuración");
  }

  const newPorfilePlugin = await prisma.profilePlugin.update({
    where: {
      id: profilePluginId,
    },
    data: {
      configuration,
    },
    include: {
      plugin: {
        include: {
          configurations: true,
        },
      },
    },
  });

  revalidatePath("/home/plugins/" + configurationProfile.plugin?.slug);

  return newPorfilePlugin;
};

"use server";
import prisma from "@/lib/db";
import { getMembership } from "@/utils/facades/serverFacades/userFacade";
import { revalidatePath } from "next/cache";

export const updateTenantPluginConfiguration = async (
  profilePluginId: number,
  configuration: string,
) => {
  const { organization } = await getMembership();

  const configurationProfile = await prisma.organizationPlugin.findFirst({
    where: {
      id: profilePluginId,
      organizationId: organization.id,
    },
    include: {
      plugin: true,
    },
  });

  if (!configurationProfile) {
    throw new Error("No se pudo guardar la configuración");
  }

  const newPorfilePlugin = await prisma.organizationPlugin.update({
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

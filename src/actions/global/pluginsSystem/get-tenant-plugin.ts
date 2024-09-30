"use server";
import prisma from "@/lib/db";
 import { getMembership} from "@/utils/facades/serverFacades/userFacade";

export const getTenantPluginDetails = async (pluginSlug: string) => {
  const { id } = await getMembership();

  return await prisma.profilePlugin.findFirst({
    where: {
      organizationId: id,
      plugin: {
        slug: pluginSlug,
      },
    },
    include: {
      plugin: {
        include: {
          configurations: true,
        },
      },
      
    },
  });
};

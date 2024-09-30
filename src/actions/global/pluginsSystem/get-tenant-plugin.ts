"use server";
import prisma from "@/lib/db";
import { getMembership } from "@/utils/facades/serverFacades/userFacade";

export const getTenantPluginDetails = async (pluginSlug: string) => {
  const { organization } = await getMembership();
  const id = organization.id;
  return await prisma.organizationPlugin.findFirst({
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

"use server";

import prisma from "@/lib/db";
import { getMembership } from "@/utils/facades/serverFacades/userFacade";

export const getProjectSettings = async (projectId: number) => {
  const { organization } = await getMembership();

  return await prisma.projectSetting.findMany({
    where: {
      projectId: projectId,
      project: {
        organizationId: organization.id,
      },
    },
  });
};

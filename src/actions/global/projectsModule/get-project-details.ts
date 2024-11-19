"use server";

import prisma from "@/lib/db";
import { getMembership } from "@/utils/facades/serverFacades/userFacade";

export const getProjectDetails = async (projectId: number) => {
  const { organization } = await getMembership();

  return await prisma.project.findFirst({
    where: {
      organizationId: organization.id,
      id: projectId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

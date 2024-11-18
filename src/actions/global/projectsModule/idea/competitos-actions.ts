"use server";

import prisma from "@/lib/db";
import { getMembership } from "@/utils/facades/serverFacades/userFacade";

export async function getProjectCompetidors(projectId: number) {
  const { organization } = await getMembership();

  const projectOwner = await prisma.project.findFirst({
    where: { id: projectId, organizationId: organization.id },
  });

  if (!projectOwner) {
    throw new Error("Project not found");
  }

  return await prisma.projectCompetitor.findMany({
    where: { projectId },
  });
}

export async function upsertProejctCompetitor(
  projectId: number,
  competidor: any,
) {
  const { organization } = await getMembership();

  const projectOwner = await prisma.project.findFirst({
    where: { id: projectId, organizationId: organization.id },
  });

  if (!projectOwner) {
    throw new Error("Project not found");
  }

  return await prisma.projectCompetitor.upsert({
    where: { id: competidor.id },
    create: {
      projectId,
      ...competidor,
    },
    update: {
      ...competidor,
    },
  });
}

export const deleteCompetitor = async (projectId: number, id: string) => {
  const { organization } = await getMembership();

  const projectOwner = await prisma.project.findFirst({
    where: { id: projectId, organizationId: organization.id },
  });

  if (!projectOwner) {
    throw new Error("Project not found");
  }

  return await prisma.projectCompetitor.delete({
    where: { id },
  });
};

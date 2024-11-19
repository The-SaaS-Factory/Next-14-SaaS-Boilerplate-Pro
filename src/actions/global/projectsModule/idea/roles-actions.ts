"use server";

import prisma from "@/lib/db";
import { getMembership } from "@/utils/facades/serverFacades/userFacade";

export async function getAllTenantRoles(projectId: number) {
  const { organization } = await getMembership();

  const projectOwner = await prisma.project.findFirst({
    where: { id: projectId, organizationId: organization.id },
  });

  if (!projectOwner) {
    throw new Error("Project not found");
  }

  const roles = await prisma.projectRole.findMany({
    where: { projectId },
    orderBy: {
      id: "asc",
    },
  });

  if (roles.length == 0) {
    const seed = [
      {
        name: "Super Admin",
        projectId: projectId,
      },
      {
        name: "Tenant",
        projectId: projectId,
      },
      {
        name: "Client",
        projectId: projectId,
      },
    ];
    await prisma.projectRole.createMany({
      data: seed,
    });

    return seed;
  }

  return roles;
}

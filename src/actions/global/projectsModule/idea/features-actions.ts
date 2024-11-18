"use server";

import prisma from "@/lib/db";
import { getMembership } from "@/utils/facades/serverFacades/userFacade";

export async function getRolesWithFeatures(projectId: number) {
  const { organization } = await getMembership();

  const projectOwner = await prisma.project.findFirst({
    where: { id: projectId, organizationId: organization.id },
  });

  if (!projectOwner) {
    throw new Error("Project not found");
  }

  const roles = await prisma.projectRole.findMany({
    where: { projectId },
    include: {
      features: {
        include: {
          subFeatures: true,
        },
      },
    },
  });

  return roles.reduce(
    (acc, role) => {
      acc[role.name] = role.features.map((feature) => ({
        id: feature.id,
        text: feature.text,
        position: feature.position,
        description: feature.description,
        subFeatures: feature.subFeatures.map((subFeature) => ({
          id: subFeature.id,
          text: subFeature.text,
          description: subFeature.description,
        })),
      }));
      return acc;
    },
    {} as Record<
      string,
      Array<{
        id: string;
        text: string;
        subFeatures: Array<{ id: string; text: string }>;
      }>
    >,
  );
}
export async function updateProjectFeatures(
  projectId: number,
  roleName: string,
  feature: any,
) {
  const { organization } = await getMembership();

  const projectOwner = await prisma.project.findFirst({
    where: { id: projectId, organizationId: organization.id },
  });

  if (!projectOwner) {
    throw new Error("Project not found");
  }

  const role = await prisma.projectRole.findFirst({
    where: { name: roleName, projectId },
  });

  if (!role) {
    throw new Error(`Role "${roleName}" not found`);
  }

  // Validaciones
  if (typeof feature.id !== "string") {
    throw new Error(`Invalid feature.id type: ${typeof feature.id}`);
  }
  if (!feature.subFeatures.every((sf) => typeof sf.id === "string")) {
    throw new Error("Invalid subFeature IDs in feature.subFeatures");
  }

  const description = feature.description || "Default description";

  const updatedFeature = await prisma.projectFeature.upsert({
    where: { id: feature.id },
    create: {
      id: feature.id.trim(),
      text: feature.text,
      description,
      position: feature.position,
      project: {
        connect: {
          id: role.projectId,
        },
      },
      role: {
        connect: {
          id: role.id,
        },
      },
    },
    update: {
      text: feature.text,
      description,
      position: feature.position,
    },
  });

  for (const subFeature of feature.subFeatures) {
    await prisma.projectSubFeature.upsert({
      where: { id: subFeature.id },
      create: {
        id: subFeature.id,
        text: subFeature.text,
        featureId: updatedFeature.id,
        description,
      },
      update: {
        text: subFeature.text,
        description: subFeature.description,
      },
    });
  }

  await prisma.projectSubFeature.deleteMany({
    where: {
      featureId: updatedFeature.id,
      id: {
        notIn: feature.subFeatures.map((sf) => sf.id),
      },
    },
  });
}

export const deleteFeature = async (projectId: number, id: string) => {
  const { organization } = await getMembership();

  const projectOwner = await prisma.project.findFirst({
    where: { id: projectId, organizationId: organization.id },
  });

  if (!projectOwner) {
    throw new Error("Project not found");
  }

  return await prisma.projectFeature.delete({
    where: { id },
  });
};

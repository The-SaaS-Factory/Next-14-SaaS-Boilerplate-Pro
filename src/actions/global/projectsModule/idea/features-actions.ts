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
        subFeatures: feature.subFeatures.map((subFeature) => ({
          id: subFeature.id,
          text: subFeature.text,
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

export async function updateRoleFeatures(
  projectId: number,
  roleName: string,
  features: any,
) {
  console.log('d');
  
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

  console.log(role);
  

  if (!role) {
    throw new Error(`Role "${roleName}" not found`);
  }

  console.log(features);
  

  for (const feature of features) {
    const updatedFeature = await prisma.projectFeature.upsert({
      where: { id: feature.id },
      create: {
        id: feature.id,
        text: feature.text,
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
      },
    });

    for (const subFeature of feature.subFeatures) {
      await prisma.projectSubFeature.upsert({
        where: { id: subFeature.id },
        create: {
          id: subFeature.id,
          text: subFeature.text,
          featureId: updatedFeature.id,
        },
        update: {
          text: subFeature.text,
        },
      });
    }

    // Elimina subfeatures que ya no están en la lista
    await prisma.projectSubFeature.deleteMany({
      where: {
        featureId: updatedFeature.id,
        id: {
          notIn: feature.subFeatures.map((sf) => sf.id),
        },
      },
    });
  }

  // Elimina features que ya no están en la lista
  await prisma.projectFeature.deleteMany({
    where: {
      roleId: role.id,
      id: {
        notIn: features.map((f) => f.id),
      },
    },
  });
}

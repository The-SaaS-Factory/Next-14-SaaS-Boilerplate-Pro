"use server";

import { getMembership } from "@/utils/facades/serverFacades/userFacade";
import prisma from "@/lib/db";

export const getSwot = async (projectId: number) => {
  const { organization } = await getMembership();

  const projectOwner = await prisma.project.findFirst({
    where: { id: projectId, organizationId: organization.id },
  });

  if (!projectOwner) {
    throw new Error("Project not found");
  }

  const swot = await prisma.projectSetting.findFirst({
    where: {
      settingName: "swot",
      projectId: projectId,
      project: {
        organizationId: organization.id,
      },
    },
  });

  if (!swot) {
    return [];
  }

  return JSON.parse(swot.settingValue);
};

export const updateSwot = async (projectId: number, data: any) => {
  const { organization } = await getMembership();

  const projectOwner = await prisma.project.findFirst({
    where: { id: projectId, organizationId: organization.id },
  });

  if (!projectOwner) {
    throw new Error("Project not found");
  }

  //Update in setting foda
  const swot = await prisma.projectSetting.findFirst({
    where: {
      settingName: "swot",
      projectId: projectId,
      project: {
        organizationId: organization.id,
      },
    },
  });

  const { strengths, weaknesses, opportunities, threats } = data;

  await prisma.projectSetting.upsert({
    where: { id: swot?.id ?? -1 },
    create: {
      project: {
        connect: {
          id: projectId,
        },
      },
      settingName: "swot",
      settingValue: JSON.stringify({
        strengths,
        weaknesses,
        opportunities,
        threats,
      }),
    },
    update: {
      settingValue: JSON.stringify({
        strengths,
        weaknesses,
        opportunities,
        threats,
      }),
    },
  });
};

"use server";

import prisma from "@/lib/db";
import { getMembership } from "@/utils/facades/serverFacades/userFacade";
import { ProjectStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const createProject = async (name: string, description: string, status: ProjectStatus) => {
  const { organization } = await getMembership();

  const project = await prisma.project.create({
    data: {
      name,
      description,
      status,
      organizationId: organization.id,
    },
  });

  revalidatePath("/home/admin/factory/lobby");

  return project;
};

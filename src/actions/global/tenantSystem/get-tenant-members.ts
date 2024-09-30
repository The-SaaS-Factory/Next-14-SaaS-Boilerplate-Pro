"use server";

import prisma from "@/lib/db";
import { getMembership } from "@/utils/facades/serverFacades/userFacade";

export const getTenantMembers = async () => {
  const { organization } = await getMembership();

  return await prisma.userMembership.findMany({
    where: {
      organizationId: organization.id,
    },
    include: {
      user: {
        select: {
          email: true,
          name: true,
        },
      },
      permissions: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
};

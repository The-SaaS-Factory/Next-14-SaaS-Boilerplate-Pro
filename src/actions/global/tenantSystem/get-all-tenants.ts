"use server";
import prisma from "@/lib/db";
import { checkPermission } from "@/utils/facades/serverFacades/securityFacade";
import { tenantModuleScope } from "./tenantFacade";
import { getMembership } from "@/utils/facades/serverFacades/userFacade";
import { Prisma } from "@prisma/client";

export const getAllTenants = async () => {
  const { userMembership } = await getMembership();
  const permissions = userMembership.permissions.map((p) => p.name);

  checkPermission(permissions, tenantModuleScope);

  return await prisma.organization.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      userMemberships: {
        include: {
          user: true,
        },
      },
    },
  });
};

export const getAllTenantBySearch = async ({
  args,
}: {
  args: {
    limit?: number;
    offset?: number;
    search?: string;
  };
}) => {
  let whereSearch: Prisma.OrganizationWhereInput;
  const limit = args.limit || 1000;
  const offset = args.offset;

  whereSearch = {};

  if (args.search) {
    whereSearch = {
      name: {
        contains: args.search,
      },
    };
  }

  const data = await prisma.organization.findMany({
    where: {
      ...whereSearch,
    },
    skip: offset,
    take: limit,
    include: {
      userMemberships: true,
      organizationCapabilities: {
        include: {
          capability: true,
        },
      },
      subscription: {
        include: {
          plan: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const totalCount = await prisma.organization.count({
    where: { name: { contains: args.search } },
  });

  const totalPages = Math.ceil(totalCount / limit);

  return { data, totalCount, totalPages };
};

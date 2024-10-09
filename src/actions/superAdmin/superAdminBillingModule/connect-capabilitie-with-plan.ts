"use server";
import prisma from "@/lib/db";
import { propagateCapabilitiesOnAssociateWithPlanNewCapability } from "@/utils/facades/serverFacades/membershipFacade";
import { refreshOrganizationData } from "@/utils/facades/serverFacades/organizationFacade";
import { revalidatePath } from "next/cache";
export const connectCapabilitieWithPlan = async (args: any) => {
  const oldConnection = await prisma.planCapabilities.findFirst({
    where: {
      capabilityId: args.capabilityId,
      planId: args.planId,
    },
  });

  if (!oldConnection) {
    await propagateCapabilitiesOnAssociateWithPlanNewCapability(args.planId);
  }

  await prisma.planCapabilities.upsert({
    where: {
      id: oldConnection ? oldConnection.id : 0,
    },
    update: {
      count: args.count,
      name: args.name,
    },
    create: {
      capabilityId: args.capabilityId,
      planId: args.planId,
      count: args.count,
      name: args.name,
    },
  });

  const organizationCapabilities =
    await prisma.organizationCapabilities.findMany({
      where: {
        capabilityId: args.capabilityId,
      },
    });

  if (organizationCapabilities.length > 0) {
    await prisma.organizationCapabilities.updateMany({
      where: {
        id: {
          in: organizationCapabilities.map((o) => o.id),
        },
      },
      data: {
        count: args.count,
      },
    });
  }

  refreshOrganizationData();

  revalidatePath("/admin/billing/plans/plans/edit/" + args.planId);
};

"use server";

import prisma from "@/lib/db";
import { cache } from "react";

const getCurrentMembership = async (organizationId: number) => {
  return await prisma.subscription.findFirst({
    where: {
      organizationId,
    },
    include: {
      plan: true,
    },
  });
};

export const updateMembership = async ({
  organizationId,
  months,
  planId,
  pricingId,
  currencyId,
}: {
  organizationId: number;
  months: number;
  planId: number;
  pricingId: number | null;
  currencyId: number | null;
}) => {
  let currentMemberShip = await getCurrentMembership(organizationId);

  const membership = await createMembership({
    organizationId,
    planId,
    currentMemberShip,
    months,
    pricingId,
    currencyId,
  });

  propagateCapabilitiesFromPlanToOrganization(planId, organizationId);

  return membership;
};

const createMembership = async ({
  organizationId,
  planId,
  currentMemberShip,
  months,
  pricingId,
  currencyId,
}: {
  organizationId: number;
  planId: number;
  currentMemberShip: any;
  months: number;
  pricingId: number | null;
  currencyId: number | null;
}) => {
  const createPayload = {
    pricingId: pricingId,
    currencyId: currencyId,
    organizationId: organizationId,
    planId: planId,
    startDate: new Date(),
    endDate: new Date(),
  };

  const endDate = currentMemberShip
    ? new Date(currentMemberShip.endDate)
    : new Date();

  return await prisma.subscription.upsert({
    where: {
      id: currentMemberShip ? currentMemberShip.id : 0,
    },
    create: createPayload,
    update: {
      planId: planId,
      pricingId: pricingId,
      currencyId: currencyId,
      endDate: new Date(endDate.setMonth(endDate.getMonth() + months)),
    },
    include: {
      plan: true,
    },
  });
};

export const propagateCapabilitiesOnAssociateWithPlanNewCapability = async (
  planId = 0,
) => {
  const users = await prisma.subscription.findMany({
    where: {
      planId: planId,
    },
    distinct: ["organizationId"],
  });

  users.map((membership: any) => {
    propagateCapabilitiesFromPlanToOrganization(
      planId,
      membership.id as number,
    );
  });
};

export const propagateCapabilitiesFromPlanToOrganization = async (
  planId: number,
  organizationId: number,
) => {
  const capabilities = await prisma.planCapabilities.findMany({
    where: {
      planId: planId,
    },
    include: {
      capabilitie: true,
    },
  });

  Promise.all(
    capabilities.map(async (c: any) => {
      const organizationCapacity =
        await prisma.organizationCapabilities.findFirst({
          where: {
            organizationId: organizationId,
            capabilityId: c.capabilitie.id,
          },
        });

      if (!organizationCapacity) {
        await prisma.organizationCapabilities.create({
          data: {
            organizationId: organizationId,
            capabilityId: c.capabilitie.id,
            count: c.capabilitie.type === "LIMIT" ? 0 : c.count,
          },
        });
      } else {
        await prisma.organizationCapabilities.update({
          where: {
            id: organizationCapacity.id,
          },
          data: {
            count: c.capabilitie.type === "LIMIT" ? 0 : c.count,
          },
        });
      }
    }),
  );
};

export const getOrganizationCapabilitiesNames = async (
  organizationId: number,
) => {
  const capabilities = await prisma.organizationCapabilities.findMany({
    where: {
      organizationId,
    },
    include: {
      capability: {
        select: {
          name: true,
          type: true,
        },
      },
    },
  });

  const capabilityNames = capabilities
    ?.filter((capa) => {
      if (capa.capability.type === "PERMISSION") {
        return (capa.count = 1);
      }
    })
    .map((capability) => capability?.capability.name);

  return capabilityNames || [];
};

export const checkCapabilityPermission = cache(
  async (organizationId: number, capabilityName: string) => {
    const capabilities = await getOrganizationCapabilitiesNames(organizationId);

    return capabilities?.includes(capabilityName) ?? false;
  },
);

export const checkCapabilityLimit = async (
  organizationId: number,
  capabilityName: string,
) => {
  const organizationCapabilities =
    await prisma.organizationCapabilities.findFirst({
      where: {
        organizationId,
        capability: {
          name: capabilityName,
        },
      },
      include: {
        capability: true,
      },
    });

  if (!organizationCapabilities) return false;

  const subscription = await prisma.subscription.findFirst({
    where: {
      organizationId,
    },
  });

  if (!subscription) return false;

  const planCapability = await prisma.planCapabilities.findFirst({
    where: {
      planId: subscription?.planId,
      capabilityId: organizationCapabilities?.capability.id,
    },
  });

  if (!planCapability) return false;

  return planCapability?.count > organizationCapabilities.count;
};

export const registerCapabilityUsage = async (
  organizationId: number,
  capabilityName: string,
) => {
  const organizationCapability =
    await prisma.organizationCapabilities.findFirst({
      where: {
        organizationId,
        capability: {
          name: capabilityName,
        },
      },
      include: {
        capability: true,
      },
    });

  await prisma.organizationCapabilities.update({
    where: {
      id: organizationCapability.id,
    },
    data: {
      count: organizationCapability.count + 1,
    },
  });

  return true;
};

export const checkOrganizationCapabilityInServer = ({
  capabilityName,
  organizationCapabilities,
  subscription,
}: {
  capabilityName: string;
  organizationCapabilities?: any; //Fix Type
  subscription?: any; //Fix Type
}) => {
  if (!subscription) return false;
  if (!organizationCapabilities) return false;

  const organizationCapability = organizationCapabilities.find(
    (o) => o.name === capabilityName,
  );

  if (!organizationCapability) return false;

  if (organizationCapability.capability.type === "PERMISSION") {
    return organizationCapability.count === 1;
  } else if (organizationCapability.capability.type === "LIMIT") {
    // Usamos `await` para resolver la promesa devuelta por `find`
    const planCapability = subscription.plan.planCapabilities.find((p) => {
      return (
        p.planId === subscription.planId &&
        p.capabilityId === organizationCapability.capability.id
      );
    });

    if (!planCapability) return false;

    return organizationCapability.count < planCapability.count;
  }

  return false;
};

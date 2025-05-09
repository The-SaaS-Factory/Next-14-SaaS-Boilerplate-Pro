"use server";

import prisma from "@/lib/db";
import { cache } from "react";
import { getMembership } from "./userFacade";

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

  const now = new Date();
  
  // Verificar si hay una membresía previa y si no está vencida
  const startDate = currentMemberShip && new Date(currentMemberShip.endDate) > now
    ? new Date(currentMemberShip.endDate) // Usar fecha de fin anterior si aún es válida
    : now; // Usar fecha actual si no hay membresía previa o está vencida
  
  const endDate = new Date(startDate);
  
  // Calculando correctamente la fecha final para soportar fracciones de mes
  if (Number.isInteger(months)) {
    // Si es un número entero de meses, usar setMonth
    endDate.setMonth(endDate.getMonth() + months);
  } else {
    // Si es una fracción, convertir a días (aproximadamente 30 días por mes)
    const days = Math.round(months * 30);
    endDate.setDate(endDate.getDate() + days);
  }

  return await prisma.subscription.upsert({
    where: {
      id: currentMemberShip ? currentMemberShip.id : 0,
    },
    create: {
      ...createPayload,
      startDate: now,
      endDate: endDate, // Usar la fecha final calculada
    },
    update: {
      planId: planId,
      pricingId: pricingId,
      currencyId: currencyId,
      startDate: now, // Actualizar también la fecha de inicio
      endDate: endDate,
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

export const checkOrganizationCapabilityInServer = cache(async ({
  capabilityName,
}: {
  capabilityName: string;
}) => {
  const { organization } = await getMembership();
  const organizationCapabilities = organization.capabilities;
  const subscription: any = organization.subscription;

  if (!subscription) return false;
  if (!organizationCapabilities) return false;

  const organizationCapability: any = organizationCapabilities.find(
    (o: any) => o.capability.name === capabilityName,
  );

  if (!organizationCapability) return false;

  if (organizationCapability.capability.type === "PERMISSION") {
    return organizationCapability.count !== 0;
  } else if (organizationCapability.capability.type === "LIMIT") {
    const planCapability = subscription.plan?.PlanCapabilities.find((p) => {
      return (
        p.planId === subscription.planId &&
        p.capabilityId === organizationCapability.capability.id
      );
    });

    console.log(planCapability);


    if (!planCapability) return false;

    return organizationCapability.count < planCapability.count;
  }

  return false;
});


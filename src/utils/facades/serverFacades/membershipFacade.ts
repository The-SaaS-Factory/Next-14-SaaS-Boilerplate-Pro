"use server";
import prisma from "@/lib/db";
const getCurrentMembership = async (organizationId: number) => {
  return await  prisma.subscription.findFirst({
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

  propagateCapabilitiesFromPlanToUser(planId, organizationId);

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

  return await  prisma.subscription.upsert({
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

export const propagateCapabilitiesOnAsociateWithPlanNewCapabilitie = async (
  planId = 0
) => {
  const users = await  prisma.subscription.findMany({
    where: {
      planId: planId,
    },
    distinct: ["organizationId"],
  });

  users.map((membership: any) => {
    propagateCapabilitiesFromPlanToUser(planId, membership.id as number);
  });
};

export const propagateCapabilitiesFromPlanToUser = async (
  planId: number,
  organizationId: number
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
      const userCapabilicitie = await prisma.organizationCapabilities.findFirst(
        {
          where: {
            organizationId: organizationId,
            capabilitieId: c.capabilitie.id,
          },
        }
      );

      if (!userCapabilicitie) {
        await prisma.organizationCapabilities.create({
          data: {
            organizationId: organizationId,
            capabilitieId: c.capabilitie.id,
            count: c.capabilitie.type === "LIMIT" ? 0 : c.count,
          },
        });
      } else {
        await prisma.organizationCapabilities.update({
          where: {
            id: userCapabilicitie.id,
          },
          data: {
            count: c.capabilitie.type === "LIMIT" ? 0 : c.count,
          },
        });
      }
    })
  );
};

export const getUserCapabilitiesNames = async (organizationId: number) => {
  const membership = await  prisma.subscription.findFirst({
    where: {
      organizationId,
    },
    include: {
      plan: {
        include: {
          PlanCapabilities: {
            include: {
              capabilitie: true,
            },
          },
        },
      },
    },
  });

  //35% cashback for affiliates
  const capabilitieNames = membership?.plan?.PlanCapabilities.map(
    (planCapability) => planCapability.capabilitie.name
  );

  return capabilitieNames;
};

export const getUserCapabilitieLimitAvailable = async (
  organizationId: number,
  capabilityName: string
) => {
  const userCapabilities = await prisma.organizationCapabilities.findFirst({
    where: {
      organizationId,
      capabilitie: {
        name: capabilityName,
      },
    },
    include: {
      capabilitie: true,
    },
  });

  if (!userCapabilities) return false;

  const userMembership = await  prisma.subscription.findFirst({
    where: {
      organizationId,
    },
  });

  if (!userMembership) return false;

  const planCapability = await prisma.planCapabilities.findFirst({
    where: {
      planId: userMembership?.planId,
      capabilitieId: userCapabilities?.capabilitie.id,
    },
  });

  if (!planCapability) return false;

  return planCapability?.count > userCapabilities.count;
};

export const registerCapabilitieUsage = async (
  organizationId: number,
  capabilityName: string
) => {
  const userCapabilities = await prisma.organizationCapabilities.findFirst({
    where: {
      organizationId,
      capabilitie: {
        name: capabilityName,
      },
    },
    include: {
      capabilitie: true,
    },
  });

  if (!userCapabilities) return false;

  const userMembership = await  prisma.subscription.findFirst({
    where: {
      organizationId,
    },
  });

  if (!userMembership) return false;

  const planCapability = await prisma.planCapabilities.findFirst({
    where: {
      planId: userMembership?.planId,
      capabilitieId: userCapabilities?.capabilitie.id,
    },
  });

  if (!planCapability) return false;

  await prisma.organizationCapabilities.update({
    where: {
      id: userCapabilities.id,
    },
    data: {
      count: userCapabilities.count + 1,
    },
  });

  return true;
};

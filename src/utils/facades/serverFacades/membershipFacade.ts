"use server";
import prisma from "@/lib/db";
const getCurrentMembership = async (profileId: number) => {
  return await prisma.membership.findFirst({
    where: {
      profileId,
    },
    include: {
      plan: true,
    },
  });
};

export const updateMembership = async ({
  profileId,
  months,
  planId,
  pricingId,
  currencyId,
}: {
  profileId: number;
  months: number;
  planId: number;
  pricingId: number | null;
  currencyId: number | null;
}) => {
  let currentMemberShip = await getCurrentMembership(profileId);

  const membership = await createMembership({
    profileId,
    planId,
    currentMemberShip,
    months,
    pricingId,
    currencyId,
  });

  propagateCapabilitiesFromPlanToUser(planId, profileId);

  return membership;
};

const createMembership = async ({
  profileId,
  planId,
  currentMemberShip,
  months,
  pricingId,
  currencyId,
}: {
  profileId: number;
  planId: number;
  currentMemberShip: any;
  months: number;
  pricingId: number | null;
  currencyId: number | null;
}) => {
  const createPayload = {
    pricingId: pricingId,
    currencyId: currencyId,
    profileId: profileId,
    planId: planId,
    startDate: new Date(),
    endDate: new Date(),
  };

  const endDate = currentMemberShip
    ? new Date(currentMemberShip.endDate)
    : new Date();

  return await prisma.membership.upsert({
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
  const users = await prisma.membership.findMany({
    where: {
      planId: planId,
    },
    distinct: ["profileId"],
  });

  users.map((membership: any) => {
    propagateCapabilitiesFromPlanToUser(planId, membership.id as number);
  });
};

export const propagateCapabilitiesFromPlanToUser = async (
  planId: number,
  profileId: number
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
      const userCapabilicitie = await prisma.profileCapabilities.findFirst({
        where: {
          profileId: profileId,
          capabilitieId: c.capabilitie.id,
        },
      });

      if (!userCapabilicitie) {
        await prisma.profileCapabilities.create({
          data: {
            profileId: profileId,
            capabilitieId: c.capabilitie.id,
            count: c.capabilitie.type === "LIMIT" ? 0 : c.count,
          },
        });
      } else {
        await prisma.profileCapabilities.update({
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

export const getUserCapabilitiesNames = async (profileId: number) => {
  const membership = await prisma.membership.findFirst({
    where: {
      profileId,
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
  profileId: number,
  capabilityName: string
) => {
  const userCapabilities = await prisma.profileCapabilities.findFirst({
    where: {
      profileId,
      capabilitie: {
        name: capabilityName,
      },
    },
    include: {
      capabilitie: true,
    },
  });


  if (!userCapabilities) return false;

  const userMembership = await prisma.membership.findFirst({
    where: {
      profileId,
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
  profileId: number,
  capabilityName: string
) => {
  const userCapabilities = await prisma.profileCapabilities.findFirst({
    where: {
      profileId,
      capabilitie: {
        name: capabilityName,
      },
    },
    include: {
      capabilitie: true,
    },
  });

  if (!userCapabilities) return false;

  const userMembership = await prisma.membership.findFirst({
    where: {
      profileId,
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

  await prisma.profileCapabilities.update({
    where: {
      id: userCapabilities.id,
    },
    data: {
      count: userCapabilities.count + 1,
    },
  });

  return true;
};

"use server";

 
import prisma from "@/lib/db";

export const getMembershipDetails = async (membershipId: number) => {
    
  const membership = await prisma.membership.findFirst({
    where: {
      id: membershipId,
    },
    include: {
      profile: {
        select: {
          id: true,
          name: true,
          avatar: true,
          email: true,
        },
      },
      currency: true,
      plan: true,
      pricing: true,
    },
  });

  return membership;
};

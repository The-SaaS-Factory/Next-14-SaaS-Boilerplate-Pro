"use server";

import prisma from "@/lib/db";
import { getMembership } from "@/utils/facades/serverFacades/userFacade";

export const getAffiliatesForUser = async (): Promise<any> => {
  try {
    const { id } = await getMembership();

    //Check if user already has an affiliate
    const userAffiliate = await prisma.referral.findMany({
      where: {
        referredId: id,
      },
      include: {
        refer: {
          select: {
            name: true,
            createdAt: true,
          },
        },
      },
    });

    if (userAffiliate) {
      return userAffiliate;
    }

    return "no-affiliate";
  } catch (error: any) {
    throw new Error(error);
  }
};

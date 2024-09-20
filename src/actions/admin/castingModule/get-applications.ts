"use server";

import { getMembership } from "@/utils/facades/serverFacades/userFacade";

import prisma from "@/lib/db";

export const getApplications = async () => {

    const { profile } = await getMembership()

    const application = await prisma.castingAplication.findMany({
        where: {
            profileId: profile.id
        }

    });

    console.log(application)

    return application;
};

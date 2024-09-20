"use server"

import prisma from "@/lib/db";
import { getMembership } from "@/utils/facades/serverFacades/userFacade";
import { CastingInformationType } from "@prisma/client";

export const insertCastingInformation = async (name: string, type: CastingInformationType) => {
    const { profile } = await getMembership();

    return await prisma.castingInformations.create({
        data: {
            name,
            type,
            profileId: profile.id
        }
    });
}
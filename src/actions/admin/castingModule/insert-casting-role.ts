"use server"

import prisma from "@/lib/db";
import { getMembership } from "@/utils/facades/serverFacades/userFacade";


export const insertCastingRole = async (name: string) => {
    const { profile } = await getMembership();

    return await prisma.castingRoles.create({
        data: {
            name,
            profileId: profile.id
        }
    });
}
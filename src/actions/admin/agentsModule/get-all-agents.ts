"use server";

import prisma from "@/lib/db";
import { getMembership } from "@/utils/facades/serverFacades/userFacade";

export const getAllAgents = async () => {
    const { id, permissions } = await getMembership()

    console.log(permissions)

    return await prisma.user.findMany({
        where: {
            profilesMemberships: {
                every: {
                    profileId: id,
                    permissions: { none: { name: { not: { contains: "agency:admin" } } } }
                }
            }
        },
        orderBy: {
            createdAt: "desc",
        },
    });
};

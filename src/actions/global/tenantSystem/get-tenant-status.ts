"use server";
import prisma from "@/lib/db";

export const getTenantStatus = async (organizationId: number) => {
    const profile = await prisma.profile.findUnique({
        where: { id: organizationId },
        select: {
            status: true,
        },
    });

    return profile ? profile.status : null;
};

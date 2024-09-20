"use server";
import prisma from "@/lib/db";

export const getTenantStatus = async (profileId: number) => {
    const profile = await prisma.profile.findUnique({
        where: { id: profileId },
        select: {
            status: true,
        },
    });

    return profile ? profile.status : null;
};

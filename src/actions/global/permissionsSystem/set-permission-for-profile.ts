"use server"

import prisma from "@/lib/db";

export async function setPermissionForProfile(profileId: number, permissionName: string) {
    try {
        const permission = await prisma.permission.findFirst({ where: { name: permissionName } })
        
        await prisma.profile.update({
            where: { id: profileId },
            data: {
                permissions: {
                    connect: { id: permission.id },
                },
            },
        });
    } catch (error) {
        console.error("Error setting permission:", error);
        throw new Error("Could not set the permission for the profile.");
    }
}



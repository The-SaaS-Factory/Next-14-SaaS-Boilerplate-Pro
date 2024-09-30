"use server"

import prisma from "@/lib/db";

export async function removePermissionForProfile(organizationId: number, permissionName: string) {
    try {
        const permission = await prisma.permission.findFirst({ where: { name: permissionName } })
        await prisma.profile.update({
            where: { id: organizationId },
            data: {
                permissions: {
                    disconnect: { id: permission.id },
                },
            },
        });
    } catch (error) {
        console.error("Error setting permission:", error);
        throw new Error("Could not set the permission for the profile.");
    }
}



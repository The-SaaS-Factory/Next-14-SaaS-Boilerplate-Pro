"user server"

import prisma from "@/lib/db";

export async function getPermissionsForProfile(profileId: number, permission: string) {
    try {
        const _permission = await prisma.permission.findFirst({
            where: { profiles: { some: { id: profileId } }, name: permission },
        });

        if (_permission) return true

        return false
    } catch (error) {
        console.error("Error fetching permissions:", error);
        throw new Error("Could not fetch permissions for the profile.");
    }
}
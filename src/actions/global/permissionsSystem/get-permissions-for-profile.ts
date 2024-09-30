"use server";

import prisma from "@/lib/db";

export async function getPermissionsForProfile(organizationId: number) {
  try {
    const profile = await prisma.organization.findUnique({
      where: { id: organizationId },
      include: { permissions: true },
    });

    return profile ? profile.permissions : [];
  } catch (error) {
    console.error("Error fetching permissions:", error);
    throw new Error("Could not fetch permissions for the profile.");
  }
}

"use server";
import prisma from "@/lib/db";

export const getAgentSettings = async (profileMembershipId: number) => {

    try {
        const settings = await prisma.profileMembershipSetting.findMany({
            where: { profileMembershipId },
        });
        return settings;
    } catch (error) {
        console.error("Error fetching profile membership settings:", error);
        throw new Error("Failed to fetch profile membership settings.");
    }
};

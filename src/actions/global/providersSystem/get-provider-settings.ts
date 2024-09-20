"use server";

import prisma from "@/lib/db";

export const getProviderSettings = async (providerId: number) => {
    try {
        const settings = await prisma.providerSetting.findMany({
            where: { providerId },
        });
        return settings;
    } catch (error) {
        console.error('Error fetching provider settings:', error);
        return [];
    }
};

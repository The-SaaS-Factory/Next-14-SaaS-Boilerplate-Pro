"use server";

import prisma from "@/lib/db";

export const getProvidersByProvinces = async (provinceId: string) => {
    try {
        const providers = await prisma.provider.findMany({
            where: {
                OR: [
                    {
                        settings: {
                            some: {
                                settingName: 'province',
                            },
                        },
                    },
                    {
                        settings: {
                            none: {
                                settingName: 'province',
                            },
                        },
                    },
                ],
            },
            include: { settings: true }
        });

        return providers.filter(provider => {
            const provincesSetting = provider.settings.find(
                setting => setting.settingName === 'province'
            );

            if (!provincesSetting) return true;

            if (provincesSetting.settingValue === '[]') return true;

            try {
                const provinces = JSON.parse(provincesSetting.settingValue);
                return Array.isArray(provinces) && provinces.includes(provinceId);
            } catch {
                return false;
            }
        });
    } catch (error) {
        console.error('Error fetching providers:', error);
        return [];
    }
};

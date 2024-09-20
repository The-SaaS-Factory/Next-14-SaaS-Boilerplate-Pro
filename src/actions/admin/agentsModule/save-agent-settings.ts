"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";


export const saveAgentSettings = async (membershipId: number, settings: any) => {
    console.log(settings);

    try {
        await Promise.all(
            settings.map(async (setting: any) => {
                try {
                    const existingSetting = await prisma.profileMembershipSetting.findFirst({
                        where: {
                            settingName: setting.settingName,
                            profileMembershipId: membershipId,
                        },
                    });


                    if (existingSetting) {
                        await prisma.profileMembershipSetting.update({
                            where: { id: existingSetting.id },
                            data: {
                                settingValue:
                                    typeof setting.settingValue === "number"
                                        ? setting.settingValue.toString()
                                        : setting.settingValue,
                            },
                        });
                    } else {
                        await prisma.profileMembershipSetting.create({
                            data: {
                                profileMembershipId: membershipId,
                                settingName: setting.settingName,
                                settingValue:
                                    typeof setting.settingValue === "number"
                                        ? setting.settingValue.toString()
                                        : setting.settingValue,
                            },
                        });
                    }
                } catch (error) {
                    console.log(error);
                }
            })
        )
            .catch((err) => {
                console.log(err);
            });

        revalidatePath("/home/admin/agentes");

        return "ok";
    } catch (error) {
        console.log(error);

        return {
            errors: [error],
        };
    }
};



export const setAgentSetting = async (memberId: number, settingName: string, settingValue: string | number) => {
    try {
        const existingSetting = await prisma.profileMembershipSetting.findFirst({
            where: {
                settingName: settingName,
                profileMembershipId: memberId,
            },
        });

        if (existingSetting) {
            await prisma.profileMembershipSetting.update({
                where: { id: existingSetting.id },
                data: {
                    settingValue: typeof settingValue === "number" ? settingValue.toString() : settingValue,
                },
            });
        } else {
            await prisma.profileMembershipSetting.create({
                data: {
                    profileMembershipId: memberId,
                    settingName: settingName,
                    settingValue: typeof settingValue === "number" ? settingValue.toString() : settingValue,
                },
            });
        }

        revalidatePath("/home/admin/providers");

        return "ok";
    } catch (error) {
        console.log(error);

        return {
            errors: [error],
        };
    }
};


export const getAgentSettings = async (memberId: number) => {
    prisma.profileMembershipSetting.findMany({ where: { profileMembershipId: memberId } })

}
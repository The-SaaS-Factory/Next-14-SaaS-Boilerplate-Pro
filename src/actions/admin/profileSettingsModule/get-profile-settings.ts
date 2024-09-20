"use server";
import prisma from "@/lib/db";

export const getProfileSettings = async (profileId: number) => {
    return await prisma.profileSetting.findMany({ where: { userId: profileId } })
};

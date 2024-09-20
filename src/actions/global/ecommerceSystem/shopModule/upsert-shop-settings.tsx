"use server";

import prisma from "@/lib/db";
 import { getMembership} from "@/utils/facades/serverFacades/userFacade";

export const upsertShopSettings = async ({
  modelId,
  payload,
}: {
  modelId?: number;
  payload: any;
}) => {
  const { id } = await getMembership();

  try {
    await prisma.profileSetting.upsert({
      where: {
        id: modelId ? modelId : 0,
        userId: id,
      },
      update: {
        settingName: payload.name as string,
        settingValue: payload.value,
      },
      create: {
        settingName: payload.name as string,
        settingValue: payload.value,
        userId: id,
      },
    });
  } catch (error: any) {
    throw new Error(error.message);
  }
};

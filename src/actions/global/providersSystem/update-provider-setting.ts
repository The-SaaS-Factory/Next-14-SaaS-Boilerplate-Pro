"use server";
import prisma from "@/lib/db";

import { revalidatePath } from "next/cache";

export const upsertProviderSettings = async ({
  modelId,
  payload,
}: {
  modelId?: number;
  payload: { settingName: string; settingValue: string }[];
}) => {
  try {
    Promise.all(
      payload.map(async (setting) => {
        const model = await prisma.providerSetting.findFirst({
          where: {
            settingName: setting.settingName,
            providerId: modelId,
          },
        });

        await prisma.providerSetting.upsert({
          where: {
            id: model ? model.id : 0,
            settingName: setting.settingName,
          },
          update: {
            settingValue: setting.settingValue.toString().includes(",") ? JSON.stringify(setting.settingValue) : setting.settingValue.toString(),
          },
          create: {
            providerId: modelId,
            settingName: setting.settingName,
            settingValue: setting.settingValue.toString().includes(",") ? JSON.stringify(setting.settingValue) : setting.settingValue.toString(),
          },
        });
      })
    );

    revalidatePath("/admin/proveedores");
  } catch (error: any) {
    throw new Error(error.message);
  }
};

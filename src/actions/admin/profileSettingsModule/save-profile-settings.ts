"use server";

import prisma from "@/lib/db";
import { getMembership } from "@/utils/facades/serverFacades/userFacade";
import { revalidatePath } from "next/cache";

export const saveProfileSettings = async (settings: any) => {
  try {
    await Promise.all(
      settings.map(async (setting: any) => {
        try {
          const { organization } = await getMembership();
          const existingSetting = await prisma.organizationSetting.findFirst({
            where: {
              settingName: setting.settingName,
              organizationId: organization.id,
            },
          });

          if (existingSetting) {
            await prisma.organizationSetting.update({
              where: { id: existingSetting.id },
              data: {
                settingValue:
                  typeof setting.settingValue === "number"
                    ? setting.settingValue.toString()
                    : setting.settingValue,
              },
            });
          } else {
            await prisma.organizationSetting.create({
              data: {
                organizationId: organization.id,
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
    ).catch((err) => {
      console.log(err);
    });

    revalidatePath("/home/admin/settings");

    return "ok";
  } catch (error) {
    console.log(error);

    return {
      errors: [error],
    };
  }
};

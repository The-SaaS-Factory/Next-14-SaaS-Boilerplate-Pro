"use server";

import prisma from "@/lib/db";
import { getMembership } from "@/utils/facades/serverFacades/userFacade";
import { revalidatePath } from "next/cache";
export const saveProfileSettings = async (settings: any) => {
  console.log(settings);

  try {
    await Promise.all(
      settings.map(async (setting: any) => {
        try {
          const { profile } = await getMembership();
          const existingSetting = await prisma.profileSetting.findFirst({
            where: {
              settingName: setting.settingName,
              userId: profile.id,
            },
          });


          if (existingSetting) {
            await prisma.profileSetting.update({
              where: { id: existingSetting.id },
              data: {
                settingValue:
                  typeof setting.settingValue === "number"
                    ? setting.settingValue.toString()
                    : setting.settingValue,
              },
            });
          } else {
            await prisma.profileSetting.create({
              data: {
                userId: profile.id,
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

    revalidatePath("/home/admin/configuraciones");

    return "ok";
  } catch (error) {
    console.log(error);

    return {
      errors: [error],
    };
  }
};

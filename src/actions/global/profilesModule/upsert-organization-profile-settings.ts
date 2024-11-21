"use server";

import prisma from "@/lib/db";
import { getMembership } from "@/utils/facades/serverFacades/userFacade";
import { revalidatePath } from "next/cache";

export const updasetORganizationProfileSetting = async (payload) => {
  const { projectId, setting } = payload;

  console.log("projectId", projectId);
  console.log("setting", setting);

  const { organization } = await getMembership();
  try {
    const parseSettingValue = (value: string) => {
      if (value === "true") return true;
      if (value === "false") return false;

      if (typeof value === "string" && !isNaN(Number(value))) {
        return Number(value);
      }

      if (typeof value === "object" && value !== null) {
        return JSON.stringify(value);
      }

      return value;
    };

    const result = Promise.all(
      setting.map(async (field: any) => {
        const existingSetting = await prisma.profileSetting.findFirst({
          where: {
            settingName: field.settingName,
            profile: {
              organizationId: organization.id,
              id: projectId,
            },
          },
        });

        if (existingSetting) {
          await prisma.profileSetting.update({
            where: { id: existingSetting.id },
            data: {
              settingValue:
                typeof field.settingValue === "number"
                  ? field.settingValue.toString()
                  : parseSettingValue(field.settingValue),
            },
          });
        } else {
          await prisma.profileSetting.create({
            data: {
              profile: {
                connect: {
                  id: projectId,
                },
              },
              settingName: field.settingName,
              settingValue:
                typeof field.settingValue === "number"
                  ? field.settingValue.toString()
                  : parseSettingValue(field.settingValue),
            },
          });
        }
      }),
    );

    revalidatePath(`/home/admin/profiles/edit/${payload.projectId}/page`);
  } catch (error) {
    console.log(error);
  }
};

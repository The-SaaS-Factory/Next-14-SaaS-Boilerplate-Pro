"use server";

import prisma from "@/lib/db";
import { getMembership } from "@/utils/facades/serverFacades/userFacade";

export const updasetProjectSetting = async (
  projectId: number,
  setting: any,
) => {
  const { organization } = await getMembership();
  try {
    console.log(setting);
    console.log(typeof setting.settingValue);
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

    const existingSetting = await prisma.projectSetting.findFirst({
      where: {
        settingName: setting.settingName,
        project: {
          organizationId: organization.id,
          id: projectId,
        },
      },
    });

    if (existingSetting) {
      await prisma.projectSetting.update({
        where: { id: existingSetting.id },
        data: {
          settingValue:
            typeof setting.settingValue === "number"
              ? setting.settingValue.toString()
              : parseSettingValue(setting.settingValue),
        },
      });
    } else {
      await prisma.projectSetting.create({
        data: {
          project: {
            connect: {
              id: projectId,
            },
          },
          settingName: setting.settingName,
          settingValue:
            typeof setting.settingValue === "number"
              ? setting.settingValue.toString()
              : parseSettingValue(setting.settingValue),
        },
      });
    }
  } catch (error) {
    console.log(error);
  }
};

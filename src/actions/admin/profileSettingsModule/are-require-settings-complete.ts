"use server";

import prisma from "@/lib/db";

const requiredSettings = [
  "AGENCY_NAME",
  "AGENCY_CONTACT_NAME",
  "AGENCY_CONTACT_SURNAME",
  "AGENCY_CONTACT_PHONE",
  "AGENCY_CONTACT_MAIL",
];

export const areRequiredSettingsComplete = async (
  organizationId: number,
): Promise<boolean> => {
  try {
    const settings = await prisma.organizationSetting.findMany({
      where: { organizationId: organizationId },
    });

    const settingsMap = new Map(
      settings.map((setting) => [setting.settingName, setting.settingValue]),
    );

    const allRequiredComplete = requiredSettings.every((setting) => {
      const value = settingsMap.get(setting);
      return value !== undefined && value.trim() !== "";
    });

    return allRequiredComplete;
  } catch (error) {
    console.error("Error checking required settings:", error);
    throw new Error("Failed to check required settings");
  }
};

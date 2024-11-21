"use server";
import prisma from "@/lib/db";
import { getMembership } from "@/utils/facades/serverFacades/userFacade";
import { revalidatePath } from "next/cache";

interface Field {
  settingName: string;
  settingValue: string | number | boolean;
}

export const updateOrganizationProfileFields = async (payload) => {
  const { organization } = await getMembership();

  const results = await Promise.all(
    payload.setting.map(async (field: Field) => {
      await prisma.profile.update({
        where: {
          id: payload.projectId,
          organizationId: organization.id,
        },
        data: {
          [field.settingName]: field.settingValue,
        },
      });
    }),
  );

  revalidatePath(`/home/admin/profiles/edit/${payload.projectId}/page`);

  return results;
};

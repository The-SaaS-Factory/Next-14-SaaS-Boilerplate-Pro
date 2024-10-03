"use server";
import prisma from "@/lib/db";
import { getMembership } from "@/utils/facades/serverFacades/userFacade";

interface Field {
  name: string;
  value: string | number | boolean;
}

export const updateProfileFields = async (fields: Field[]) => {
  const { organization } = await getMembership();

  return await Promise.all(
    fields.map(async (field: Field) => {
      await prisma.organization.update({
        where: {
          id: organization.id,
        },
        data: {
          [field.name]: field.value,
        },
      });
    })
  );
};

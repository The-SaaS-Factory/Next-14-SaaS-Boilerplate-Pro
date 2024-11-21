"use server";

import prisma from "@/lib/db";
import { getSlug } from "@/utils/facades/serverFacades/globalFacade";
import { getMembership } from "@/utils/facades/serverFacades/userFacade";
import { ProfileType } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const createProfile = async (
  name: string,
  type: ProfileType,
) => {
  const { organization } = await getMembership();


  const slug = await getSlug(name,'profile');

  const profile = await prisma.profile.create({
    data: {
      name,
      type,
      slug,
      organization: {
        connect: {
          id: organization.id,
        },
      },
    },
  });

  revalidatePath("/home/admin/profiles");

  return profile;
};

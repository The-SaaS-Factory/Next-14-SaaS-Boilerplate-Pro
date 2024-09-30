"use server";
import prisma from "@/lib/db";
import { getMembership } from "@/utils/facades/serverFacades/userFacade";
import { revalidatePath } from "next/cache";

export const upsertEcommerceBanner = async ({
  modelId,
  payload,
}: {
  modelId?: number;
  payload: any;
}) => {
  const { id } = await getMembership();

  try {
    await prisma.banner.upsert({
      where: {
        id: modelId ? modelId : 0,
        organizationId: id,
      },
      update: {
        name: payload.name as string,
        status: payload.status,
        link: payload.link,
        image: payload.image,
      },
      create: {
        name: payload.name as string,
        status: payload.status,
        link: payload.link,
        organizationId: id,
        image: payload.image,
      },
    });

    revalidatePath("/home/banners");
  } catch (error: any) {
    throw new Error(error.message);
  }
};

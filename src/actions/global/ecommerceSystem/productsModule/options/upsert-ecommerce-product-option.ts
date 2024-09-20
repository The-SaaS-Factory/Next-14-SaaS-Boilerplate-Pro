"use server";
import prisma from "@/lib/db";
 import { getMembership} from "@/utils/facades/serverFacades/userFacade";
import { revalidatePath } from "next/cache";

export const upsertEcommerceProductOptions = async ({
  modelId,
  payload,
}: {
  modelId?: number;
  payload: any;
}) => {
  const { id } = await getMembership();

  try {
    await prisma.option.upsert({
      where: {
        id: modelId ? modelId : 0,
        profileId: id,
      },
      update: {
        name: payload.name as string,
        status: payload.status,
        position: payload.position,
      },
      create: {
        name: payload.name as string,
        status: payload.status,
        position: payload.position,
        profileId: id,
      },
    });

    revalidatePath("/home/products/options");
  } catch (error: any) {
    throw new Error(error.message);
  }
};

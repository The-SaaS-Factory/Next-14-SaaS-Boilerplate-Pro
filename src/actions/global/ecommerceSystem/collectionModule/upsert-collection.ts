"use server";
import prisma from "@/lib/db";
import { getMembership  } from "@/utils/facades/serverFacades/userFacade";
import { revalidatePath } from "next/cache";

export const upsertEcommerceCollection = async ({
  modelId,
  payload,
}: {
  modelId?: number;
  payload: any;
}) => {
  const { id } = await getMembership();

  try {
    await prisma.collection.upsert({
      where: {
        id: modelId ? modelId : 0,
        profileId: id,
      },
      update: {
        name: payload.name as string,
        status: payload.status,
        position: payload.position,
        products: {
          connect: payload.products.map((p) => {
            return {
              id: p.id,
            };
          }),
        },
      },
      create: {
        profileId: id,
        name: payload.name as string,
        status: payload.status,
        position: payload.position,
        products: {
          connect: payload.products.map((p) => {
            return {
              id: p.id,
            };
          }),
        },
      },
    });

    revalidatePath("/home/collections");
  } catch (error: any) {
    throw new Error(error.message);
  }
};

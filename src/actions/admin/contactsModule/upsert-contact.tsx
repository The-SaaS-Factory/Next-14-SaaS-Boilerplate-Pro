"use server";
import prisma from "@/lib/db";
import { getMembership } from "@/utils/facades/serverFacades/userFacade";
import { revalidatePath } from "next/cache";

export const upsertContact = async ({
  modelId,
  payload,
}: {
  modelId?: number;
  payload: any;
}) => {
  const { id } = await getMembership();

  try {
    await prisma.contacts.upsert({
      where: {
        id: modelId ? modelId : 0,
      },
      update: {
        profile: {
          connect: {
            id: id,
          },
        },
        country: "Cuba",
        ...payload,
      },
      create: {
        profile: {
          connect: {
            id: id,
          },
        },
        country: "Cuba",
        ...payload,
      },
    });

    revalidatePath("/home/contacts");
    revalidatePath("/checkout");
  } catch (error: any) {
    throw new Error(error.message);
  }
};

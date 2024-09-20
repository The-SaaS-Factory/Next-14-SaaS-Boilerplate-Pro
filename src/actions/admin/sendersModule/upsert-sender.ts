"use server";
import prisma from "@/lib/db";
import { getMembership } from "@/utils/facades/serverFacades/userFacade";
import { revalidatePath } from "next/cache";

export const upsertSender = async ({
  modelId,
  payload,
}: {
  modelId?: number;
  payload: any;
}) => {
  const { id } = await getMembership();

  try {
    // prisma.sender.create({data:{profileId}})
    const sender = await prisma.sender.upsert({
      where: {
        id: modelId ? modelId : 0,
      },
      update: {
        ...payload,
      },
      create: {
        ...payload,
        User: {
          connect: {
            id: id,
          },
        },
      },
    });

    revalidatePath("/home/admin/senders");
    return sender;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

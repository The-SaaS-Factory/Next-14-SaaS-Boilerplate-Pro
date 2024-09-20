"use server";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export const upsertRecipient = async (id: number, {
    modelId,
    payload,
}: {
    modelId?: number;
    payload: any;
}) => {

    console.log(id)
    try {
        const sender = await prisma.recipient.upsert({
            where: {
                id: modelId ? modelId : 0,
            },
            update: {
                ...payload,
            },
            create: {
                ...payload,
                Sender: {
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

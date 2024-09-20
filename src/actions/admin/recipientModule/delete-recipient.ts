"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/db";

export const deleteRecipient = async (modelId: number) => {
    try {
        await prisma.recipient.delete({
            where: {
                id: modelId,
            },
        });

        revalidatePath("/home/admin/senders");
    } catch (error: any) {
        throw new Error(error.message);
    }
};

"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/db";

export const deleteSender = async (modelId: number) => {
    try {
        await prisma.sender.delete({
            where: {
                id: modelId,
            },
        });

        revalidatePath("/home/admin/senders");
    } catch (error: any) {
        throw new Error(error.message);
    }
};

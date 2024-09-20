"use server";


import prisma from "@/lib/db";
import { getMembership } from "@/utils/facades/serverFacades/userFacade";

export const getSenders = async ({
    args,
}: {
    args: {
        search: Record<string, any>; // Asegúrate de que args.search pueda contener cualquier tipo de datos
        limit: number;
        offset: number;
    };
}) => {
    let whereSearch = {};
    const limit = args.limit;

    if (!args.search || Object.keys(args.search).length === 0) {
        args.search = {};
    }
    //delete page from searchParams
    const searchParams = { ...args.search };
    delete searchParams.page;

    // Itera sobre el objeto y crea la cláusula where
    for (const [key, value] of Object.entries(searchParams)) {
        if (value !== "") {
            if (typeof value === "string") {
                if (key === "firstName" || key === "email") {
                    whereSearch = {
                        ...whereSearch,
                        [key]: {
                            contains: value,
                        },
                    };
                } else if (key === "phone") {
                    whereSearch = {
                        ...whereSearch,
                        [key]: {
                            startsWith: value,
                        },
                    };
                } else {
                    if (value.includes(",")) {
                        whereSearch = {
                            ...whereSearch,
                            [key]: {
                                in: value.split(","),
                            },
                        };
                    } else {
                        whereSearch = {
                            ...whereSearch,
                            [key]: value,
                        };
                    }
                }
            }
        }
    }



    const { id } = await getMembership()

    const data = await prisma.sender.findMany({
        where: {
            userId: id,
            ...whereSearch,
        },


        take: limit,
        skip: args.offset,
    });

    const totalCount = await prisma.sender.count({
        where: {
            userId: id,
            ...whereSearch,
        },
    });

    const totalPages = Math.ceil(totalCount / limit);

    return { data, totalCount, totalPages };
};

export const getSendersByUserId = async (userId: number) => {
    return await prisma.sender.findMany({ where: { userId } })
}

export const getAllSenders = async () => {
    return await prisma.sender.findMany()
}
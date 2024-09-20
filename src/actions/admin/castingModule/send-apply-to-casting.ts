"use server";

import { getMembership } from "@/utils/facades/serverFacades/userFacade";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export const sendApplyToCasting = async ({
  modelId,
  payload,
}: {
  modelId?: number;
  payload: any;
}) => {

  const { profile } = await getMembership();
  const informations = await Promise.all(
    Object.keys(payload)
      .filter((i) => parseInt(i))
      .map(async (key) => {
        const information = await prisma.castingInformations.findUnique({
          where: {
            id: Number(key),
          },
        });

        return {
          name: information?.name ?? "",
          type: information?.type ?? "TEXT",
          value: payload[key].toString(),
        };
      })
  );

  await prisma.castingAplication.create({
    data: {
      profile: {
        connect: {
          id: profile.id,
        },
      },
      casting: {
        connect: {
          id: modelId,
        },
      },
      role: {
        connect: {
          id: payload.roleId,
        },
      },
      informations: {
        createMany: {
          data: informations,
        },
      },
    },
    include: {
      informations: true,
    },
  });

  revalidatePath("/home/applications/pendings");
  revalidatePath("/castings/");

  //redirect("/home/applications/pendings");
};

"use server";

import prisma from "@/lib/db";
import { getMembership } from "@/utils/facades/serverFacades/userFacade";
import { revalidatePath } from "next/cache";
import { logAction } from "../activitiesModule/log-action";
import { getChanges } from "../activitiesModule/get-changes";

export const upsertCasting = async ({
  modelId,
  payload,
}: {
  modelId?: number;
  payload: any;
}) => {
  const { profile } = await getMembership();
  let changes = {};

  if (modelId) {
    // Fetch existing casting data
    const existingCasting = await prisma.casting.findUnique({
      where: { id: modelId },
      include: {
        categories: true,
        roles: true,
        informations: true,
      },
    });

    // Comparar el payload con los datos actuales para ver qué cambió
    changes = getChanges(existingCasting, payload);

    // Eliminar campos innecesarios del payload
    ["id", "createdAt", "updatedAt", "profileId", "userId", "profile"].forEach(
      (key) => delete payload[key]
    );

    // Desconectar relaciones antiguas
    await prisma.casting.update({
      where: { id: modelId },
      data: {
        categories: { disconnect: await prisma.castingCategory.findMany({ select: { id: true } }) },
        roles: { disconnect: await prisma.castingRoles.findMany({ select: { id: true } }) },
        informations: { disconnect: await prisma.castingInformations.findMany({ select: { id: true } }) },
      },
    });
  }

  // Conectar relaciones nuevas en payload
  if (payload.categories) {
    payload.categories = { connect: payload.categories.map((id: any) => ({ id: Number(id) })) };
  }
  if (payload.roles) {
    payload.roles = { connect: payload.roles.map((role: any) => ({ id: role.id })) };
  }
  if (payload.informations) {
    payload.informations = { connect: payload.informations.map((info: any) => ({ id: info.id })) };
  }

  // Convertir fechas a ISO
  ["dateEvent", "dateLimitApplicants"].forEach((key) => {
    if (payload[key]) payload[key] = new Date(payload[key]).toISOString();
  });

  try {
    const upsertedCasting = await prisma.casting.upsert({
      where: { id: modelId || 0 },
      update: { ...payload },
      create: { ...payload, profileId: profile.id },
    });

    // Log de la acción de creación o actualización
    await logAction({
      userId: profile.id,
      castingId: upsertedCasting.id,
      action: modelId ? "UPDATE" : "CREATE",
      changes: modelId ? changes : { new: payload },
    });

    revalidatePath(`/home/castings`);
    return true;
  } catch (error) {
    throw new Error(String(error));
  }
};

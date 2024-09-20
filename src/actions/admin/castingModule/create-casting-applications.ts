"use server";
import prisma from "@/lib/db";
import { getMembership } from "@/utils/facades/serverFacades/userFacade";
import { Casting } from "@prisma/client";

export const createCastingApplication = async (casting: Casting) => {
  const { id } = await getMembership();

  const application = await prisma.castingAplication.create({
    data: {
      profileId: id,
      castingId: casting.id,
    },
  });

  //const newInformations = Informations.map((item) => { applicationId: application.id, value: Object.})
  const newInformations: any = [];

  prisma.castingAplication.update({
    where: { id: application.id },
    data: {
      informations: { createMany: { data: newInformations } },
    },
  });
};

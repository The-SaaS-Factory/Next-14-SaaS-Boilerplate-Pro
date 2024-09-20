"use server";
import prisma from "@/lib/db";
import { sendLoopsTransactionalEventToUser } from "@/utils/facades/serverFacades/loopsEmailMarketingFacade";
import { notifyToSuperAdmin } from "@/utils/facades/serverFacades/notificationFacade";
import { ProfileStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
const AGENCY_UPDATE_STATUS = process.env.AGENCY_UPDATE_STATUS;

export const updateTenantStatus = async ({
  modelId,
  status,
}: {
  modelId: number;
  status: ProfileStatus;
}) => {
  const profile = await prisma.profile.update({
    where: {
      id: modelId,
    },
    data: {
      status,
    },
  });

  sendLoopsTransactionalEventToUser({
    email: profile.email,
    transactionalId: AGENCY_UPDATE_STATUS,
    dataVariables: {
      agencyName: profile.name,
      status: status,
    },
  });

  notifyToSuperAdmin("Una agencia ha sido aprobada" + profile.id);
  revalidatePath("admin/agencias");

  return profile;
};

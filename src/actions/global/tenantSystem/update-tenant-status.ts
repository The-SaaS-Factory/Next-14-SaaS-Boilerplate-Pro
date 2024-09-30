"use server";
import prisma from "@/lib/db";
import { sendLoopsTransactionalEventToUser } from "@/utils/facades/serverFacades/loopsEmailMarketingFacade";
import { notifyToSuperAdmin } from "@/utils/facades/serverFacades/notificationFacade";
import { OrganizationStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

const AGENCY_UPDATE_STATUS = process.env.AGENCY_UPDATE_STATUS;

export const updateTenantStatus = async ({
  modelId,
  status,
}: {
  modelId: number;
  status: OrganizationStatus;
}) => {
  const profile = await prisma.organization.update({
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

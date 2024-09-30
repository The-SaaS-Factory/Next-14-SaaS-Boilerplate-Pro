"use server";

import { sendLoopsTransactionalEventToUser } from "@/utils/facades/serverFacades/loopsEmailMarketingFacade";
import prisma from "@/lib/db";
import { getMembership } from "@/utils/facades/serverFacades/userFacade";
import { hash } from "bcrypt";
import { constants } from "@/lib/constants";
const sendInvitationEmailId = process.env.AGENCY_SEND_INVITE_ID;

export interface PayloadIntiteMember {
  email: string;
  name: string;
  password: string;
}

export const tenantSendInvitation = async (payload: PayloadIntiteMember) => {
  const { organization } = await getMembership();

  let user;
  user = await prisma.user.findFirst({
    where: {
      email: payload.email,
    },
  });

  if (!user) {
    const hashedPassword = await hash(payload.password, 10);
    user = await prisma.user.create({
      data: {
        email: payload.email,
        name: payload.name,
        password: hashedPassword,
        userMemberships: {
          create: {
            organization: {
              connect: {
                id: organization.id,
              },
            },
          },
        },
      },
    });

    sendLoopsTransactionalEventToUser({
      email: user.email,
      transactionalId: sendInvitationEmailId,
      dataVariables: {
        userName: user.name,
        agencyName: organization.name,
        url: constants.appUrl,
        email: user.email,
        password: payload.password,
      },
    });
  } else {
    const haveMembership = await prisma.userMembership.findFirst({
      where: {
        organizationId: organization.id,
        userId: user.id,
      },
    });

    if (haveMembership) {
      throw Error("Este usuario ya es miembro de la agencia");
    }

    await prisma.userMembership.create({
      data: {
        organizationId: organization.id,
        userId: user.id,
      },
    });

    sendLoopsTransactionalEventToUser({
      email: user.email,
      transactionalId: sendInvitationEmailId,
      dataVariables: {
        userName: user.name,
        agencyName: organization.name,
        url: constants.appUrl,
        email: user.email,
        password: payload.password,
      },
    });
  }
};

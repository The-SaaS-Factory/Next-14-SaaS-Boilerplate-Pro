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
  const { profile } = await getMembership();

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
        profilesMemberships: {
          create: {
            profile: {
              connect: {
                id: profile.id,
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
        agencyName: profile.name,
        url: constants.appUrl,
        email: user.email,
        password: payload.password,
      },
    });
  } else {
    const haveMembership = await prisma.profileMembership.findFirst({
      where: {
        profileId: profile.id,
        userId: user.id,
      },
    });

    if (haveMembership) {
      throw Error("Este usuario ya es miembro de la agencia");
    }

    await prisma.profileMembership.create({
      data: {
        profileId: profile.id,
        userId: user.id,
      },
    });

    sendLoopsTransactionalEventToUser({
      email: user.email,
      transactionalId: sendInvitationEmailId,
      dataVariables: {
        userName: user.name,
        agencyName: profile.name,
        url: constants.appUrl,
        email: user.email,
        password: payload.password,
      },
    });
  }
};

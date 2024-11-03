"use server";

import { sendLoopsTransactionalEventToUser } from "@/utils/facades/serverFacades/loopsEmailMarketingFacade";
import prisma from "@/lib/db";
import { getMembership } from "@/utils/facades/serverFacades/userFacade";
import { hash } from "bcrypt";
import { constants } from "@/lib/constants";
import { UserMembershipRole } from "@prisma/client";
import {
  checkCapabilityLimit,
  registerCapabilityUsage,
} from "@/utils/facades/serverFacades/membershipFacade";
const sendInvitationEmailId = process.env.AGENCY_SEND_INVITE_ID;

export interface PayloadInviteMember {
  email: string;
  name: string;
  password: string;
  role: UserMembershipRole;
}

export const tenantSendInvitation = async (payload: PayloadInviteMember) => {
  const { organization } = await getMembership();

  const canAddMember = await checkCapabilityLimit(
    organization.id,
    "members in the organization",
  );

  if (!canAddMember) {
    throw new Error("You can't add more members, upgrade your subscription ");
  }

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
            role: payload.role,
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
      throw Error(
        `This user is already is ${constants.tanantModelName} member `,
      );
    }

    await prisma.userMembership.create({
      data: {
        organizationId: organization.id,
        userId: user.id,
        role: payload.role,
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

  registerCapabilityUsage(organization.id, "members in the organization");
};

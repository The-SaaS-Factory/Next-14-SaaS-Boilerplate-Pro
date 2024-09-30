"use server";

import { Provider, Recipient, RemittanceType, Sender } from "@prisma/client";
import prisma from "@/lib/db";
import { getMembership } from "@/utils/facades/serverFacades/userFacade";
import { notifyToSuperAdmin } from "@/utils/facades/serverFacades/notificationFacade";
import { redirect } from "next/navigation";

export interface RemittencePayload {
  remittanceType: RemittanceType;
  sender: Sender | null;
  recipient: Recipient | null;
  provider: Provider | null;
  fees: {
    providerFee: number;
    superAdminFee: number;
    agencyFee: number;
  };
  currency: "USD" | "CUP" | "MLC";
  amount: number;
  paymentMethods: {
    name: "Cash" | "Checks" | "Zelle" | "Transferencia";
    amount: number;
    description: string;
  }[];
  generalDescription: string;
  calculatedValues: {
    destinationAmount: number;
    amountToCharge: number;
    amountToPay: number;
  };
}

export const createRemittence = async (payload: any) => {
  console.log(payload);

  try {
    const { id, profile } = await getMembership();

    await prisma.remittance.create({
      data: {
        remittanceType: payload.remittanceType,
        profile: {
          connect: {
            id: profile.id,
          },
        },
        userMembership: {
          connect: {
            id: id,
          },
        },
        sender: {
          connect: {
            id: payload.sender.id,
          },
        },
        recipient: {
          connect: {
            id: payload.recipient.id,
          },
        },
        provider: {
          connect: {
            id: payload.provider.id,
          },
        },
        currency: payload.currency,
        providerFee: payload.fees.providerFee,
        superAdminFee: payload.fees.superAdminFee,
        agencyFee: payload.fees.agencyFee,
        paymentMethods: JSON.stringify(payload.paymentMethods),
        generalDescription: payload.generalDescription,
        amount: payload.amount,
        destinationAmount: payload.calculatedValues.destinationAmount,
        amountToCharge: payload.calculatedValues.amountToCharge,
        amountToPay: payload.calculatedValues.amountToPay,
      },
    });

    notifyToSuperAdmin("Nueva remesa creada por la agencia " + profile.name);
    redirect("/home/remesas");
  } catch (error) {
    console.error(error);
    throw new Error("Error al enviar la remesa");
  }
};

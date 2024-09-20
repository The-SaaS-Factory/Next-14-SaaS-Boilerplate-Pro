"use server";
import prisma from "@/lib/db";
 import { getMembership} from "@/utils/facades/serverFacades/userFacade";
import { revalidatePath } from "next/cache";

export const upsertShippingZone = async ({
  modelId,
  payload,
}: {
  modelId?: number;
  payload: any;
}) => {
  const { id } = await getMembership();

  console.log(payload.type);

  //Validate
  if (payload.city && payload.state && payload.country) {
    const alreadyZone = await prisma.profileShippingZone.findFirst({
      where: {
        profileId: id,
        city: payload.city,
        type: payload.type,
      },
    });

    if (alreadyZone && alreadyZone.id !== modelId) {
      throw new Error("Ya tienes esta zona agregada con este mismo método.");
    }
  }

  //Validate
  if (payload.state && payload.country && !payload.city) {
    const alreadyZone = await prisma.profileShippingZone.findFirst({
      where: {
        profileId: id,
        state: payload.state,
        city: null,
        type: payload.type,
      },
    });

    if (alreadyZone && alreadyZone.id !== modelId) {
      throw new Error("Ya tienes esta zona agregada con este mismo método..");
    }
  }

  if (payload.country && !payload.state && !payload.city) {
    const alreadyZone = await prisma.profileShippingZone.findFirst({
      where: {
        profileId: id,
        country: payload.country,
        state: null,
        city: null,
        type: payload.type,
      },
    });

    if (alreadyZone && alreadyZone.id !== modelId) {
      throw new Error("Ya tienes esta zona agregada con este mismo método...");
    }
  }

  try {
    await prisma.profileShippingZone.upsert({
      where: {
        id: modelId ? modelId : 0,
        profileId: id,
      },
      update: {
        status: payload.status,
        country: payload.country,
        state: payload.state,
        type: payload.type,
        priceByLb: payload.priceByLb === "true" ? true : false,
        currencyId: payload.currencyId,
        price: payload.price,
        city: payload.city,
      },
      create: {
        profileId: id,
        status: payload.status,
        country: payload.country,
        type: payload.type,
        price: payload.price,
        priceByLb: payload.priceByLb === "true" ? true : false,
        state: payload.state,
        currencyId: payload.currencyId,
        city: payload.city,
      },
    });

    revalidatePath("/home/shipping/zones");
  } catch (error: any) {
    throw new Error(error.message);
  }
};

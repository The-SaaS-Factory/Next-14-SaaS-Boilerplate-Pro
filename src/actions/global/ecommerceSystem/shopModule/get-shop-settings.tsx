"use server";
import prisma from "@/lib/db";

 import { getMembership} from "@/utils/facades/serverFacades/userFacade";

export const getShopSettings = async () => {
  const { id } = await getMembership();
  try {
    const shopSettings = await prisma.organizationSetting.findMany({
      where: {
        userId: id,
      },
    });
    return shopSettings;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

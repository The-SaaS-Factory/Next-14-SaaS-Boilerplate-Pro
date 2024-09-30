"use server";
import { constants } from "@/lib/constants";
import prisma from "@/lib/db";
import { slugify } from "@/utils/facades/serverFacades/strFacade";
import { capitalizarPalabras } from "@/utils/facades/serverFacades/stripeFacade";
 import { getMembership} from "@/utils/facades/serverFacades/userFacade";
import { PrismaClient, ProductCategory, Status } from "@prisma/client";
import { revalidatePath } from "next/cache";

export type IProductUpsert = {
  name: string;
  slug?: string;
  paymentPorcent?: number;
  sku?: string;
  costPrice?: number;
  earningPorcent?: number;
  currencyId: number;
  categories: ProductCategory[];
  regularPrice: number;
  salesPrice: number;
  status: Status;
  earningsPorcent?: number;
  weight?: number;
  tax?: number;
  medias?: string;
  weightUnit?: string;
  stock?: number;
  description?: string;
  image?: string;
  variations?: any;
};
export const upsertProduct = async ({
  modelId,
  payload,
}: {
  modelId?: number;
  payload: IProductUpsert;
}) => {
  const { id } = await getMembership();

  let image = null;
  if (typeof payload.medias === "string") {
    image = JSON.parse(payload.medias)[0] ?? ("" as string);
  }

  try {
    const slug = await getSlug(prisma, payload.name, id);
    
    console.log(payload);
    
    const product = await prisma.product.upsert({
      where: {
        id: modelId ? modelId : 0,
      },
      update: {
        name: capitalizarPalabras(payload.name as string),
        sku: payload.sku,
        slug: slug,
        profile: {
          connect: {
            id: id,
          },
        },
        currency: {
          connect: {
            id: payload.currencyId as number,
          },
        },
        regularPrice: payload.regularPrice,
        costPrice: payload.costPrice,
        salesPrice: payload.salesPrice,
        earningPorcent: payload.earningPorcent as number,
        categories: {
          connect: payload.categories.map((cat) => cat),
        },
        status: payload.status,
        paymentPorcent: payload.paymentPorcent as number,
        earningsPorcent: payload.earningPorcent as number,
        weight: payload.weight as number,
        medias: payload.medias as string,
        weightUnit: payload.weightUnit as string,
        tax: payload.tax as number,
        stock: payload.stock as number,
        description: payload.description as string,
        image,
      },
      create: {
        name: capitalizarPalabras(payload.name as string),
        sku: payload.sku,
        slug: slug,
        profile: {
          connect: {
            id: id,
          },
        },
        currency: {
          connect: {
            id: payload.currencyId as number,
          },
        },
        regularPrice: payload.regularPrice,
        salesPrice: payload.salesPrice,
        earningPorcent: payload.earningsPorcent as number,
        costPrice: payload.costPrice,
        paymentPorcent: payload.paymentPorcent as number,
        categories: {
          connect: payload.categories.map((cat) => cat),
        },
        tax: payload.tax as number,
        status: payload.status,
        earningsPorcent: payload.earningsPorcent as number,
        weight: payload.weight as number,
        medias: payload.medias as string,
        weightUnit: payload.weightUnit as string,
        stock: payload.stock as number,
        description: payload.description as string,
        image,
      },
    });

    // if (!modelId) {
    //   await makeVariations(tx, payload.variations, product.id);
    // } else {
    //   await updateVariations(tx, payload.variations, product.id);
    // }

    revalidatePath("/home/products");
    revalidatePath("/home/products/edit/" + product.id);
    return product;
  } catch (error: any) {
    console.log(error);

    throw new Error(error.message);
  }
};

const getSlug = async (tx: PrismaClient, name: string, id: number) => {
  let slug = constants.appNameAbb + "-" + id + "-" + slugify(name);

  while (
    await tx.product.findFirst({
      where: {
        slug: slug,
        organizationId: {
          not: id,
        },
      },
    })
  ) {
    slug = slug + "-" + Math.random();
  }

  return slug;
};

// const makeVariations = async (
//   tx: PrismaClient,
//   variations: ProductVariation[],
//   productId: number
// ) => {
//   await tx.productVariation.createMany({
//     data: variations.map((v) => ({ ...v, productId })),
//   });
// };
// const updateVariations = async (
//   tx: PrismaClient,
//   variations: ProductVariation[],
//   productId: number
// ) => {
//   await tx.productVariation.updateMany({
//     where: {
//       productId: productId,
//     },
//     data: variations.map((v) => ({ ...v, productId })),
//   });
// };

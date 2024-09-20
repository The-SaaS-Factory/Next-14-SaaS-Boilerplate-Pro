"use server";
import prisma from "@/lib/db";
import { slugify } from "@/utils/facades/serverFacades/strFacade";
 import { getMembership} from "@/utils/facades/serverFacades/userFacade";
import { revalidatePath } from "next/cache";
export const upsertProductCategory = async ({
  modelId,
  payload,
}: {
  modelId?: number;
  payload: any;
}) => {
  const { id } = await getMembership();

  const slug = slugify(payload.name as string);

  const categoryExists = await prisma.productCategory.findMany({
    where: {
      slug: slug,
    },
  });

  const categoriesWithoutId = categoryExists.filter(
    (category) => category.id !== modelId
  );

  if (categoriesWithoutId.length > 0) {
    throw new Error("La categoría ya existe");
  }

  try {
    await prisma.productCategory.upsert({
      where: {
        id: modelId ? modelId : 0,
        profileId: id,
      },
      update: {
        name: payload.name as string,
        description: payload.description as string,
        slug: slug,
        categoryId: payload.categoryId,
      },
      create: {
        slug: slug,
        name: payload.name as string,
        description: payload.description as string,
        profileId: id,
        categoryId: payload.categoryId,
      },
    });

    revalidatePath("/home/products/categories");
  } catch (error: any) {
    throw new Error(error.message);
  }
};

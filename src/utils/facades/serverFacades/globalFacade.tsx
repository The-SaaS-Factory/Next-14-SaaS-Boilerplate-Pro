"use server";
import prisma from "@/lib/db";
import { slugify } from "../frontendFacades/strFacade";

export const getSlug = async (name: string, model: string) => {
  const slug = slugify(name);
  //Get the last slug for this model, if exists, increment the number
  const lastSlug = await prisma[model].findFirst({
    where: {
      slug: {
        startsWith: slug,
      },
    },
    orderBy: {
      id: "desc",
    },
  });

  if (lastSlug) {
    const lastSlugNumber = parseInt(lastSlug.slug.split("-").pop());
    return `${slug}-${lastSlugNumber + 1}`;
  } else {
    return slug;
  }
};

"use server";
//import prisma from "@/lib/db";

export const getModelCategories = async () => {
  const categories =  [];
  // const categories = await prisma.userCategory.findMany({
  //   where: {
  //     type: "MODEL",
  //   },
  //   include: {
  //     _count: {
  //       select: { users: true },
  //     },
  //   },
  // });

 

  return categories;
};

"use server";
import { hash } from "bcrypt";
import prisma from "@/lib/db";
import { createOrganization } from "@/utils/facades/serverFacades/organizationFacade";
export const registerNewUser = async (payload) => {
  const { password, email } = payload;

  const existedUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existedUser) throw Error("User already existed");

  const hashedPassword = await hash(password, 10);

  delete payload.password;
  const businessName = payload.businessName;

  const user = await prisma.user.create({
    data: {
      password: hashedPassword,
      name: payload.name,
      email: payload.email,
    },
  });

  const newpRofile = {
    ...user,
    profileName: payload.name,
    address: payload.businessAddress,
    phone: payload.businessPhone,
  };

  if (businessName) {
    //Assign permission of agency to the user
    await createOrganization(newpRofile);
  }

  return user;
};

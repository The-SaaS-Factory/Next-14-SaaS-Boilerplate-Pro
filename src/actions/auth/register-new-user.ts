"use server";
import { hash } from "bcrypt";
import prisma from "@/lib/db";
import { createProfile } from "@/utils/facades/serverFacades/profileFacade";
export const registerNewUser = async (payload) => {
  const { password, email } = payload;

  const existedUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existedUser)
    throw Error("Já existe um usuário cadastrado com esses dados");

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
    profileName: businessName,
    address: payload.businessAddress,
    phone: payload.businessPhone,
    type: payload.profileType,
  };

  if (businessName) {
    //Assign permission of agency to the user
    await createProfile(newpRofile);
  }

  return user;
};

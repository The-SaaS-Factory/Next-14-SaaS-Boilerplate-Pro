"use server";
import { hash } from "bcrypt";
import prisma from "@/lib/db";
import { createOrganization } from "@/utils/facades/serverFacades/organizationFacade";
export const registerNewUser = async (payload) => {
  const { password, email, businessName, avatar } = payload;

  const existedUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existedUser) throw Error("User already existed");
  let hashedPassword;
  if (password) {
    hashedPassword = await hash(password, 10);
  }

  delete payload.password;

  const user = await prisma.user.create({
    data: {
      password: hashedPassword,
      name: payload.name,
      email: payload.email,
      avatar: payload.image ?? avatar,
      provider: payload.provider ?? "credentials",
      providerId: payload.providerId,
    },
  });

  const newOrganizationPayload = {
    ...user,
    profileName: businessName ?? payload.name,
    address: payload.businessAddress,
    phone: payload.businessPhone,
  };

  if (businessName) {
    //Assign permission of agency to the user
    await createOrganization(newOrganizationPayload);
  }

  return user;
};

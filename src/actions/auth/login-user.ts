"use server";
import prisma from "@/lib/db";
import { compare } from "bcrypt";
export async function authenticate(email: string, password: string) {
  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  const result = await compare(password, user.password);

  const userParsed = {
    ...user,
    id: user.id.toString(),
  };

  if (result) {
    return userParsed;
  }

  return null;
}

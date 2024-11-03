"use server";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { compare } from "bcrypt";
import { hash } from "bcrypt";

export const updateProfilePassword = async (
  oldPassword,
  newPassword,
  confirmPassword,
) => {
  const session = await getServerSession();

  const user = await prisma.user.findFirst({
    where: {
      email: session.user.email,
    },
  });

  if (!user) {
    throw new Error("Error al autentificar al usuario actual");
  }

  console.log(newPassword, confirmPassword);

  if (newPassword !== confirmPassword) {
    throw new Error("Las contraseñas no coinciden");
  }

  const result = await compare(oldPassword, user.password);

  if (result) {
    const hashedPassword = await hash(newPassword, 10);

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: hashedPassword,
      },
    });

    return "ok";
  }

  throw new Error("Contraseña actual incorrecta");
};

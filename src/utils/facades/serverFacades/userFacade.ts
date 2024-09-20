"use server";

import { authOptions } from "@/actions/nextauth";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const getMembership = async () => {
  const session: any = await getServerSession(authOptions);

  const include = {
    permissions: true,
    profile: {
      include: {
        Amounts: {
          include: {
            Currency: true,
          },
        },
        permissions: true,
      },
    },
    user: true,
  };

  if (!session) redirect("/login");

  //fix typing
  let membership: any = await prisma.profileMembership.findFirst({
    where: {
      user: {
        id: Number(session?.user.id),
      },
      isActive: true,
    },
    include: {
      ...include,
    },
  });

  if (!membership) {
    //Get other profile
    membership = await prisma.profileMembership.findFirst({
      where: {
        user: {
          id: Number(session?.user.id),
        },
      },
      include,
    });
  }

  if (!membership) {
    const user = await prisma.user.findFirst({
      where: {
        id: Number(session.user?.id),
      },
      include: {
        permissions: true,
      },
    });

    console.log("user fdsfd");
    console.log(user);

    if (
      user &&
      user.permissions.some((permission: any) =>
        permission.name.includes("superAdmin")
      )
    ) {
      redirect("/admin");
    } else {
      redirect("/user");
    }

    if (!user) redirect("/login");
  }

  const permissions = membership?.permissions.map(
    (permission: any) => permission.name
  );

  const profile = await prisma.profile.findUnique({ where: { id: Number(session?.user.id) } })

  const authData = {
    id: membership.id,
    permissions, //Deprecated
    profileMembership: {
      id: membership.id,
      type: membership.type,
      name: membership.user.name,
      settings: membership.settings,
      Amounts: membership.Amounts,
      permissions: permissions,
    },
    user: {
      id: membership.user.id,
      email: membership.user.email,
    },
    profile: {
      id: membership.profile.id,
      name: membership.profile.name,
      avatar: membership.profile.avatar,
      type: profile.type,
      status: membership.profile.status,
      Amounts: membership.profile.Amounts,
      permissions: membership.profile.permissions.map(
        (permission: any) => permission.name
      ),
    },
  };

  return authData;
};

export const getUser = async () => {
  const session: any = await getServerSession(authOptions);
  console.log(session);

  if (!session) redirect("/login");

  const user = await prisma.user.findFirst({
    where: {
      id: Number(session.user?.id),
    },
    include: {
      permissions: true,
    },
  });

  if (!user) redirect("/login");

  const permissions = user?.permissions.map(
    (permission: any) => permission.name
  );

  return {
    id: user.id,
    email: user.email,
    permissions,
  };
};

import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET(request: Request) {
  // Validate secret params with nextAuthSecret
  const url = new URL(request.url);
  const secret = url.searchParams.get("secret");
  const email = url.searchParams.get("email");

  if (secret !== process.env.NEXTAUTH_SECRET) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  if (!email) {
    return new NextResponse("Email parameter is required", { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    const permissions = await prisma.permission.findMany({});

    const adminPermissions = permissions.filter((permission) =>
      permission.name.includes("superAdmin")
    );

    const userMemberships = await prisma.userMembership.findMany({
      where: { userId: user.id },
    });

    userMemberships.forEach(async (membership) => {
      await prisma.userMembership.update({
        where: {
          id: membership.id,
        },
        data: {
          permissions: {
            connect: adminPermissions.map((permission) => ({
              id: permission.id,
            })),
          },
        },
      });
    });

    if (userMemberships.length === 0) {
      //Find the main profile
      const mainProfile = await prisma.organization.findFirst({
        where: {
          isMainTenant: true,
        },
      });

      if (!mainProfile) {
        return new NextResponse("Main profile not found", { status: 404 });
      }

      await prisma.userMembership.create({
        data: {
          organizationId: mainProfile.id,
          userId: user.id,
          permissions: {
            connect: adminPermissions.map((permission) => ({
              id: permission.id,
            })),
          },
        },
      });
    }

    return new NextResponse("User permisisons updated", { status: 200 });
  } catch (error) {
    console.error("Error updating user role:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

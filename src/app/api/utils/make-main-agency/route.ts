import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { constants } from "@/lib/constants";
import { createOrganization } from "@/utils/facades/serverFacades/organizationFacade";

export async function GET(request: Request) {
  // Validate secret params with nextAuthSecret
  const url = new URL(request.url);
  const secret = url.searchParams.get("secret");

  if (secret !== process.env.NEXTAUTH_SECRET) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const email = url.searchParams.get("email");

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

    //Find the main profile
    const mainProfile = await prisma.organization.findFirst({
      where: {
        isMainTenant: true,
      },
    });

    if (mainProfile) {
      return new NextResponse("Main profile already created", { status: 200 });
    }

    const newUser = {
      ...user,
      profileName: constants.appName,
      address: "",
      phone: "",
    };

    //Assign permission of agency to the user
    await createOrganization(newUser);

    return new NextResponse("User permisisons updated", { status: 200 });
  } catch (error) {
    console.error("Error updating user role:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

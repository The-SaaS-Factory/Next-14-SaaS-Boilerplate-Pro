import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET(request: Request) {
  // Validate secret params with nextAuthSecret
  const url = new URL(request.url);
  const secret = url.searchParams.get("secret");

  if (secret !== process.env.NEXTAUTH_SECRET) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  // Helper function to remove duplicates from a table
  const removeDuplicates = async (tableName: string, uniqueField: string) => {
    // Step 1: Find all uniqueField values with duplicates
    const allRecords = await prisma[tableName].findMany({
      select: {
        [uniqueField]: true,
      },
    });

    const recordCounts: Record<string, number> = {};

    allRecords.forEach((record) => {
      recordCounts[record[uniqueField]] =
        (recordCounts[record[uniqueField]] || 0) + 1;
    });

    const duplicateValues = Object.keys(recordCounts).filter(
      (value) => recordCounts[value] > 1
    );

    // Step 2: For each duplicate value, find and delete duplicates
    for (const value of duplicateValues) {
      const records = await prisma[tableName].findMany({
        where: { [uniqueField]: value },
        orderBy: { id: "asc" },
      });

      // Keep the first record and delete the rest
      for (let i = 1; i < records.length; i++) {
        await prisma[tableName].delete({
          where: { id: records[i].id },
        });
      }
    }
  };

  try {
    // Fix duplicates in SuperAdminSetting
    await removeDuplicates("superAdminSetting", "settingName");

    // Fix duplicates in Permission
    await removeDuplicates("permission", "name");

    // Fix duplicates in Capabilities
    await removeDuplicates("capabilitie", "name");
    await removeDuplicates("paymentMethod", "name");

    return new NextResponse(
      "Duplicates fixed in SuperAdminSettings, Permissions, and Capabilities",
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fixing duplicates:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// app/api/download-repo/route.ts

import { downloadRepositoryZip } from "@/utils/facades/serverFacades/githubFacade";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const repoName = searchParams.get("repo");
  
  console.log(repoName);
  
  if (!repoName) {
    return NextResponse.json({ error: "Especifica el nombre del repositorio" }, { status: 400 });
  }

  try {
    const zipBlob = await downloadRepositoryZip(repoName);
    console.log(zipBlob);
    
    return new NextResponse(zipBlob, {
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename=${repoName}-main.zip`,
      },
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

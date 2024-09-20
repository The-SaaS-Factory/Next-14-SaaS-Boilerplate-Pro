import { imageKitFacade } from "@/utils/facades/serverFacades/imagekitFacade";
import { generateRandomString } from "@/utils/facades/serverFacades/strFacade";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const imageRaw = await request.text();

  const image = imageRaw.trim();

  if (!image.startsWith("data") && Array.isArray(JSON.parse(image))) {
    const images = JSON.parse(image);


    const imagesGenerate: any = await Promise.all(
      images.map(async (img: any) => {
        const imageGenerate: any = await imageKitFacade(
          img,
          generateRandomString(7)
        );

        if (imageGenerate.error) {
          console.log("Error", imageGenerate.error);
          throw new Error(imageGenerate.error);
        }

        return {
          url: imageGenerate.result.url as string,
          thumbnailUrl: imageGenerate.result.thumbnailUrl,
        };
      })
    );
    

    if (imagesGenerate) {
      return NextResponse.json(imagesGenerate, { status: 200 });
    } else {
      throw new Error("Error");
    }
  } else {
    const imageGenerate: any = await imageKitFacade(
      image,
      generateRandomString(7)
    );

    if (imageGenerate.error) {
      console.log("Error", imageGenerate.error);
      throw new Error(imageGenerate.error);
    }

    const reponse = {
      url: imageGenerate.result.url as string,
      thumbnailUrl: imageGenerate.result.thumbnailUrl,
    };

    if (imageGenerate) {
      return NextResponse.json(reponse, { status: 200 });
    } else {
      throw new Error("Error");
    }
  }
}

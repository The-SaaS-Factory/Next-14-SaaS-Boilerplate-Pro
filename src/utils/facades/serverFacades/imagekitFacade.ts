import imageKit from "imagekit";

const IMAGEKIT_PUBLIC_KEY = process.env.IMAGEKIT_PUBLIC_KEY;
const IMAGEKIT_PRIVATE_KEY = process.env.IMAGEKIT_PRIVATE_KEY;
const IMAGEKIT_URL_ENDPOINT = process.env.IMAGEKIT_URL_ENDPOINT;

export const imageKitFacade = async (base64Img: string, imageName: string) => {
  try {
    if (
      !IMAGEKIT_PUBLIC_KEY ||
      !IMAGEKIT_PRIVATE_KEY ||
      !IMAGEKIT_URL_ENDPOINT
    ) {
      return { error: "Settings not found" };
    }

    const resolverPayload = {
      publicKey: IMAGEKIT_PUBLIC_KEY,
      privateKey: IMAGEKIT_PRIVATE_KEY,
      urlEndpoint: IMAGEKIT_URL_ENDPOINT,
    };

    const resolver = new imageKit(resolverPayload);

    return new Promise((resolve, reject) => {
      resolver.upload(
        {
          file: base64Img,
          fileName: imageName,
          isPrivateFile: false,
        },
        function (error, result) {
          if (error) {
            console.error("Failed uploading file", error);
            reject(new Error("Failed uploading file"));
          } else {
            resolve({ error: null, result: result });
          }
        }
      );
    });
  } catch (error) {
    console.error("Error in imageKitFacade", error);
    throw error;
  }
};

export const isBase64String = (str: string) => {
  const regex = /^data:image\/([a-zA-Z]*);base64,([^\s]*)$/;
  return regex.test(str);
};

import { constants } from "@/lib/constants";

export default async function sitemap() {
  const platformUrls = [
    {
      url: constants.appUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${constants.appUrl}/buscar`,
      lastModified: new Date(),
    },
    {
      url: `${constants.appUrl}/login`,
      lastModified: new Date(),
    },
  ];

  return platformUrls;
}

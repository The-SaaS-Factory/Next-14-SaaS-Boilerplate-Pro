import { constants } from "@/lib/constants";

export default async function sitemap() {
  const platformUrls = [
    {
      url: constants.appUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];

  return platformUrls;
}

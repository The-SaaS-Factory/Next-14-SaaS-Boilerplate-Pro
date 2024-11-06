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
      url: constants.appUrl + "/boilerplates/next-14-fullstack-saas-boilerplate",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: constants.appUrl + "/boilerplates/next-14-fullstack-saas-boilerplate-pro",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: constants.appUrl + "/marketplace",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];

  return platformUrls;
}

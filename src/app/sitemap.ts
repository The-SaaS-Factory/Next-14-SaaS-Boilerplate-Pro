// import { constants } from "@/lib/constants";
// import { MetadataRoute } from "next";

// export default function sitemap(): MetadataRoute.Sitemap {
//   return [
//     {
//       url: constants.appUrl,
//       lastModified: new Date(),
//       changeFrequency: "weekly",
//       priority: 1,
//     },
//   ];
// }

import { getUserAllProductsCategories } from "@/actions/global/ecommerceSystem/productsModule/categories/get-all-product-categories";
import { getUserAllProductsActives } from "@/actions/global/ecommerceSystem/productsModule/get-all-products-actives";
import { constants } from "@/lib/constants";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const categoriesRaw = await getUserAllProductsCategories();

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

  const categoriesUrls = categoriesRaw.map((cate) => ({
    url: `${constants.appUrl}/categoria/${cate.slug}`,
    lastModified: cate.updatedAt,
  }));

  const products = await getUserAllProductsActives({ args: { search: "" } });

  const productsUrls = products.data.map((product) => ({
    url: `${constants.appUrl}/producto/${product.slug}`,
    lastModified: product.updatedAt,
  }));

  return [...platformUrls, ...categoriesUrls, ...productsUrls];
}

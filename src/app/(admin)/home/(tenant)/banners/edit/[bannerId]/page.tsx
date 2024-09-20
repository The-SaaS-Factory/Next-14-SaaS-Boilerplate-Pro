import PageName from "@/components/ui/commons/PageName";
import React, { Suspense } from "react";
import { Metadata } from "next";
import TableLoaderSkeleton from "@/components/ui/loaders/TableLoaderSkeleton";
import { getProductDetails } from "@/actions/global/ecommerceSystem/productsModule/get-product-details";
import UpsertBanner from "../../ui/UpsertBanner";
export const metadata: Metadata = {
  title: "Editar banner",
};

const ProductsEditPage = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const product: any = await getProductDetails(Number(params.id));

  const productParsed = {
    ...product,
    taxActive: product.taxActive ? "true" : "false",
  };

  return (
    <div>
      <PageName
        name={"Editar banner"}
        isSubPage={true}
        breadcrumbs={[
          {
            name: "Escritorio",
            href: "/home",
          },
          {
            name: "Banners",
            href: "/home/banners",
          },
        ]}
      />
      <Suspense fallback={<TableLoaderSkeleton count={10} />}>
        <UpsertBanner modelId={Number(params.id)} values={productParsed} />
      </Suspense>
    </div>
  );
};

export default ProductsEditPage;

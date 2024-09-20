import PageName from "@/components/ui/commons/PageName";
import React from "react";
import { Metadata } from "next";
import UpsertBanner from "../ui/UpsertBanner";

export const metadata: Metadata = {
  title: "Nuevo banner",
};

const ProductsAdd = async () => {
  return (
    <div>
      <PageName
        isSubPage={true}
        name={"Nuevo banner"}
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
      <UpsertBanner />
    </div>
  );
};

export default ProductsAdd;

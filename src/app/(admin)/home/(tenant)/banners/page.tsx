import PageName from "@/components/ui/commons/PageName";
import { Metadata } from "next";
import Search from "@/components/ui/commons/Search";
import AdminBannersList from "./ui/TenantBannerList";

export const metadata: Metadata = {
  title: "Banners",
};

const BannersRoot = ({
  params: { locale },
  searchParams,
}: {
  params: { locale: string };
  searchParams?: {
    query?: string;
    page?: string;
  };
}) => {

  const query = searchParams?.query || "";

  return (
    <div>
      <PageName
        name={"Banners"}
        isSubPage={true}
        btn1={{
          name: "Agregar banner",
          href: "banners/add",
        }}
      />
      <Search placeholder="Buscar banner por nombre" />
      <AdminBannersList
        query={query}
        locale={locale}
      />
    </div>
  );
};

export default BannersRoot;

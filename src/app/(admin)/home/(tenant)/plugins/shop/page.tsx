import PageName from "@/components/ui/commons/PageName";
import { Metadata } from "next";
import Search from "@/components/ui/commons/Search";
import TenantPluginList from "../ui/TenantPluginList";

export const metadata: Metadata = {
  title: "Tienda de herramientas",
};

const TenantPluginsActivesPage = ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) => {
  const currentPage = Number(searchParams?.page) || 1;

  const query = searchParams?.query || "";

  return (
    <div>
      <PageName name={"Tienda de herramientas"} isSubPage={true} />
      <Search placeholder="Buscar plugin por nombre" />
      <TenantPluginList
        query={query}
        currentPage={currentPage}
      />
    </div>
  );
};

export default TenantPluginsActivesPage;

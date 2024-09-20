import PageName from "@/components/ui/commons/PageName";
import { Metadata } from "next";
import Search from "@/components/ui/commons/Search";
import TenantPluginsInstalled from "../ui/TenantPluginsInstalled";

export const metadata: Metadata = {
  title: "Plugins instalado",
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
      <PageName name={"Plugins activos"} isSubPage={true} />
      <Search placeholder="Buscar plugin por nombre" />
      <TenantPluginsInstalled query={query} currentPage={currentPage} />
    </div>
  );
};

export default TenantPluginsActivesPage;

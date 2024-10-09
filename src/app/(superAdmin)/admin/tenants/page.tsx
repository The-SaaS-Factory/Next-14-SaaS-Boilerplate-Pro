import React, { Suspense } from "react";
import PageName from "@/components/ui/commons/PageName";
import Search from "@/components/ui/commons/Search";
import TableLoaderSkeleton from "@/components/ui/loaders/TableLoaderSkeleton";
import { Metadata } from "next";
import TenantList from "./ui/TenantList";

export const metadata: Metadata = {
  title: "Tenants",
};
const SuperAdminUserModulePage = ({
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
    <main>
      <PageName name={"Dashboard"} />
      <Search placeholder="Search for a Tenants" />
      <Suspense
        key={query + Math.random}
        fallback={<TableLoaderSkeleton count={10} />}
      >
        <TenantList query={query} currentPage={currentPage} />
      </Suspense>
    </main>
  );
};

export default SuperAdminUserModulePage;

import PageName from "@/components/ui/commons/PageName";
import React, { Suspense } from "react";
import Search from "@/components/ui/commons/Search";
import TableLoaderSkeleton from "@/components/ui/loaders/TableLoaderSkeleton";
import SupportTicketsList from "./ui/SupportTicketsList";
import { Metadata } from "next";
 

export const metadata: Metadata = {
  title: "Support",
};

const AdminSupportPage = ({
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
      <PageName
        name={"Soporte"}
        breadcrumbs={[
          { name: "Escritorio", href: "/home" },
          { name: "Soporte", href: "/home/support" },
        ]}
       
      />
      <Search placeholder={"Buscar ticket por ID"} />
      <Suspense
        key={query + Math.random}
        fallback={<TableLoaderSkeleton count={10} />}
      >
        <SupportTicketsList query={query} currentPage={currentPage} />
      </Suspense>
    </div>
  );
};

export default AdminSupportPage;

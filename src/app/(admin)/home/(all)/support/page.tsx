import PageName from "@/components/ui/commons/PageName";
import React, { Suspense } from "react";
import Search from "@/components/ui/commons/Search";
import TableLoaderSkeleton from "@/components/ui/loaders/TableLoaderSkeleton";
import SupportTicketsList from "./ui/SupportTicketsList";
import { Metadata } from "next";
import SlideOver from "@/components/core/SlideOver";
import NewTicketSupportForm from "./ui/NewTicketSupportForm";

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
        name={"Support"}
        breadcrumbs={[
          { name: "Dashboard", href: "/home" },
          { name: "Support", href: "/home/support" },
        ]}
      />
      <div className="flex justify-end -mt-14 mb-7">
        <SlideOver
          button={{
            name: "New Ticket",
          }}
        >
          <NewTicketSupportForm />
        </SlideOver>
      </div>
      <Search placeholder={"Search ticket by ID"} />
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

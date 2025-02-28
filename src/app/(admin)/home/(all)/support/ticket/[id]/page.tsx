import PageName from "@/components/ui/commons/PageName";
import React, { Suspense } from "react";
import { Metadata } from "next";
import { getSupportTicketById } from "@/actions/global/supportModule/get-support-ticket-by-id";
import ViewSupportTicketDetailsPage from "@/app/modules/supportModule/ViewSupportTicketPage";
import TableLoaderSkeleton from "@/components/ui/loaders/TableLoaderSkeleton";
import { getMembership } from "@/utils/facades/serverFacades/userFacade";

export const metadata: Metadata = {
  title: "Ver Ticket",
};

const ViewTicket = async ({ params }: { params: { id: string } }) => {
  const ticketIdStr = params.id || "";
  const ticketId = parseInt(ticketIdStr);
  const ticket = await getSupportTicketById(ticketId);
  const userDB = await getMembership();
  return (
    <div>
      <Suspense fallback={<TableLoaderSkeleton count={10} />}>
        <PageName
          name={"View details"}
          breadcrumbs={[
            { name: "Dashboard", href: "/home" },
            { name: "Support", href: "/home/support" },
            { name: "View ticket", href: `/home/support/ticket/${ticketId}` },
          ]}
        />
        <ViewSupportTicketDetailsPage user={userDB} ticket={ticket} />
      </Suspense>
    </div>
  );
};

export default ViewTicket;

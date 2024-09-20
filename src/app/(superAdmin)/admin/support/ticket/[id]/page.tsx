import PageName from "@/components/ui/commons/PageName";
import React, { Suspense } from "react";
import { Metadata } from "next";
import ViewSupportTicketDetailsPage from "@/app/modules/supportModule/ViewSupportTicketPage";
import TableLoaderSkeleton from "@/components/ui/loaders/TableLoaderSkeleton";
import { getSupportTicketDetails } from "@/actions/global/supportModule/admin/get-support-ticket-details";
import { getMembership } from "@/utils/facades/serverFacades/userFacade";

export const metadata: Metadata = {
  title: "View Ticket",
};

const SuperAdminViewTicket = async ({ params }: { params: { id: string } }) => {
  const ticketIdStr = params.id || "";
  const ticketId = parseInt(ticketIdStr);
  const ticket = await getSupportTicketDetails(ticketId);
  const userDB = await getMembership();
  return (
    <div>
      <PageName name={"View Ticket"} />
      <Suspense fallback={<TableLoaderSkeleton count={10} />}>
        <ViewSupportTicketDetailsPage user={userDB} ticket={ticket} />
      </Suspense>
    </div>
  );
};

export default SuperAdminViewTicket;

import React from "react";
import { ISupportTicket } from "@/interfaces/supportModule";
import { Card, Flex } from "@tremor/react";
import {
  formatTimestampToDateString,
  isValidJSON,
} from "@/utils/facades/frontendFacades/strFacade";
import AddMessageToSupportTicket from "./AddMessageToSupportTicket";
import CloseTicket from "./CloseTicket";
import Image from "next/image";
import Link from "next/link";
import { showTicketStatus } from "@/app/(superAdmin)/admin/support/ui/SuperAdminTicketsList";
import OrganizationCard from "@/components/ui/commons/OrganizationCard";

const ViewSupportTicketDetailsPage = ({
  ticket,
  user,
}: {
  ticket: ISupportTicket;
  user: any;
}) => {
  if (!ticket) return null;
  return (
    <div>
      <Card className="mr-3">
        <div className="flex flex-col justify-between space-y-3 lg:flex-row lg:space-y-0">
          <div className="flex justify-between">
            <span className="subtitle">
              {"Subject"}: {ticket.subject}
            </span>
            <span className="subtitle ml-3">
              {"Ticket"} ID: {ticket.id}
            </span>
          </div>
          <div className="flex items-center justify-between space-x-3">
            <span className="subtitle">
              Status: {showTicketStatus(ticket.status)}
            </span>
            {ticket.status !== "CLOSED" && <CloseTicket ticketId={ticket.id} />}
          </div>
          <span className="subtitle">
            Date: {formatTimestampToDateString(ticket.createdAt)}
          </span>
        </div>
        <div className="mt-3">
          {ticket.SupportTicketMessage?.map((message: any) => {
            return message.SupportTicketMessageContent.filter(
              (content: any) =>
                content.type === "TEXT" && content.content !== "",
            ).map((text: any, index: number) => {
              return (
                <Card
                  key={`content${index}`}
                  className={`my-3 ${
                    message.userId == user?.id ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <div className="flex flex-col lg:flex-row">
                    <OrganizationCard
                      organization={
                        message.organization ?? message.Organization
                      }
                    />{" "}
                    <span>
                      {formatTimestampToDateString(message.createdAt, true)}
                    </span>
                  </div>
                  <hr className="my-3" />
                  <Flex>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: isValidJSON(text.content)
                          ? JSON.parse(text.content)
                          : text.content,
                      }}
                    ></div>
                  </Flex>
                  <Flex>
                    {message.SupportTicketMessageContent.filter(
                      (content: any) =>
                        content.type === "GALLERY" && content.content !== "",
                    ).map((image: any, index: number) => {
                      return (
                        <div key={`image${index}`}>
                          <Link target="_blank" href={image.content}>
                            <Image
                              src={image.content}
                              alt=""
                              width={160}
                              height={160}
                            />
                          </Link>
                        </div>
                      );
                    })}
                  </Flex>
                </Card>
              );
            });
          })}
        </div>
      </Card>
      {(ticket.status == "AWAITING_RESPONSE" ||
        ticket.status == "UNDER_REVIEW" ||
        ticket.status == "OPEN") && (
        <AddMessageToSupportTicket ticket={ticket} />
      )}
    </div>
  );
};

export default ViewSupportTicketDetailsPage;

import PageName from "@/components/ui/commons/PageName";
import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { getSuperAdminSetting } from "@/utils/facades/serverFacades/adminFacade";
import { getTranslations } from "next-intl/server";
import {
  ArrowUpRightIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";

export const metadata: Metadata = {
  title: "Support",
};

export default async function AdminSupportPage() {
  const t = await getTranslations("AdminLayout.pages.support");

  const helperCenter = await getSuperAdminSetting(
    "SUPPORT_MODULE_HELPER_CENTER"
  );

  const slackLink = await getSuperAdminSetting("SUPPORT_MODULE_SLACK_LINK");
  const email = await getSuperAdminSetting("SUPPORT_MODULE_EMAIL");
  const ticketsEnabled = await getSuperAdminSetting(
    "SUPPORT_MODULE_TICKETS_ENABLED"
  );
  return (
    <div>
      <PageName
        name={t("support")}
        breadcrumbs={[
          { name: t("dashboard"), href: "/home" },
          { name: t("support"), href: "/home/support" },
        ]}
        btn2={
          <Link
            className="btn-primary flex items-center gap-2"
            href={helperCenter}
          >
            <span> View Helper Center</span>
            <ArrowUpRightIcon className="size-4"></ArrowUpRightIcon>
          </Link>
        }
      />

      <div className="flex w-full h-full p-8 gap-6 lg:flex-row flex-col">
        {ticketsEnabled === "true" && (
          <div className="flex flex-col gap-2 bg-main rounded-xl shadow-md py-4 px-6 lg:w-64">
            <div className="flex h-full w-full gap-2 items-center">
              <ChatBubbleOvalLeftEllipsisIcon className="size-6"></ChatBubbleOvalLeftEllipsisIcon>

              <span className="whitespace-nowrap font-bold">
                Tickets Support
              </span>
            </div>
            <p className="text-sm ">Get quick support for the entire team</p>
            <Link
              className="btn-main mt-4 w-fit mr-auto"
              href="support/tickets/"
            >
              See Tickets
            </Link>
          </div>
        )}

        <div className="flex flex-col gap-2 bg-main rounded-xl shadow-md py-4 px-6 lg:w-64">
          <div className="flex h-full w-full gap-2 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="size-6"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M12 12v-6a2 2 0 0 1 4 0v6m0 -2a2 2 0 1 1 2 2h-6" />
              <path d="M12 12h6a2 2 0 0 1 0 4h-6m2 0a2 2 0 1 1 -2 2v-6" />
              <path d="M12 12v6a2 2 0 0 1 -4 0v-6m0 2a2 2 0 1 1 -2 -2h6" />
              <path d="M12 12h-6a2 2 0 0 1 0 -4h6m-2 0a2 2 0 1 1 2 -2v6" />
            </svg>

            <span className="whitespace-nowrap font-bold">Slack Connect</span>
          </div>
          <p className="text-sm ">
            Invite your team to collaborate in a shared Slack Channel
          </p>
          <Link className="btn-main mt-4 w-fit mr-auto" href={slackLink}>
            Request Slack Connect
          </Link>
        </div>

        <div className="flex flex-col gap-2 bg-main rounded-xl shadow-md py-4 px-6 lg:w-64">
          <div className="flex h-full w-full gap-2 items-center">
            <EnvelopeIcon className="size-6"></EnvelopeIcon>

            <span className="whitespace-nowrap font-bold">Email</span>
          </div>
          <p className="text-sm ">Send an email to our shared inbox</p>
          <Link
            className="btn-main mt-4 w-fit mr-auto"
            href={email ? `mailto:${email}` : ""}
          >
            Send Email
          </Link>
        </div>
      </div>
    </div>
  );
}

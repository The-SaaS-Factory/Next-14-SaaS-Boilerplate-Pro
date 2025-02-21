"use client";

import { Navigation } from "../ui/Navigation";

import { useNavigation } from "../layouts/useNavigation";
import Link from "next/link";
import { checkOrganizationCapabilityInServer } from "@/utils/facades/serverFacades/membershipFacade";
import { isOrganizationAdmin } from "@/utils/facades/serverFacades/securityFacade";
import { useMembership } from "@/utils/hooks/useMembership";
import { LifebuoyIcon } from "@heroicons/react/24/outline";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import React from "react";

export function OrganizationAdminSidebar({ profile }: any) {
  const { tenantNavigation } = useNavigation();
  const { userMembership } = useMembership();

  const canAccessToSupportModule = React.useMemo(() => {
    return checkOrganizationCapabilityInServer({
      capabilityName: "Support via ticket",
    });
  }, []);

  return (
    <Sidebar className="flex h-full flex-col">
      <SidebarContent className="bg-main">
        <SidebarHeader>
          <div className="my-2 flex shrink-0 items-center">
            <Link href="/" className=" ">
              <span className="text-primary text-2xl font-bold">
                {profile.name}
              </span>
            </Link>
          </div>
        </SidebarHeader>
        <SidebarGroup />
        <ul role="list" className="flex flex-1 flex-col gap-y-7 px-3">
          <li>
            <ul role="list" className="text-primary space-y-1">
              <Navigation navigation={tenantNavigation} />
            </ul>
          </li>
          {isOrganizationAdmin(userMembership) && canAccessToSupportModule && (
            <li className="text-primary mt-auto">
              <Link
                href="/home/support"
                className="group flex gap-x-3 rounded-md font-semibold leading-6"
              >
                <LifebuoyIcon className="h-6 w-6 shrink-0" aria-hidden="true" />
                Support
              </Link>
            </li>
          )}
        </ul>
        <SidebarGroup />
      </SidebarContent>
    </Sidebar>
  );
}

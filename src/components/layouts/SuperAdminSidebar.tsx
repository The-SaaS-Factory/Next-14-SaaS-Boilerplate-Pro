"use client";

import { Navigation } from "../ui/Navigation";

import { useNavigation } from "../layouts/useNavigation";
import Link from "next/link";
import { LifebuoyIcon } from "@heroicons/react/24/outline";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Settings } from "lucide-react";

export function SuperAdminSidebar({ profile }: any) {
  const { superAdminNavigation } = useNavigation();

  return (
    <Sidebar className="bg-main flex h-full flex-col">
      <SidebarContent>
        <SidebarHeader>
          <div className="my-2 flex shrink-0 items-center">
            <Link href="/" className=" ">
              <span className="text-primary text-2xl font-bold">
                Super Admin
              </span>
            </Link>
          </div>
        </SidebarHeader>
        <SidebarGroup />
        <ul role="list" className="flex flex-1 flex-col gap-y-7 px-3">
          <li>
            <ul role="list" className="text-primary space-y-1">
              <Navigation navigation={superAdminNavigation} />
            </ul>
          </li>
          <li className="text-primary mt-auto">
            <ul role="list" className="text-primary space-y-3">
              <li>
                <Link className="flex space-x-2" href="/home/support">
                  <LifebuoyIcon
                    className="h-6 w-6 shrink-0"
                    aria-hidden="true"
                  />
                  <span>Support</span>
                </Link>
              </li>
              <li>
                <Link className="flex space-x-2" href="/admin/settings/general">
                  <Settings
                    className="text-primary h-6 w-6 shrink-0"
                    aria-hidden="true"
                  />
                  <span>Settings</span>
                </Link>
              </li>
            </ul>
          </li>
        </ul>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}

"use client";
import { useSidebarState } from "@/states/ui/sidebarState";
import useDarkTheme from "@/app/hooks/useDarkTheme";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import Bars3Icon from "@heroicons/react/24/outline/Bars3Icon";

import Link from "next/link";
import { BellIcon } from "@heroicons/react/24/outline";
import SearchHeader, { SearchIcon } from "./commons/SearchHeader";
import { Suspense, useState } from "react";

const SuperAdminHeader = ({
  notificationsCount,
}: {
  notificationsCount: number;
}) => {
  const { toggleSidebarMenu } = useSidebarState(({ toggleSidebarMenu }) => ({
    toggleSidebarMenu,
  }));

  const [open, setOpen] = useState(false);
  const { daktThemeSelector, isDarkTheme } = useDarkTheme();
  return (
    <div>
      {" "}
      <div className="sticky top-0 z-40 lg:mx-auto ">
        <div className="flex h-16 items-center bg-transparent backdrop-blur-3xl bg-opacity-25 transition-opacity gap-x-4 border-b text-primary border-gray-200 px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-0 lg:shadow-none">
          <button
            type="button"
            className="-m-2.5 p-2.5   lg:hidden"
            onClick={() => toggleSidebarMenu()}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-6 w-6 " aria-hidden="true" />
          </button>

          {/* Separator */}
          <div className="h-6 w-px bg-main lg:hidden" aria-hidden="true" />

          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="hidden items-center lg:flex lg:w-[450px] lg:flex-auto">
              <button
                onClick={() => setOpen(true)}
                type="button"
                className="hidden h-8 w-full items-center  justify-between gap-2 rounded-xl bg-white pl-2 pr-3 text-sm text-zinc-500 ring-1 ring-zinc-900/10 transition hover:ring-zinc-900/20 ui-not-focus-visible:outline-none lg:flex dark:bg-white/5 dark:text-zinc-400 dark:ring-inset dark:ring-white/10 dark:hover:ring-white/20"
              >
                <div className="flex items-center space-x-2">
                  <SearchIcon className="h-5 w-5 stroke-current" />

                  <span className="font-normal">Encontre algo para si...</span>
                </div>
                <kbd className="ml-32 justify-end text-2xs text-zinc-400 dark:text-zinc-500">
                  <kbd className="font-sans">Ctrl </kbd>
                  <kbd className="font-sans">K</kbd>
                </kbd>
              </button>
              <Suspense fallback={null}>
                <SearchHeader open={open} setOpen={setOpen} />
              </Suspense>
            </div>

            <div className="relative  p-4   flex-1">
              <div className=" hidden lg:flex">
                <OrganizationSwitcher
                  appearance={{
                    baseTheme: isDarkTheme ? dark : undefined,
                  }}
                  afterSelectPersonalUrl={"/home"}
                  afterSelectOrganizationUrl={"/home"}
                  afterCreateOrganizationUrl={"/welcome"}
                  afterLeaveOrganizationUrl={"/home"}
                />
              </div>
            </div>

            <div className="flex items-center gap-x-4 lg:gap-x-6">
              {daktThemeSelector}

              {/* Notification button */}
              <Link className="relative" href="/admin/notifications">
                <BellIcon className="h-6 w-6 text" aria-hidden="true" />
                {notificationsCount > 0 && (
                  <span className="bg-red-500 h-5 w-5 top-0 -mt-1 text-center -pt-7 absolute right-0  text-white rounded-full">
                    <p className="-mt-1 p-1">{notificationsCount}</p>
                  </span>
                )}
              </Link>

              {/* Separator */}
              <div
                className="hidden mr-3 lg:block lg:h-6 lg:w-px lg:bg-main"
                aria-hidden="true"
              />

              {/* Profile dropdown */}
              <div className="pr-7">
                <UserButton
                  appearance={{
                    baseTheme: isDarkTheme ? dark : undefined,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminHeader;

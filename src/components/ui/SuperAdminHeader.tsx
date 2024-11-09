"use client";
import { useSidebarState } from "@/states/ui/sidebarState";
import useDarkTheme from "@/utils/hooks/useDarkTheme";
import Bars3Icon from "@heroicons/react/24/outline/Bars3Icon";
import Link from "next/link";
import { signOut } from "next-auth/react";
import React, { Suspense, useState } from "react";
import SearchHeader, { SearchIcon } from "./commons/SearchHeader";
import { constants } from "@/lib/constants";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

const SuperAdminHeader = ({
  notificationsCount,
}: {
  notificationsCount: number;
}) => {
  const { toggleSidebarMenu } = useSidebarState(({ toggleSidebarMenu }) => ({
    toggleSidebarMenu,
  }));

  const [open, setOpen] = useState(false);
  const { darkThemeSelector } = useDarkTheme();

  return (
    <>
      <div className=" relative -mt-2     w-full flex    z-50   ">
        <div
          className="lg:fixed mt-3 lg:mt-0 pt-2 lg:pt-0 w-full lg:w-auto lg:left-[20%] 2xl:left-[14.4%] right-0 top-0  h-14     backdrop-blur-3xl  
           bg-opacity-25 transition-opacity 
         items-center gap-x-4 border-b text-primary
          border-gray-300 bg-transparent  dark:border-gray-600 px-4 
          shadow-sm sm:gap-x-6 sm:px-6 lg:px-0 lg:shadow-none"
        >
          <Button
            variant="outline"
            className="  first-line:  lg:hidden"
            onClick={toggleSidebarMenu}
            size="icon"
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-7 w-7 " aria-hidden="true" />
          </Button>

          <div className="flex pt-3 lg:pt-0 flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="relative p-3 pl-7 flex-1">
              <div className=" hidden lg:flex space-x-3">
                <div>
                  <div className="hidden lg:block lg:w-[450px] lg:flex-auto">
                    <button
                      onClick={() => setOpen(true)}
                      type="button"
                      className="hidden h-8 w-full items-center  justify-between gap-2 rounded-xl bg-white pl-2 pr-3 text-sm text-zinc-500 ring-1 ring-zinc-900/10 transition hover:ring-zinc-900/20 ui-not-focus-visible:outline-none lg:flex dark:bg-white/5 dark:text-zinc-400 dark:ring-inset dark:ring-white/10 dark:hover:ring-white/20"
                    >
                      <div className="flex items-center space-x-2">
                        <SearchIcon className="h-5 w-5 stroke-current" />

                        <span className="font-normal">
                          {" "}
                          Search page or funcionality
                        </span>
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
                </div>
              </div>
            </div>
            <div className="flex -mt-[85px] lg:mt-0 items-center gap-x-4 lg:gap-x-6">
              <div
                className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10"
                aria-hidden="true"
              />

              {darkThemeSelector}

              <Link className="relative" href="/home/notifications">
                <Button variant="outline" size="icon">
                  <Bell className="h-4 w-4" />
                </Button>
                {notificationsCount > 0 && (
                  <span className=" h-5 w-5 top-0 -mt-1 text-center -pt-7 shadow-md shadow-red-500 absolute right-0 bg-red-500 text-white rounded-full">
                    <p className="-mt-1 p-1">{notificationsCount}</p>
                  </span>
                )}
              </Link>

              <Button
                className="mr-3"
                onClick={() => signOut({ callbackUrl: constants.appUrl })}
              >
                Sign out
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SuperAdminHeader;

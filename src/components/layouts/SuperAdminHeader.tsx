"use client";
import useDarkTheme from "@/utils/hooks/useDarkTheme";
import Link from "next/link";
import React, { Suspense, useState } from "react";
import SearchHeader, { SearchIcon } from "../ui/commons/SearchHeader";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { useSidebar } from "../ui/sidebar";
import { ProfileButton } from "../ui/commons/ProfileButton";
import { IUserMembership } from "@/interfaces/saasTypes";

const SuperAdminHeader = ({
  notificationsCount,
  userMembership,
}: {
  notificationsCount: number;
  userMembership: IUserMembership;
}) => {
  const [open, setOpen] = useState(false);
  const { darkThemeSelector } = useDarkTheme();
  const { toggleSidebar } = useSidebar();

  return (
    <>
      <div className="relative z-50 flex w-full">
        <div className="text-primary flex h-14 w-full items-center gap-x-4 border-b border-gray-300 bg-red-500 bg-transparent bg-opacity-25 px-4 shadow-sm backdrop-blur-3xl transition-opacity dark:border-gray-600 sm:gap-x-6 sm:px-6 lg:px-0 lg:shadow-none">
          <Button variant="ghost" className="mx-1" onClick={toggleSidebar}>
            <HamburgerMenuIcon className="text-primary h-6 w-6" />
          </Button>
          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="relative flex-1 p-3 pl-7">
              <div className="hidden space-x-3 lg:flex">
                <div>
                  <div className="hidden lg:block lg:w-[450px] lg:flex-auto">
                    <button
                      onClick={() => setOpen(true)}
                      type="button"
                      className="hidden h-8 w-full items-center justify-between gap-2 rounded-xl bg-white pl-2 pr-3 text-sm text-zinc-500 ring-1 ring-zinc-900/10 transition hover:ring-zinc-900/20 ui-not-focus-visible:outline-none dark:bg-white/5 dark:text-zinc-400 dark:ring-inset dark:ring-white/10 dark:hover:ring-white/20 lg:flex"
                    >
                      <div className="flex items-center space-x-2">
                        <SearchIcon className="h-5 w-5 stroke-current" />

                        <span className="font-normal">
                          {" "}
                          Search page or funcionality
                        </span>
                      </div>
                      <kbd className="text-2xs ml-32 justify-end text-zinc-400 dark:text-zinc-500">
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
            <div className="flex items-center gap-x-4 lg:mt-0 lg:gap-x-6">
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
                  <span className="-pt-7 absolute right-0 top-0 -mt-1 h-5 w-5 rounded-full bg-red-500 text-center text-white shadow-md shadow-red-500">
                    <p className="-mt-1 p-1">{notificationsCount}</p>
                  </span>
                )}
              </Link>

              <ProfileButton userMembership={userMembership} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SuperAdminHeader;

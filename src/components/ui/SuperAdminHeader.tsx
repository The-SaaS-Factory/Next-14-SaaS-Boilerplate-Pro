"use client";
import { useSidebarState } from "@/states/ui/sidebarState";
import Bars3Icon from "@heroicons/react/24/outline/Bars3Icon";

import Link from "next/link";
import { BellIcon } from "@heroicons/react/24/outline";
import useDarkTheme from "@/utils/hooks/useDarkTheme";

const SuperAdminHeader = ({
  notificationsCount,
}: {
  notificationsCount: number;
  organization: any;
}) => {
  const { toggleSidebarMenu } = useSidebarState();

  const { darkThemeSelector } = useDarkTheme();

  return (
    <div>
      {" "}
      <div className=" relative    w-full flex    z-50   ">
        <div
          className="lg:fixed  w-full lg:w-auto lg:left-[20%] 2xl:left-[14.4%] right-0 top-0  h-14     backdrop-blur-3xl bg-transparent
           bg-opacity-25 transition-opacity 
         items-center gap-x-4 border-b text-primary
          border-gray-300  dark:border-gray-600 px-4 
          shadow-sm sm:gap-x-6 sm:px-6 lg:px-0 lg:shadow-none"
        >
          <button
            type="button"
            className="  p-4   lg:hidden"
            onClick={toggleSidebarMenu}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-7 w-7 " aria-hidden="true" />
          </button>

          <div className="flex flex-1 p-2 gap-x-4 self-stretch lg:gap-x-6">
            <div className="relative  p-4   flex-1">
              <div className=" hidden lg:flex"></div>
            </div>

            <div className="flex items-center gap-x-4 lg:gap-x-6">
              {darkThemeSelector}

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
              <Link href="/home" className="btn-main">
                Salir de la administración
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminHeader;

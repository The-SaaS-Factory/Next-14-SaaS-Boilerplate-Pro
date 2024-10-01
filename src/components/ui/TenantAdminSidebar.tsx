"use client";
import React from "react";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Cog6ToothIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useSidebarState } from "@/states/ui/sidebarState";
import Link from "next/link";
import { useNavigation } from "../layouts/useNavigation";
import { Navigation } from "./Navigation";
import Image from "next/image";
import { IOrganization, IUserMembership } from "@/interfaces/saasTypes";
import { isOrganizationAdmin } from "@/utils/facades/serverFacades/securityFacade";

const TenantAdminSidebar = ({
  org,
  userMembership,
}: {
  org: IOrganization;
  userMembership: IUserMembership;
}) => {
  const { toggleSidebarMenu, isSidebarMenuOpen } = useSidebarState(
    ({ toggleSidebarMenu, isSidebarMenuOpen }) => ({
      toggleSidebarMenu,
      isSidebarMenuOpen,
    })
  );

  const { tenantNavigation } = useNavigation(
    isOrganizationAdmin(userMembership)
  );

  return (
    <div>
      <Transition.Root show={isSidebarMenuOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50 lg:hidden"
          onClose={toggleSidebarMenu}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900/80" />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                    <button
                      type="button"
                      className="-m-2.5 p-2.5"
                      onClick={() => toggleSidebarMenu()}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>
                {/* Sidebar component, swap this element with another sidebar if you like */}
                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-main text-primary px-6 pb-4">
                  <div className="flex  my-2 shrink-0 items-center">
                    <Link href="/" className=" ">
                      <span className="font-bold text-2xl">{org.name}</span>
                    </Link>
                  </div>
                  <div className="relative"></div>
                  <nav className="flex flex-1 flex-col">
                    <ul role="list" className="flex flex-1 flex-col gap-y-7">
                      <li>
                        <ul role="list" className=" space-y-1">
                          <Navigation navigation={tenantNavigation} />
                        </ul>
                      </li>
                      <li className="mt-auto -mx-2">
                        {/*                      
                        <Link
                          onClick={() => toggleSidebarMenu()}
                          href="/home/support"
                          className="bg-main group flex gap-x-3 rounded-md p-2  text-primary"
                        >
                          <LifebuoyIcon
                            className="h-6 w-6 shrink-0 text-primary "
                            aria-hidden="true"
                          />
                          {t("support")}
                        </Link> */}
                        <Link
                          onClick={() => toggleSidebarMenu()}
                          href="/home/settings/profile
"
                          className="bg-main group flex gap-x-3 rounded-md p-2  text-primary"
                        >
                          <Cog6ToothIcon
                            className="h-6 w-6 shrink-0 text-primary "
                            aria-hidden="true"
                          />
                          Ajustes
                        </Link>
                      </li>
                    </ul>
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-[20%] 2xl:w-[14.4%]  lg:flex-col">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div
          className="flex backdrop-blur-lg lg:left-72 xl:left-80 dark:backdrop-blur-3xl
         grow flex-col gap-y-5 overflow-y-auto 
        border-r  border-gray-300  dark:border-gray-600 bg-main text-primary px-6 pb-4"
        >
          {" "}
          <div className="flex h-16 shrink-0 items-center">
            <Link href="/" className="">
              <Image
                width={80}
                height={80}
                src="/assets/img/Nvar-logo-black.png"
                alt="Logo oscuro"
                className="hidden dark:block"
              />
              <Image
                width={80}
                height={80}
                src="/assets/img/Nvar-logo-white.png"
                alt="Logo claro"
                className="block dark:hidden"
              />
            </Link>
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className=" space-y-1">
                  <Navigation navigation={tenantNavigation} />
                </ul>
              </li>

              <li className="mt-auto">
                {/* <Link
                  onClick={() => toggleSidebarMenu()}
                  href="/home/affiliates/link"
                  className="group -mx-4 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6   hover:bg-gray-50 hover:text-indigo-600"
                >
                  <UsersIcon
                    className="h-6 w-6 shrink-0 text-primary "
                    aria-hidden="true"
                  />
                  {t("affiliatePanel")}
                </Link>
                <Link
                  onClick={() => toggleSidebarMenu()}
                  href="/home/support"
                  className="group -mx-4 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6   hover:bg-gray-50 hover:text-indigo-600"
                >
                  <LifebuoyIcon
                    className="h-6 w-6 shrink-0 text-primary "
                    aria-hidden="true"
                  />
                  {t("support")}
                </Link> */}
                <Link
                  onClick={() => toggleSidebarMenu()}
                  href="/home/settings/profile
"
                  className="group -mx-4 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6   hover:bg-gray-50 hover:text-indigo-600"
                >
                  <Cog6ToothIcon
                    className="h-6 w-6 shrink-0 text-primary "
                    aria-hidden="true"
                  />
                  Ajustes
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default TenantAdminSidebar;

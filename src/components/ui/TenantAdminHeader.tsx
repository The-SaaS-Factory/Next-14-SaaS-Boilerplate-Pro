"use client";
import { useSidebarState } from "@/states/ui/sidebarState";
import useDarkTheme from "@/app/hooks/useDarkTheme";
import Bars3Icon from "@heroicons/react/24/outline/Bars3Icon";
import Link from "next/link";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";

import { useSession } from "next-auth/react";
import { toast } from "sonner";
import React, { Suspense, useState } from "react";
import SearchHeader, { SearchIcon } from "./commons/SearchHeader";
import { constants } from "@/lib/constants";
import { MultiTentantProfileButton } from "./commons/MultiTentantProfileButton";
import { createProfile } from "@/utils/facades/serverFacades/profileFacade";

const TenantAdminHeader = ({
  profile,
  profileMembership,
  membershipPermissions,
  // agencyPermissions,
}: {
  notificationsCount: number;
  profile: any;
  profileMembership: any;
  membershipPermissions: string[];
  agencyPermissions: string[];
}) => {
  const { toggleSidebarMenu } = useSidebarState(({ toggleSidebarMenu }) => ({
    toggleSidebarMenu,
  }));

  const [open, setOpen] = useState(false);
  const { daktThemeSelector } = useDarkTheme();
  const [openNewPorfile, setOpenNewProfile] = useState(false);

  const isSuperAdmin =
    membershipPermissions.includes("superAdmin:totalAccess") ||
    membershipPermissions.includes("superAdmin:administration:read");

  return (
    <>
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
            onClick={() => toggleSidebarMenu()}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-7 w-7 " aria-hidden="true" />
          </button>

          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
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
                          Buscar página o funcionalidad...
                        </span>
                      </div>
                      <kbd className="ml-32 justify-end text-2xs text-zinc-400 dark:text-zinc-500">
                        <kbd className="font-sans">Ctrl </kbd>
                        <kbd className="font-sans">K</kbd>
                      </kbd>
                    </button>
                    <Suspense fallback={null}>
                      <SearchHeader
                        // agencyPermissions={agencyPermissions}
                        // membershipPermissions={membershipPermissions}
                        open={open}
                        setOpen={setOpen}
                      />
                    </Suspense>
                  </div>
                </div>
                
              </div>
            </div>
            <div className="flex -mt-[85px] lg:mt-0 items-center gap-x-4 lg:gap-x-6">
              {isSuperAdmin && (
                <Link href="/admin" className="btn-main">
                  Acceso Súper Admin
                </Link>
              )}
              <Link
                href="/home/help"
                className="hidden lg:flex items-center gap-x-2 text-primary"
              >
                Ayuda
              </Link>

              {/* Separator */}
              <div
                className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10"
                aria-hidden="true"
              />

              {daktThemeSelector}

              {/* Notification button */}
              {/* <Link className="relative" href="/home/notifications">
                <BellIcon className="h-6 w-6 text" aria-hidden="true" />
                {notificationsCount > 0 && (
                  <span className=" h-5 w-5 top-0 -mt-1 text-center -pt-7 absolute right-0  text-white rounded-full">
                    <p className="-mt-1 p-1">{notificationsCount}</p>
                  </span>
                )}
              </Link> */}

              {/* Profile dropdown */}
              {constants.multiTenant ? (
                <MultiTentantProfileButton
                  profileMembership={profileMembership}
                  profile={profile}
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <NewProfileModal open={openNewPorfile} setOpen={setOpenNewProfile} />
    </>
  );
};

export const NewProfileModal = ({ open, setOpen }: any) => {
  const { data: session } = useSession();
  const [profileName, setProfileName] = useState<null | string>(null);

  const handleCreateProfile = async () => {
    if (!session.user.id && !profileName) {
      return toast.error("Por favor, ingrese un nombre para el negocio");
    }

    const payload = {
      id: Number(session?.user?.id),
      profileName: profileName,
      email: session?.user?.email,
    };

    await createProfile(payload).then(() => {
      toast.success("Negocio creado correctamente!");
      window.location.reload();
    });
  };

  return (
    <Transition show={open} afterLeave={() => setOpen("")} appear>
      <Dialog className="relative z-50" onClose={setOpen}>
        <TransitionChild
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity" />
        </TransitionChild>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto p-4 sm:p-6 md:p-20">
          <TransitionChild
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <DialogPanel className="mx-auto min-h-48 max-w-2xl transform divide-y divide-gray-500 divide-opacity-10 overflow-hidden rounded-xl bg-white bg-opacity-80 shadow-2xl ring-1 ring-black ring-opacity-5 backdrop-blur backdrop-filter transition-all">
              <div className=" divide-y pt-2 flex flex-col space-y-3 divide-gray-500 divide-opacity-10 px-3  ">
                <span className="mt-3 ">
                  <h3 className="text-subtitle">Nombre del nuevo negocio</h3>
                </span>
                <hr />
                <input
                  type="text"
                  onChange={(e) => setProfileName(e.target.value)}
                  className="input-text"
                  placeholder="Nombre del negocio"
                />

                <button className="btn-main" onClick={handleCreateProfile}>
                  Crear negocio
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
};

export default TenantAdminHeader;

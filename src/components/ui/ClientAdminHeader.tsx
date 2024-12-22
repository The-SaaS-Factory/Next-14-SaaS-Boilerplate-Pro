"use client";
import { useSidebarState } from "@/states/ui/sidebarState";
import useDarkTheme from "@/utils/hooks/useDarkTheme";
import Bars3Icon from "@heroicons/react/24/outline/Bars3Icon";
import Link from "next/link";
import { BellIcon } from "@heroicons/react/24/outline";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";

import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { useState } from "react";
import { LandingProfileButton } from "./commons/LandingProfileButton";
import { createOrganization } from "@/utils/facades/serverFacades/organizationFacade";

const ClientAdminHeader = ({
  notificationsCount,
}: {
  notificationsCount: number;
}) => {
  const { toggleSidebarMenu } = useSidebarState(({ toggleSidebarMenu }) => ({
    toggleSidebarMenu,
  }));

  const { darkThemeSelector } = useDarkTheme();

  return (
    <div>
      {" "}
      <div className="sticky top-0 z-40 lg:mx-auto">
        <div className="text-primary bg-main flex h-16 items-center gap-x-4 border-b border-gray-200 px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-0 lg:shadow-none">
          <button
            type="button"
            className="-m-2.5 p-2.5 lg:hidden"
            onClick={toggleSidebarMenu}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>

          {/* Separator */}
          <div className="bg-main h-6 w-px lg:hidden" aria-hidden="true" />

          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="relative flex-1 p-4">
              <div className="hidden space-x-3 lg:flex">
                <div></div>
              </div>
            </div>
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              <Link href="/sell-point" className="btn-main">
                <span>Punto de venta</span>
              </Link>
              {/* {isSuperAdmin && (
                <Link href="/admin" className="btn-main">
                  <span>Admin Panel</span>
                </Link>
              )} */}

              {darkThemeSelector}

              {/* Notification button */}
              <Link className="relative" href="/home/notifications">
                <BellIcon className="text h-6 w-6" aria-hidden="true" />
                {notificationsCount > 0 && (
                  <span className="-pt-7 absolute right-0 top-0 -mt-1 h-5 w-5 rounded-full bg-red-500 text-center text-white">
                    <p className="-mt-1 p-1">{notificationsCount}</p>
                  </span>
                )}
              </Link>

              {/* Separator */}
              <div
                className="lg:bg-main mr-3 hidden lg:block lg:h-6 lg:w-px"
                aria-hidden="true"
              />

              <LandingProfileButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const NewProfileModal = ({ open, setOpen }: any) => {
  const { data: session } = useSession();
  const [profileName, setProfileName] = useState<null | string>(null);

  const handleCreateProfile = async () => {
    if (!session.user.id && !profileName) {
      return toast.error("Por favor, ingrese un nombre para el agencia");
    }

    const payload = {
      id: Number(session?.user?.id),
      name: profileName,
      email: session?.user?.email,
    };

    await createOrganization(payload).then(() => {
      toast.success("Organization created!");
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
              <div className="flex flex-col space-y-3 divide-y divide-gray-500 divide-opacity-10 px-3 pt-2">
                <span className="mt-3">
                  <h3 className="text-subtitle">Nombre de la nueva agencia</h3>
                </span>
                <hr />
                <input
                  type="text"
                  onChange={(e) => setProfileName(e.target.value)}
                  className="input-text"
                  placeholder="Nombre del agencia"
                />

                <button className="btn-main" onClick={handleCreateProfile}>
                  Crear agencia
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ClientAdminHeader;

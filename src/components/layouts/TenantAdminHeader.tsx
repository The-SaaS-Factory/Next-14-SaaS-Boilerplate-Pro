"use client";
import useDarkTheme from "@/utils/hooks/useDarkTheme";
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
import SearchHeader, { SearchIcon } from "../ui/commons/SearchHeader";
import { constants } from "@/lib/constants";
import { MultiTentantProfileButton } from "../ui/commons/MultiTentantProfileButton";
import { IOrganization, IUserMembership } from "@/interfaces/saasTypes";
import { createOrganization } from "@/utils/facades/serverFacades/organizationFacade";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSidebar } from "../ui/sidebar";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Input } from "../ui/input";

const TenantAdminHeader = ({
  notificationsCount,
  organization,
  userMembership,
  organizations
}: {
  notificationsCount: number;
  organization: IOrganization;
  userMembership: IUserMembership;  
  organizations: IOrganization[];

}) => {
  const [open, setOpen] = useState(false);
  const { darkThemeSelector } = useDarkTheme();
  const [openNewPorfile, setOpenNewProfile] = useState(false);
  const { toggleSidebar } = useSidebar();
  const isSuperAdmin =
    organization.permissions
      .map((p) => p.name)
      .includes("superAdmin:totalAccess") ||
    userMembership.permissions
      .map((p) => p.name)
      .includes("superAdmin:administration:read");

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
              {isSuperAdmin && (
                <Link href="/admin" className="btn-main">
                  Super Admin Access
                </Link>
              )}
              <Link
                href="/home/help"
                className="text-primary hidden items-center gap-x-2 lg:flex"
              >
                Help
              </Link>

              {/* Separator */}
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

              {/* Profile dropdown */}
            
                <MultiTentantProfileButton
                  userMembership={userMembership}
                  organization={organization}
                  organizations={organizations}
                />
              
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
          <div className="fixed inset-0 bg-neutral-800/30 backdrop-blur-sm transition-opacity" />
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
            <DialogPanel className="bg-main mx-auto min-h-48 max-w-lg transform divide-y divide-gray-500 divide-opacity-10 overflow-hidden rounded-xl bg-opacity-80 shadow-2xl ring-1 ring-black ring-opacity-5 backdrop-blur backdrop-filter transition-all">
              <div className="flex flex-col space-y-3 divide-y divide-gray-500 divide-opacity-10 px-3 pt-2">
                <span className="mt-3">
                  <h3 className="text-subtitle">
                    New {constants.tanantModelName} name
                  </h3>
                </span>
                <hr />
                <Input
                  type="text"
                  onChange={(e) => setProfileName(e.target.value)}
                  className="input-text"
                  placeholder="Name"
                />

                <Button onClick={handleCreateProfile}>
                  Add {constants.tanantModelName}
                </Button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
};

export default TenantAdminHeader;

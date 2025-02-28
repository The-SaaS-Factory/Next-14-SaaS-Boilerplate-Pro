"use client";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { classNames } from "@/utils/facades/frontendFacades/strFacade";
import { useState } from "react";
import { updateUserProfileActive } from "@/actions/admin/userModule/update-profile-active";
import { ChevronDownIcon, UsersIcon } from "@heroicons/react/24/outline";
import { signOut } from "next-auth/react";
import { NewProfileModal } from "../../layouts/TenantAdminHeader";
import Image from "next/image";
import Link from "next/link";
import { constants } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { LogOut, SettingsIcon, User } from "lucide-react";
import { IOrganization, IUserMembership } from "@/interfaces/saasTypes";
import { isOrganizationAdmin } from "@/utils/facades/serverFacades/securityFacade";
import { Badge } from "@/components/ui/badge";
export const MultiTentantProfileButton = ({
  organization,
  userMembership,
  organizations,
}: {
  userMembership: IUserMembership;
  organization: IOrganization;
  organizations: IOrganization[];
}) => {
  const [openNewProfile, setOpenNewProfile] = useState(false);

  const handleChangeProfile = async (organizationId: number) => {
    await updateUserProfileActive(organizationId).then(() => {
      window.location.reload();
    });
  };

  return (
    <div className="pr-7">
      <Menu as="div" className="relative">
        <MenuButton className="-m-1.5 flex items-center p-1.5">
          <span className="sr-only">Open user menu</span>
          <Image
            width={32}
            height={32}
            className="h-8 w-8 rounded-full bg-gray-50"
            src={organization?.avatar ?? "/assets/img/avatar.png"}
            alt=""
          />
          <span className="relative hidden space-x-1 lg:flex lg:items-center">
            <span
              className="text-primary ml-4 text-sm font-semibold leading-6"
              aria-hidden="true"
            >
              {organization?.name}
            </span>
            {organization.subscription && (
              <Badge> {organization.subscription?.plan?.name}</Badge>
            )}
            <ChevronDownIcon
              className="ml-2 h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </span>
        </MenuButton>
        <Transition
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <MenuItems className="bg-main absolute right-0 z-10 mt-2.5 w-64 origin-top-right rounded-md py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
            <div className="flex flex-col space-y-2 px-3">
              {isOrganizationAdmin(userMembership) && (
                <>
                  <MenuItem>
                    {() => (
                      <div className="bg-main-hover flex w-full justify-start px-2 py-2">
                        <UsersIcon className="text h-6 w-6" />
                        <Link
                          href={"/home/settings/organization/members"}
                          className={classNames("text block px-3 leading-6")}
                        >
                          Members
                        </Link>
                      </div>
                    )}
                  </MenuItem>
                  <MenuItem>
                    {() => (
                      <div className="bg-main-hover flex w-full justify-start px-2 py-2">
                        <SettingsIcon className="text h-6 w-6" />
                        <Link
                          href={"/home/settings/organization/settings"}
                          className={classNames("text block px-3 leading-6")}
                        >
                          {constants.tanantModelName} settings
                        </Link>
                      </div>
                    )}
                  </MenuItem>
                  {constants.multiTenant && (
                    <Link href={"/home/settings/billing/buyPlan"}>
                      <Button variant="secondary" className="w-full">
                        Upgrade
                        <span className="relative ml-3 flex h-3 w-3">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
                          <span className="relative inline-flex h-3 w-3 rounded-full bg-sky-500"></span>
                        </span>
                      </Button>
                    </Link>
                  )}
                  <hr />
                </>
              )}
              <MenuItem>
                {() => (
                  <div className="bg-main-hover flex w-full justify-start px-2 py-2">
                    <User className="text h-6 w-6" />
                    <Link
                      href={"/home/settings/profile"}
                      className={classNames("text block px-3 leading-6")}
                    >
                      Account settings
                    </Link>
                  </div>
                )}
              </MenuItem>
              <MenuItem>
                {() => (
                  <div className="bg-main-hover flex w-full justify-start px-2 py-2">
                    <LogOut className="text h-6 w-6" />
                    <button
                      className={classNames(
                        "bg-main-hover text-primary w-full px-3 text-left leading-6",
                      )}
                      onClick={() => signOut()}
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </MenuItem>

              <hr />
              {constants.multiTenant && (
                <div>
                  <div className="p-3">
                    <span>Change {constants.tanantModelName}</span>
                  </div>
                  <div className="px-3">
                    {organizations?.map((org) => (
                      <MenuItem key={org.id}>
                        <button
                          onClick={() => handleChangeProfile(org.id)}
                          className="hover:bg-main-hover flex items-center space-x-3 p-3 hover:scale-100"
                        >
                          <Image
                            width={32}
                            height={32}
                            className="h-8 w-8 rounded-full bg-gray-50"
                            src={org?.avatar ?? "/assets/img/avatar.png"}
                            alt=""
                          />

                          <span className="truncate">{org?.name}</span>
                        </button>
                      </MenuItem>
                    ))}
                  </div>
                  <hr />
                  <div className="p-3">
                    <Button
                      onClick={() => setOpenNewProfile(true)}
                      className="w-full"
                    >
                      New {constants.tanantModelName}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </MenuItems>
        </Transition>
      </Menu>

      <NewProfileModal open={openNewProfile} setOpen={setOpenNewProfile} />
    </div>
  );
};

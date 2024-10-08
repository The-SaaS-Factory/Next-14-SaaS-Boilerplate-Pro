"use client";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { classNames } from "@/utils/facades/serverFacades/strFacade";
import { useCallback, useEffect, useState } from "react";
import { updateUserProfileActive } from "@/actions/admin/userModule/update-profile-active";
import { getUserAllOrganizations } from "@/actions/admin/userModule/get-user-all-profiles";
import { ChevronDownIcon, UsersIcon } from "@heroicons/react/24/outline";
import { signOut } from "next-auth/react";
import { NewProfileModal } from "../TenantAdminHeader";
import Image from "next/image";
import Link from "next/link";
import { constants } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { LogOut, SettingsIcon, User } from "lucide-react";
import { IOrganization, IUserMembership } from "@/interfaces/saasTypes";
import { isOrganizationAdmin } from "@/utils/facades/serverFacades/securityFacade";
import { Badge } from "@/app/components/ui/badge";
export const MultiTentantProfileButton = ({
  organization,
  userMembership,
}: {
  userMembership: IUserMembership;
  organization: IOrganization;
}) => {
  const [organizations, setOrganizations] = useState<any[]>([]);
  const [openNewProfile, setOpenNewProfile] = useState(false);

  const getAllUserOrganizations = useCallback(async () => {
    const profiles = await getUserAllOrganizations();
    setOrganizations(profiles);
  }, []);

  useEffect(() => {
    getAllUserOrganizations();
  }, []);

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
          <span className="hidden lg:flex space-x-1 relative lg:items-center">
            <span
              className="ml-4 text-sm font-semibold leading-6 text-primary "
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
          <MenuItems className="absolute  right-0 z-10 mt-2.5 w-64 origin-top-right rounded-md bg-main py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none ">
            <div className="flex flex-col px-3 space-y-2">
              {isOrganizationAdmin(userMembership) && (
                <>
                  <MenuItem>
                    {() => (
                      <div className="flex px-2  bg-main-hover  w-full py-2 justify-start">
                        <UsersIcon className="w-6 h-6  text" />
                        <Link
                          href={"/home/settings/organization/members"}
                          className={classNames("block px-3  leading-6 text")}
                        >
                          Members
                        </Link>
                      </div>
                    )}
                  </MenuItem>
                  <MenuItem>
                    {() => (
                      <div className="flex px-2  bg-main-hover  w-full py-2 justify-start">
                        <SettingsIcon className="w-6 h-6  text" />
                        <Link
                          href={"/home/settings/organization/settings"}
                          className={classNames("block px-3  leading-6 text")}
                        >
                          {constants.tanantModelName} settings
                        </Link>
                      </div>
                    )}
                  </MenuItem>
                  <Link
                    href={"http://localhost:3000/home/settings/billing/buyPlan"}
                  >
                    <Button variant="secondary" className="w-full">
                      Upgrade
                      <span className="relative ml-3 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
                      </span>
                    </Button>
                  </Link>
                  <hr />
                </>
              )}
              <MenuItem>
                {() => (
                  <div className="flex px-2  bg-main-hover  w-full py-2 justify-start">
                    <User className="w-6 h-6  text" />
                    <Link
                      href={"/home/settings/profile"}
                      className={classNames("block px-3  leading-6 text")}
                    >
                      Profile settings
                    </Link>
                  </div>
                )}
              </MenuItem>
              <MenuItem>
                {() => (
                  <div className="flex px-2  bg-main-hover  w-full py-2 justify-start">
                    <LogOut className="w-6 h-6  text" />
                    <button
                      className={classNames(
                        " bg-main-hover px-3   leading-6 text-primary text-left w-full"
                      )}
                      onClick={() => signOut()}
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </MenuItem>

              <hr />

              <div className="p-3">
                <span>Change {constants.tanantModelName}</span>
              </div>
              <div className="px-3">
                {organizations.map((org) => (
                  <MenuItem key={org.id}>
                    <button
                      onClick={() => handleChangeProfile(org.id)}
                      className="flex hover:bg-main-hover hover:scale-100 p-3 items-center space-x-3"
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
                  className=" w-full"
                >
                  New {constants.tanantModelName}
                </Button>
              </div>
            </div>
          </MenuItems>
        </Transition>
      </Menu>

      <NewProfileModal open={openNewProfile} setOpen={setOpenNewProfile} />
    </div>
  );
};

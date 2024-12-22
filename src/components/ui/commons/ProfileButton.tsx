"use client";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { classNames } from "@/utils/facades/frontendFacades/strFacade";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { ChevronDownIcon, LogOut } from "lucide-react";
import { IUserMembership } from "@/interfaces/saasTypes";

export const ProfileButton = ({
  userMembership,
}: {
  userMembership: IUserMembership;
}) => {
  return (
    <div className="pr-7">
      <Menu as="div" className="relative">
        <MenuButton className="-m-1.5 flex items-center p-1.5">
          <span className="sr-only">Open user menu</span>
          <Image
            width={32}
            height={32}
            className="h-8 w-8 rounded-full bg-gray-50"
            src={userMembership?.user?.avatar ?? "/assets/img/avatar.png"}
            alt=""
          />
          <span className="relative hidden space-x-1 lg:flex lg:items-center">
            <span
              className="text-primary ml-4 text-sm font-semibold leading-6"
              aria-hidden="true"
            >
              {userMembership?.user?.name}
            </span>

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
            </div>
          </MenuItems>
        </Transition>
      </Menu>
    </div>
  );
};

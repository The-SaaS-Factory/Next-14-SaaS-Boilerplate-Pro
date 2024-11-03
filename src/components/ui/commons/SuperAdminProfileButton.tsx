"use client";
import { Menu, MenuButton, MenuItems, Transition } from "@headlessui/react";
import { classNames } from "@/utils/facades/frontendFacades/strFacade";
import {
  ArrowRightStartOnRectangleIcon,
  ChevronDownIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export const SuperAdminProfileButton = () => {
  const { data: session } = useSession();

  return (
    <div className="pr-7 ">
      <Menu as="div" className="  ">
        <MenuButton className="-m-1.5 flex items-center p-1.5">
          <span className="sr-only">Open user menu</span>
          <Image
            width={32}
            height={32}
            className="h-8 w-8 rounded-full bg-gray-50"
            src={session?.user?.avatar ?? "/assets/img/avatar.png"}
            alt=""
          />
          <span className="hidden lg:flex lg:items-center">
            <span
              className="ml-4 text-sm font-semibold leading-6 text-primary"
              aria-hidden="true"
            >
              {session?.user?.name}
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
          <MenuItems className="absolute right-0 z-50 mt-2.5 w-48 origin-top-right rounded-md bg-main py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none space-y-3">
            <>
              <Link
                href={"/home/settings/profile"}
                className={classNames(
                  "  bg-main-hover flex space-x-3 items-center  px-3 py-1 hover:bg-main text-sm leading-6 text"
                )}
              >
                <UserIcon className="w-5 h-5" />
                <span> Settings del perfil</span>
              </Link>

              <button
                className={classNames(
                  " bg-main-hover flex space-x-3 items-center px-3 py-1 text-sm leading-6 text-primary text-left w-full"
                )}
                onClick={() =>
                  signOut({
                    callbackUrl: "/",
                  })
                }
              >
                <ArrowRightStartOnRectangleIcon className="w-5 h-5" />
                <span>Cerrar sessión</span>
              </button>
            </>
          </MenuItems>
        </Transition>
      </Menu>
    </div>
  );
};

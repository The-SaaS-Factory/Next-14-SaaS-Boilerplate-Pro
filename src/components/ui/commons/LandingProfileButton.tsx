"use client";
import { Menu, MenuButton, MenuItems, Transition } from "@headlessui/react";
import { classNames } from "@/utils/facades/frontendFacades/strFacade";
import {
  ArrowRightStartOnRectangleIcon,
  ChevronDownIcon,
  ClipboardDocumentIcon,
  HeartIcon,
  UserIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export const LandingProfileButton = () => {
  const { data: session } = useSession();

  return (
    <div className="pr-7">
      <Menu as="div" className=" ">
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
              className="text-primary ml-4 text-sm font-semibold leading-6"
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
          <MenuItems className="bg-main absolute right-0 z-50 mt-2.5 w-48 origin-top-right space-y-3 rounded-md py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
            <>
              <Link
                href={"/home/orders/actives"}
                className={classNames(
                  "bg-main-hover hover:bg-main text flex items-center space-x-3 px-3 py-1 text-sm leading-6",
                )}
              >
                <ClipboardDocumentIcon className="h-5 w-5" />
                <span> Mis pedidos</span>
              </Link>

              <Link
                href={"/home/settings/profile"}
                className={classNames(
                  "bg-main-hover hover:bg-main text flex items-center space-x-3 px-3 py-1 text-sm leading-6",
                )}
              >
                <UserIcon className="h-5 w-5" />
                <span> Settings del perfil</span>
              </Link>

              <Link
                href={"/home/contacts"}
                className={classNames(
                  "bg-main-hover hover:bg-main text flex items-center space-x-3 px-3 py-1 text-sm leading-6",
                )}
              >
                <UsersIcon className="h-5 w-5" />
                <span>Mis contactos</span>
              </Link>

              <Link
                href={"/home/favorites"}
                className={classNames(
                  "bg-main-hover hover:bg-main text flex items-center space-x-3 px-3 py-1 text-sm leading-6",
                )}
              >
                <HeartIcon className="h-5 w-5" />
                <span>Mis favoritos</span>
              </Link>
              <button
                className={classNames(
                  "bg-main-hover text-primary flex w-full items-center space-x-3 px-3 py-1 text-left text-sm leading-6",
                )}
                onClick={() =>
                  signOut({
                    callbackUrl: "/",
                  })
                }
              >
                <ArrowRightStartOnRectangleIcon className="h-5 w-5" />
                <span>Cerrar sessión</span>
              </button>
            </>
          </MenuItems>
        </Transition>
      </Menu>
    </div>
  );
};

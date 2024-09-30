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
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { signOut } from "next-auth/react";
import { NewProfileModal } from "../TenantAdminHeader";
import Image from "next/image";
import Link from "next/link";

export const MultiTentantProfileButton = ({
  organization,
  userMembership,
}: any) => {
  const [organizations, setOrganizations] = useState<any[]>([]);
  const [openNewPorfile, setOpenNewProfile] = useState(false);

  const getAllUserOrganizations = useCallback(async () => {
    const profiles = await getUserAllOrganizations();
    setOrganizations(profiles);
  }, []);

  useEffect(() => {
    getAllUserOrganizations();
  }, [getAllUserOrganizations]);

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
          <span className="hidden lg:flex lg:items-center">
            <span
              className="ml-4 text-sm font-semibold leading-6 text-gray-900"
              aria-hidden="true"
            >
              {userMembership?.name || organization?.name}
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
          <MenuItems className="absolute right-0 z-10 mt-2.5 w-48 origin-top-right rounded-md bg-main py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none space-y-3">
            <>
              <MenuItem>
                {() => (
                  <a
                    href={"/home/settings/profile"}
                    className={classNames(
                      "block px-3 py-1 hover:bg-main text-sm leading-6 text"
                    )}
                  >
                    Ajustes del perfil
                  </a>
                )}
              </MenuItem>

              <MenuItem>
                {() => (
                  <Link
                    href={"/home/admin/configuraciones"}
                    className={classNames(
                      "block px-3 py-1 hover:bg-main text-sm leading-6 text"
                    )}
                  >
                    Ajustes de la Agencia
                  </Link>
                )}
              </MenuItem>

              <button
                className={classNames(
                  " bg-main-hover px-3 py-1 text-sm leading-6 text text-left w-full"
                )}
                onClick={() => signOut()}
              >
                Cerrar sessión
              </button>
              <hr />

              <div className="p-3">
                <span>Cambiar de agencia</span>
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
                <button
                  onClick={() => setOpenNewProfile(true)}
                  className="btn-main w-full"
                >
                  Nuevo agencia
                </button>
              </div>
            </>
          </MenuItems>
        </Transition>
      </Menu>

      <NewProfileModal open={openNewPorfile} setOpen={setOpenNewProfile} />
    </div>
  );
};

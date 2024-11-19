"use client";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/app/components/ui/popover";
import { useState } from "react";
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import {
  Bars3Icon,
  BuildingStorefrontIcon,
  NumberedListIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import Image from "next/image";
import { constants } from "@/lib/constants";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { LifeBuoyIcon } from "lucide-react";

const community = [
  {
    name: "Marketplace",
    description: "SaaS Marketplace",
    href: "/marketplace",
    icon: BuildingStorefrontIcon,
  },
  {
    name: "Directory",
    description: "SaaS Directory",
    href: "/directory",
    icon: NumberedListIcon,
  },
];

const resources = [
  {
    name: "Boilerplates",
    description: "SaaS Boilerplates",
    href: "/boilerplates",
    icon: LifeBuoyIcon,
  },
  // {
  //   name: "The Factory",
  //   description: "SaaS Factory",
  //   href: "/home/admin/factory/dashboard",
  //   icon: Factory,
  // },
];

// const callsToAction = [
//   { name: "Watch demo", href: "#", icon: PlayCircleIcon },
//   { name: "Contact sales", href: "#", icon: PhoneIcon },
// ];

export default function HeaderLanding() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [openPopover, setOpenPopover] = useState(null);
  const closePopover = () => setOpenPopover(null);

  const handleOpenChange = (popoverName) => {
    setOpenPopover((current) => (current === popoverName ? null : popoverName));
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-blue-200/10 backdrop-blur-md">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl space-x-7 items-center justify-between px-6 py-2 lg:px-8"
      >
        <div className="flex lg:flex-1">
          <Link href="/">
            <Image
              src={"/assets/img/logo-thesaasfactory.dev.png"}
              width={80}
              height={40}
              className="h-10 w-auto"
              alt={constants.appName}
            />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>
        <Popover
          open={openPopover === "community"}
          onOpenChange={() => handleOpenChange("community")}
        >
          <PopoverTrigger className="flex items-center gap-x-1 text-sm font-semibold text-gray-900">
            Community
            <ChevronDownIcon
              aria-hidden="true"
              className="w-5 h-5 flex-none text-gray-400"
            />
          </PopoverTrigger>
          <PopoverContent className="w-screen max-w-md p-4 rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
            {community.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={closePopover}
                className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm hover:bg-gray-50"
              >
                <div className="flex w-11 h-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                  <item.icon
                    aria-hidden="true"
                    className="w-6 h-6 text-gray-600 group-hover:text-indigo-600"
                  />
                </div>
                <div className="flex-auto">
                  <span>{item.name}</span>
                  <p className="mt-1 text-gray-600">{item.description}</p>
                </div>
              </Link>
            ))}
          </PopoverContent>
        </Popover>

        {/* Resources Popover */}
        <Popover
          open={openPopover === "resources"}
          onOpenChange={() => handleOpenChange("resources")}
        >
          <PopoverTrigger className="flex items-center gap-x-1 text-sm font-semibold text-gray-900">
            Resources
            <ChevronDownIcon
              aria-hidden="true"
              className="w-5 h-5 flex-none text-gray-400"
            />
          </PopoverTrigger>
          <PopoverContent className="w-screen max-w-md p-4 rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
            {resources.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={closePopover}
                className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm hover:bg-gray-50"
              >
                <div className="flex w-11 h-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                  <item.icon
                    aria-hidden="true"
                    className="w-6 h-6 text-gray-600 group-hover:text-indigo-600"
                  />
                </div>
                <div className="flex-auto">
                  <span>{item.name}</span>
                  <p className="mt-1 text-gray-600">{item.description}</p>
                </div>
              </Link>
            ))}
          </PopoverContent>
        </Popover>

        <Link
          href="/home/admin/factory/dashboard"
          className="text-sm font-semibold text-gray-900"
        >
          The Factory
        </Link>
        <Link
          href="/home/admin/services"
          className="text-sm font-semibold text-gray-900"
        >
          Services
        </Link>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <LoginSection setMobileMenuOpen={setMobileMenuOpen} />
        </div>
      </nav>
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden relative z-50 "
      >
        <div className="fixed  " />
        <DialogPanel
          className="fixed inset-y-0 right-0  w-full overflow-y-auto
         bg-blue-200/10 backdrop-blur-md px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10"
        >
          <div className="flex items-center justify-between">
            <span className="sr-only">{constants.appName}</span>
            <Link href="/">
              <Image
                src={"/assets/img/logo-thesaasfactory.dev.png"}
                width={80}
                height={40}
                className="h-10 w-auto"
                alt={constants.appName}
              />
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Disclosure as="div" className="-mx-3">
                  <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">
                    Community
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="size-5 flex-none group-data-[open]:rotate-180"
                    />
                  </DisclosureButton>
                  <DisclosurePanel className="mt-2 space-y-2">
                    {[...community].map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="flex items-center space-x-3 rounded-lg py-2 pl-6 pr-3 text-sm/7 font-semibold text-gray-900 hover:bg-gray-50"
                      >
                        {
                          <item.icon
                            className="
                        flex-none  size-6 text-gray-600 group-hover:text-indigo-600
                        "
                          />
                        }
                        <span>{item.name}</span>
                      </Link>
                    ))}
                  </DisclosurePanel>
                </Disclosure>
                <Disclosure as="div" className="-mx-3">
                  <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">
                    Resources
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="size-5 flex-none group-data-[open]:rotate-180"
                    />
                  </DisclosureButton>
                  <DisclosurePanel className="mt-2 space-y-2">
                    {[...resources].map((item) => (
                      <DisclosureButton
                        key={item.name}
                        as="a"
                        href={item.href}
                        className="flex items-center space-x-3 rounded-lg py-2 pl-6 pr-3 text-sm/7 font-semibold text-gray-900 hover:bg-gray-50"
                      >
                        {
                          <item.icon className=" flex-none  size-6 text-gray-600 group-hover:text-indigo-600 " />
                        }
                        <span>{item.name}</span>
                      </DisclosureButton>
                    ))}
                  </DisclosurePanel>
                </Disclosure>
                <Link
                  href="/home/admin/factory/dashboard"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  The Factory
                </Link>
                <Link
                  href="/home/admin/services"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  Services
                </Link>
                {/*  <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  Marketplace
                </a>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  Company
                </a> */}
              </div>
              <div className="py-6">
                <LoginSection setMobileMenuOpen={setMobileMenuOpen} />
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}

const LoginSection = ({ setMobileMenuOpen }: { setMobileMenuOpen: any }) => {
  const session = useSession();

  const closeMenu = () => {
    setMobileMenuOpen(false);
  };
  return (
    <>
      {session.status === "authenticated" ? (
        <Link
          href="/home"
          className="hover:text-gray-300 rounded-full text-gray-50"
          onClick={closeMenu}
        >
          <Image
            width={32}
            height={32}
            className="h-8 w-8 rounded-full bg-gray-50"
            src={"/assets/img/avatar.png"}
            alt=""
          />
        </Link>
      ) : (
        <>
          {session.status !== "loading" && (
            <>
              <Link href={"/login"} onClick={closeMenu}>
                <Button variant="outline">Log in</Button>
              </Link>
              <Link href={"/login"} onClick={closeMenu}>
                <Button>Sing Up</Button>
              </Link>
            </>
          )}
        </>
      )}
    </>
  );
};

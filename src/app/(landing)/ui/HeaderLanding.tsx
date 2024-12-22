"use client";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { constants } from "@/lib/constants";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { saasFeatures } from "../../../lib/constants";

export const HeaderLanding = () => {
  const [isOpen, setIsOpen] = useState(false);
  const session = useSession();
  const closeMenu = () => {
    setIsOpen(false);
  };

  const MenuItemsPC = () => (
    <>
      <Link
        href="/#"
        className="font-semibold text-gray-500 hover:text-gray-700"
        onClick={closeMenu}
      >
        Link 1
      </Link>
      {saasFeatures.blogMdx && (
        <Link
          href="/blog"
          className="font-semibold text-gray-500 hover:text-gray-700"
          onClick={closeMenu}
        >
          Blog
        </Link>
      )}
      <Link
        href="/#prices"
        onClick={closeMenu}
        className="font-semibold text-gray-500 hover:text-gray-700"
      >
        Prices
      </Link>
      {session.status === "authenticated" ? (
        <Link
          href="/home"
          className="rounded-full text-gray-50 hover:text-gray-300"
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
              <Link href={"/login"}>
                <Button variant="outline">Log in</Button>
              </Link>
              <Link href={"/login"}>
                <Button>Sing Up</Button>
              </Link>
            </>
          )}
        </>
      )}
    </>
  );

  return (
    <header className="fixed left-0 right-0 top-0 z-50 bg-blue-200/10 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link href="/" className="">
          <span className="font-bold">{constants.appName}</span>
        </Link>
        <nav className="hidden items-center space-x-4 md:flex">
          <MenuItemsPC />
        </nav>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button size="icon" className="text-white">
              <Menu className="h-6 w-6 text-white" />
              <span className="sr-only">Abrir menú</span>
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-[300px] bg-black/50 backdrop-blur-md sm:w-[400px]"
          >
            <SheetClose>
              <Button size="icon" className="absolute right-4 top-4 text-white">
                <X className="h-6 w-6" />
                <span className="sr-only">Cerrar menú</span>
              </Button>
            </SheetClose>
            <nav className="mt-8 flex flex-col space-y-4">
              <MenuItemsPC />
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

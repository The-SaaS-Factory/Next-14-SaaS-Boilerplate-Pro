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
        className="hover:text-gray-700 text-gray-500 font-semibold"
        onClick={closeMenu}
      >
        Link 1
      </Link>
      <Link
        href="/#prices"
        onClick={closeMenu}
        className="hover:text-gray-700 text-gray-500 font-semibold"
      >
        Prices
      </Link>
      {session.status === "authenticated" ? (
        <Link
          href="/home"
          className="hover:text-gray-300 rounded-full text-gray-50"
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
    <header className="fixed   top-0 left-0 right-0 z-50 bg-blue-200/10  backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="">
          <span className="font-bold">{constants.appName}</span>
        </Link>
        <nav className=" hidden md:flex space-x-4 items-center">
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
            className="w-[300px] sm:w-[400px] bg-black/50 backdrop-blur-md "
          >
            <SheetClose>
              <Button size="icon" className="absolute top-4 right-4 text-white">
                <X className="h-6 w-6" />
                <span className="sr-only">Cerrar menú</span>
              </Button>
            </SheetClose>
            <nav className="flex flex-col space-y-4 mt-8">
              <MenuItemsPC />
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

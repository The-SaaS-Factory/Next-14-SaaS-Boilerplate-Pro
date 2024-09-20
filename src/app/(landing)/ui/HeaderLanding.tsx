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

export const HeaderLanding = () => {
  const [isOpen, setIsOpen] = useState(false);

  const MenuItemsPC = () => (
    <>
      <Link href="/link1" className="hover:text-gray-300 text-gray-50">
        Link 1
      </Link>
      <Link href="/prices" className="hover:text-gray-300 text-gray-50">
        Prices
      </Link>
      <Link href={"/login"}>
        <Button variant="outline">Iniciar Sesión</Button>
      </Link>
      <Link href={"/login"}>
        <Button>Registrarse</Button>
      </Link>
    </>
  );

  return (
    <header className="fixed   top-0 left-0 right-0 z-50 bg-black/10 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="">
          <span>{constants.appName}</span>
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

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

export const HeaderLanding = () => {
  const [isOpen, setIsOpen] = useState(false);

  const MenuItemsPC = () => (
    <>
      <Link href="/castings" className="hover:text-gray-300 text-gray-50">
        Castings
      </Link>
      <Link href="/models" className="hover:text-gray-300 text-gray-50">
        Modelos
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
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="">
          <img
            src="/assets/img/Nvar-logo-black.png"
            alt="Logo oscuro"
            className="hidden dark:block h-12"
          />
          <img
            src="/assets/img/Nvar-logo-white.png"
            alt="Logo claro"
            className="block dark:hidden h-12"
          />
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

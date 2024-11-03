import { HomeIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";

export const clientNavigation = [
  {
    sectionName: "General",
    items: [
      { name: "Dashboard", href: "/home", icon: HomeIcon, current: true },
    ],
  },
  {
    sectionName: "Examples",
    items: [
      {
        name: "Example 1",
        href: "/home/services",
        icon: ShoppingBagIcon,
        current: false,
      },
    ],
  },
];

import { ReactNode } from "react";
import FloatingWhatsAppButton from "../core/FloatingWhatsAppButton";

export default async function ClientLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <main className="relative text-primary">
      <div className="lg:pl-72 h-screen overflow-y-auto relative bg-main">
        <div className="py-3  ">
          <div className="mx-auto   px-4  ">{children}</div>
        </div>
      </div>{" "}
      <FloatingWhatsAppButton />
    </main>
  );
}

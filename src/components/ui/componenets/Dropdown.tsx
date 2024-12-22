import { Menu, MenuButton, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { ReactNode } from "react";

interface Props {
  label?: string;
  className?: string;
  children?: ReactNode;
  variant?: "default" | "ghost";
}

const variants = {
  default:
    "inline-flex w-full items-center justify-start whitespace-nowrap gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-primary shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50",
  ghost:
    "inline-flex w-full items-center justify-start whitespace-nowrap gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold text-primary hover:bg-gray-50/40 dark:text-white dark:hover:bg-gray-50/10",
};

export default function Dropdown({
  children,
  className,
  label,
  variant = "default",
}: Props) {
  return (
    <Menu as="div" className={`relative inline-block text-left ${className}`}>
      <div>
        <MenuButton className={`${variants[variant]}`}>
          {label || "Options"}
          <ChevronDownIcon
            aria-hidden="true"
            className="-mr-1 h-5 w-5 text-gray-400"
          />
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in dark:bg-gray-900 dark:text-white"
      >
        <div className="py-1">{children}</div>
      </MenuItems>
    </Menu>
  );
}

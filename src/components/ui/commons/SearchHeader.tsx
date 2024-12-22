import { useNavigation } from "@/components/layouts/useNavigation";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import clsx from "clsx";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import HighlightText from "./HightlightText";

interface Item {
  name: string;
  href: string;
  groupName: string;
}

export function SearchIcon(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12.01 12a4.25 4.25 0 1 0-6.02-6 4.25 4.25 0 0 0 6.02 6Zm0 0 3.24 3.25"
      />
    </svg>
  );
}
export default function SearchHeader({
  open,
  setOpen,
  // agencyPermissions,
  // membershipPermissions,
}: {
  open: boolean;
  // agencyPermissions: string[];
  // membershipPermissions: string[];
  // eslint-disable-next-line no-unused-vars
  setOpen: (open: boolean) => void;
}) {
  let inputRef = useRef<any>(null);
  const [query, setQuery] = useState("");

  const { tenantNavigation } = useNavigation();
  const allItems: Item[] = tenantNavigation.flatMap((group) =>
    group.items.map((item) => ({
      ...item,
      groupName: group.sectionName,
    })),
  );

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === "k") {
        event.preventDefault();
        setQuery("");
        setOpen(true);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [setOpen]);

  return (
    <Transition show={open} appear>
      <Dialog className="relative z-50" onClose={setOpen}>
        <TransitionChild
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-white/30 bg-opacity-25 backdrop-blur-sm transition-opacity" />
        </TransitionChild>

        <div className="fixed inset-0 z-10 w-screen overflow-hidden p-4 sm:p-6 md:p-20">
          <TransitionChild
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <DialogPanel className="bg-main mx-auto max-w-xl transform divide-y divide-gray-100 overflow-hidden rounded-xl shadow-2xl transition-all dark:divide-gray-700/40">
              <div className="group relative flex h-12">
                <SearchIcon className="pointer-events-none absolute left-3 top-0 h-full w-5 stroke-zinc-500" />
                <input
                  ref={inputRef}
                  data-autofocus
                  className={clsx(
                    "bg-main flex-auto appearance-none pl-10 text-zinc-900 outline-none placeholder:text-zinc-500 focus:w-full focus:flex-none dark:text-white sm:text-sm [&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden [&::-webkit-search-results-button]:hidden [&::-webkit-search-results-decoration]:hidden",
                    "pr-4",
                  )}
                  value={query}
                  onChange={(ev) => setQuery(ev.currentTarget.value)}
                  placeholder=" Search page or funcionality"
                  onKeyDown={(event) => {
                    if (event.key === "Escape") {
                      setOpen(false);
                      setQuery("");
                    }
                  }}
                />
              </div>
              <div className="flex h-fit flex-col gap-2 overflow-y-auto">
                {query !== "" &&
                  allItems
                    .filter((item) =>
                      item.name.toLowerCase().includes(query.toLowerCase()),
                    )
                    .slice(0, 5)
                    .map((item) => (
                      <Link
                        onClick={() => {
                          setOpen(false);
                          setQuery("");
                        }}
                        className="bg-main flex flex-col gap-0.5 border-b border-gray-200 p-4 hover:bg-gray-50/10 dark:border-gray-700 dark:bg-gray-100/10 dark:text-white"
                        key={`search-${item.href}`}
                        href={item.href}
                      >
                        <HighlightText
                          className={"text-sm"}
                          highlight={query}
                          text={item.name}
                        ></HighlightText>
                        <span className="text-xs text-gray-400">
                          {item.groupName}
                        </span>
                      </Link>
                    ))}
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
}

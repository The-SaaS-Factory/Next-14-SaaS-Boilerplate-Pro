import { useNavigation } from "@/components/layouts/useNavigation";
import { Dialog, Transition } from "@headlessui/react";
import clsx from "clsx";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import HighlightText from "../componenets/HightlightText";

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
}: {
  open: boolean;
  // eslint-disable-next-line no-unused-vars
  setOpen: (open: boolean) => void;
}) {
  let inputRef = useRef<any>(null);
  const [query, setQuery] = useState("");

  const { adminNavigation } = useNavigation();
  const allItems: Item[] = adminNavigation.flatMap((group) =>
    group.items.map((item) => ({
      ...item,
      groupName: group.sectionName,
    }))
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
        <Transition
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 backdrop-blur-sm bg-white/30 bg-opacity-25 transition-opacity" />
        </Transition>

        <div className="fixed inset-0 z-10 w-screen overflow-hidden p-4 sm:p-6 md:p-20">
          <Transition
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="mx-auto bg-main max-w-xl transform divide-y divide-gray-100 dark:divide-gray-700/40 overflow-hidden rounded-xl  shadow-2xl transition-all">
              <div className="group relative flex h-12">
                <SearchIcon
                  className="pointer-events-none
                 absolute left-3 top-0 h-full w-5 stroke-zinc-500"
                />
                <input
                  ref={inputRef}
                  data-autofocus
                  className={clsx(
                    "flex-auto appearance-none bg-main pl-10 text-zinc-900 border-hidden outline-none placeholder:text-zinc-500 focus:w-full focus:flex-none sm:text-sm dark:text-white [&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden [&::-webkit-search-results-button]:hidden [&::-webkit-search-results-decoration]:hidden",
                    "pr-4"
                  )}
                  value={query}
                  onChange={(ev) => setQuery(ev.currentTarget.value)}
                  placeholder="Encontre algo para si"
                  onKeyDown={(event) => {
                    if (event.key === "Escape") {
                      setOpen(false);
                      setQuery("");
                    }
                  }}
                />
              </div>
              <div className="flex flex-col gap-2 h-fit overflow-y-auto">
                {query !== "" &&
                  allItems
                    .filter((item) =>
                      item.name.toLowerCase().includes(query.toLowerCase())
                    )
                    .slice(0, 5)
                    .map((item) => (
                      <Link
                        onClick={() => {
                          setOpen(false);
                          setQuery("");
                        }}
                        className="flex  bg-main flex-col gap-0.5 dark:text-white p-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50/10 dark:bg-gray-100/10 hover:text-blue-600 dark:bg-gray-700 first:text-blue-600 dark:first:text-blue-500"
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
            </Dialog.Panel>
          </Transition>
        </div>
      </Dialog>
    </Transition>
  );
}

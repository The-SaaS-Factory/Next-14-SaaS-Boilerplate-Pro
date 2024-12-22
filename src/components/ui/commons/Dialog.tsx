"use client";

import { ReactNode, useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { EyeIcon, XMarkIcon } from "@heroicons/react/24/outline";

interface Props {
  children?: ReactNode;
  label?: string;
  style?: "link" | "button";
  size?: "max" | "fit";
  title?: string;
}

export const CustomDialog = ({
  label,
  children,
  size = "max",
  style = "link",
  title,
}: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className={`${
          style === "link" ? "text-link" : "btn-main"
        } flex items-center gap-2 text-center`}
        onClick={() => setOpen(true)}
      >
        <EyeIcon className="h-6 w-6" />
        {label ?? "Open Dialog"}
      </button>

      <Dialog
        transition
        className="relative z-50"
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        />

        <div className="fixed inset-0 z-50 w-screen p-4 sm:p-6 md:p-14">
          <DialogPanel
            transition
            className={`mx-auto ${size === "max" ? "max-w-3xl" : "max-w-fit"} mb-14 h-screen transform rounded-xl py-6 ring-1 ring-black ring-opacity-5 transition-all data-[closed]:scale-95 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in`}
          >
            <div className="bg-main flex h-[85%] flex-col overflow-y-auto rounded-xl">
              <div className="relative flex-1 px-4 sm:px-6">
                <div className="flex items-center justify-between border-b-2 border-gray-200 p-3">
                  <h2 className="text-primary text-lg font-semibold">
                    {title}
                  </h2>
                  <button>
                    <XMarkIcon
                      className="h-6 w-6"
                      onClick={() => setOpen(false)}
                    />
                  </button>
                </div>
                <div className="space-y-6">{children}</div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
};

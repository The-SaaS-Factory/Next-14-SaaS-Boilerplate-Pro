"use client";
import { Fragment, ReactNode } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useSideOverState } from "@/states/ui/slideOverState";
import { Button } from "../ui/button";

interface IButton {
  name?: string;
  icon?: ReactNode;
}

export default function SlideOver({
  button,
  children,
}: {
  button: IButton;
  children: ReactNode;
}) {
  const { toggleSideOver, isSideOverOpen } = useSideOverState(
    ({ toggleSideOver, isSideOverOpen }) => ({
      toggleSideOver,
      isSideOverOpen,
    }),
  );

  return (
    <>
      <Button className={`items-center space-x-1`} onClick={toggleSideOver}>
        {button.icon}
        <span>{button.name ?? "Open Slide Over"}</span>
      </Button>

      <Transition.Root show={isSideOverOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={toggleSideOver}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="bg-main text pointer-events-auto relative w-96">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-in-out duration-500"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="ease-in-out duration-500"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                        <button
                          type="button"
                          className="text-primary relative rounded-md focus:outline-none focus:ring-2"
                          onClick={toggleSideOver}
                        >
                          <span className="absolute -inset-2.5" />
                          <span className="sr-only">Close panel</span>
                          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </Transition.Child>
                    <div className="h-full overflow-y-auto p-8">
                      <div className="space-y-6 pb-16">{children}</div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}

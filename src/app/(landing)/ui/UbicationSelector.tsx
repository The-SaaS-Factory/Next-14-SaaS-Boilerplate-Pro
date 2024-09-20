"use client";

import { provincesInCuba } from "@/lib/provincesInCuba";
import { useUbicationState } from "@/states/ui/ubicationState";
import { classNames } from "@/utils/facades/serverFacades/strFacade";
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Dialog,
  DialogPanel,
  DialogBackdrop,
} from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { ExclamationCircleIcon, MapPinIcon } from "@heroicons/react/24/outline";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function UbicationSelector({
  openExternal = false,
  notShowButton = false,
}: {
  openExternal?: boolean;
  notShowButton?: boolean;
}) {
  const params = useParams<any>();
  const { ubication, changeUbication } = useUbicationState();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(openExternal);
  const items = provincesInCuba;
  const { replace } = useRouter();
  const filteredItems =
    query === ""
      ? items
      : items.filter((item) => {
          return item.name.toLowerCase().includes(query.toLowerCase());
        });

  const searchParams = useSearchParams();

  // useEffect(() => {
  //   if (!params.province && !ubication) {

  //     if (ubication) {
  //       changeUbication(ubication);
  //     }
  //   }
  // }, [params]);

  const handleChangeUbication = (item: any) => {
    setOpen(false);
    changeUbication(item.url);
    if (searchParams) {
      replace(`/buscar/${item.url}?${searchParams.toString()}`);
    } else {
      replace(`/buscar/${item.url}`);
    }
  };

  const getName = (province: string) => {
    const provinceObject = provincesInCuba.find(
      (prov) => prov.url === province
    );
    return provinceObject ? provinceObject.name : province;
  };

  return (
    <>
      {!notShowButton && (
        <button
          className="flex items-center space-x-2 text-sm font-medium text-gray-700 group"
          onClick={() => setOpen(true)}
        >
          <MapPinIcon
            className="h-6 w-6  text-gray-700 group-hover:text-gray-500"
            aria-hidden="true"
          />
          {params.province && <span>{getName(params.province)}</span>}
          {!params.province && ubication && <span> {getName(ubication)}</span>}
        </button>
      )}
      <Dialog
        className="relative z-50"
        open={open}
        onClose={() => {
          setOpen(false);
          setQuery("");
        }}
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto p-4 sm:p-6 md:p-20">
          <DialogPanel
            transition
            className="mx-auto max-w-xl transform divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all data-[closed]:scale-95 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
          >
            <Combobox
              onChange={(item: any) => {
                if (item) {
                  handleChangeUbication(item);
                }
              }}
            >
              <div className="relative">
                <MagnifyingGlassIcon
                  className="pointer-events-none absolute left-4 top-3.5 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
                <ComboboxInput
                  autoFocus
                  className="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                  placeholder="Buscar..."
                  onChange={(event) => setQuery(event.target.value)}
                  onBlur={() => setQuery("")}
                />
              </div>

              {filteredItems.length > 0 && (
                <ComboboxOptions
                  static
                  className="max-h-96 transform-gpu scroll-py-3 overflow-y-auto p-3"
                >
                  {filteredItems.map((item) => (
                    <ComboboxOption
                      key={item.id}
                      value={item}
                      className="group cursor-pointer flex  select-none rounded-xl p-3 data-[focus]:bg-gray-100"
                    >
                      <div
                        className={classNames(
                          "flex h-10 w-10 flex-none items-center justify-center rounded-lg",
                          item.color
                        )}
                      >
                        <item.icon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="ml-4 flex-auto">
                        <p className="text-sm font-medium text-gray-700 group-data-[focus]:text-gray-900">
                          {item.name}
                        </p>
                      </div>
                    </ComboboxOption>
                  ))}
                </ComboboxOptions>
              )}

              {query !== "" && filteredItems.length === 0 && (
                <div className="px-6 py-14 text-center text-sm sm:px-14">
                  <ExclamationCircleIcon
                    type="outline"
                    name="exclamation-circle"
                    className="mx-auto h-6 w-6 text-gray-400"
                  />
                  <p className="mt-4 font-semibold text-gray-900">
                    Provincia no encontrada
                  </p>
                  <p className="mt-2 text-gray-500"></p>
                </div>
              )}
            </Combobox>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}

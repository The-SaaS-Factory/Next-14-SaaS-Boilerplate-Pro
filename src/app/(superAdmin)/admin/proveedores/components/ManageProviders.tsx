"use client";

import { CheckIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { CustomDialog } from "@/components/ui/commons/Dialog";
import { toast } from "sonner";
import { updateTenantStatus } from "@/actions/global/tenantSystem/update-tenant-status";
import { ProfileStatus } from "@prisma/client";
import { UpdateProviderStatus } from "./UpdateProviderStatus";
import { UpdateOptionRemittenceProvider } from "./UpdateOptionRemittenceProvider";

export const ManageProviders = ({ providers }: { providers: any }) => {
  const [type, setType] = useState("ACTIVE");

  const handleAproveAgency = async (id: number) => {
    toast("Estás seguro?", {
      action: {
        label: "Sí",
        onClick: () => {
          updateTenantStatus({ modelId: id, status: ProfileStatus.ACTIVE })
            .then(() => {
              toast.success("Estado cambiado correctamente");
            })
            .catch(() => {
              toast.error("Error al cambiar el estado");
            });
        },
      },
    });
  };

  return (
    <div>
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
        <div className="col-span-1">
          <span className="isolate inline-flex rounded-md shadow-sm">
            <button
              type="button"
              onClick={() => setType("ACTIVE")}
              className={`relative inline-flex items-center rounded-l-md 
                  ${
                    type === "ACTIVE"
                      ? "bg-indigo-500 text-white "
                      : "bg-white text-gray-900"
                  }
                py-2 text-sm font-semibold text-gray-900 px-3 ring-1 ring-inset ring-gray-300   focus:z-10`}
            >
              Activos
            </button>
            <button
              type="button"
              onClick={() => setType("INACTIVE")}
              className={`relative -ml-px inline-flex items-center
              ${
                type === "INACTIVE"
                  ? "bg-indigo-500 text-white "
                  : "bg-white text-gray-900"
              }
                px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300   focus:z-10`}
            >
              Inactivos
            </button>
          </span>
          <motion.div>
            <ul role="list" className="divide-y  divide-gray-100">
              {providers
                ?.filter((a) => a.status === type)
                .map((provider, index) => (
                  <motion.li
                    key={index}
                    className="relative flex justify-between gap-x-6  py-5"
                    layout="position"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.1,
                    }}
                  >
                    <AnimatePresence mode="popLayout" initial={false}>
                      <div className="flex flex-col w-96 ">
                        <div className="flex bg-gray-200 p-3 rounded-xl items-center justify-between">
                          <div className="flex min-w-0 gap-x-4">
                            <Image
                              width={48}
                              height={48}
                              alt=""
                              src={provider.avatar ?? "/assets/img/avatar.png"}
                              className="h-12 w-12 flex-none rounded-full bg-gray-50"
                            />
                            <div className="min-w-0 flex-auto">
                              <p className="text-sm font-semibold leading-6 text-gray-900">
                                <a href={provider.href}>
                                  <span className="absolute inset-x-0 -top-px bottom-0" />
                                  {provider.name}
                                </a>
                              </p>
                              <p className="mt-1 flex text-xs leading-5 text-gray-500">
                                <a
                                  href={`mailto:${provider.email}`}
                                  className="relative truncate hover:underline"
                                >
                                  {provider.email}
                                </a>
                              </p>
                            </div>
                          </div>
                          <div className="flex justify-between z-0 shrink-0 items-center gap-x-4">
                            <div className="flex items-center   space-x-3 ">
                              {type === "PENDING" && (
                                <motion.button
                                  type="button"
                                  className="flex border-1 border-gray-200 rounded-xl space-x-3 "
                                  onClick={() =>
                                    handleAproveAgency(provider.id)
                                  }
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 3 }}
                                >
                                  <CheckIcon
                                    aria-hidden="true"
                                    className="w-6 mb-2 h-6"
                                  />
                                  <span>Aprobar</span>
                                </motion.button>
                              )}

                              <CustomDialog
                                label="Ver detalles"
                                title="Detalles del proveedor"
                                style="link"
                              >
                                <>
                                  <div className="flex flex-col">
                                    <div className="mt-4">
                                      <div className="flex p-2 rounded-2xl bg-gray-200 items-center gap-x-4">
                                        <div className="flex-none rounded-full bg-gray-200 p-1">
                                          <div className="h-12 w-12 rounded-full bg-gray-50">
                                            <Image
                                              width={48}
                                              height={48}
                                              alt=""
                                              src={
                                                provider.avatar ??
                                                "/assets/img/avatar.png"
                                              }
                                              className="h-12 w-12 flex-none rounded-full bg-gray-50"
                                            />
                                          </div>
                                        </div>
                                        <div className="min-w-0 flex-auto">
                                          <p className="text-sm font-semibold leading-6 text-gray-900">
                                            {provider.name}
                                          </p>
                                          <p className="mt-1 flex text-xs leading-5 text-gray-500">
                                            <a
                                              href={`mailto:${provider.email}`}
                                              className="relative truncate hover:underline"
                                            >
                                              {provider.email}
                                            </a>
                                          </p>
                                        </div>

                                        <UpdateProviderStatus
                                          provider={provider}
                                        ></UpdateProviderStatus>
                                      </div>
                                    </div>
                                    <div className="mt-4">
                                      {provider.category === "REMITTANCE" && (
                                        <UpdateOptionRemittenceProvider
                                          providerId={provider.id}
                                          valuesDefaults={provider.settings}
                                        />
                                      )}
                                    </div>
                                  </div>
                                </>
                              </CustomDialog>
                            </div>
                          </div>
                        </div>
                      </div>
                    </AnimatePresence>
                  </motion.li>
                ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

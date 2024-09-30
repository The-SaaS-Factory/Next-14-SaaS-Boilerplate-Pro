"use client";

import DeleteModel from "@/components/core/DeleteModel";
import { deleteTenant } from "@/actions/global/tenantSystem/delete-tenant";
import { CheckIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { CustomDialog } from "@/components/ui/commons/Dialog";
import { toast } from "sonner";
import { updateTenantStatus } from "@/actions/global/tenantSystem/update-tenant-status";
import { ProfileStatus } from "@prisma/client";
import { PermissionsTable } from "../components/PermissionsTable";
import { UpdateProfileStatus } from "../components/UpdateProfileStatus";
import { parsePriceInLocalCurrency } from "@/utils/facades/frontendFacades/parseValuesFacade";

export const ManageAgencies = ({ agencies }: { agencies: any }) => {
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
              Activas
            </button>
            <button
              type="button"
              onClick={() => setType("PENDING")}
              className={`relative -ml-px inline-flex items-center
              ${
                type === "PENDING"
                  ? "bg-indigo-500 text-white "
                  : "bg-white text-gray-900"
              }
               px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300   focus:z-10`}
            >
              Solicitudes
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
              Inactivas
            </button>
          </span>
          <motion.div>
            <ul role="list" className="divide-y divide-gray-100">
              {agencies
                ?.filter((a) => a.status === type)
                .map((agency, index) => (
                  <motion.li
                    key={index}
                    className="relative flex justify-between gap-x-6 py-5"
                    layout="position"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.1,
                    }}
                  >
                    <AnimatePresence mode="popLayout" initial={false}>
                      <div className="flex flex-col">
                        <div className="flex bg-gray-200 p-3 rounded-xl items-center justify-between">
                          <div className="flex min-w-0 gap-x-4">
                            <Image
                              width={48}
                              height={48}
                              alt=""
                              src={agency.avatar ?? "/assets/img/avatar.png"}
                              className="h-12 w-12 flex-none rounded-full bg-gray-50"
                            />
                            <div className="min-w-0 flex-auto">
                              <p className="text-sm font-semibold leading-6 text-gray-900">
                                <a href={agency.href}>
                                  <span className="absolute inset-x-0 -top-px bottom-0" />
                                  {agency.name}
                                </a>
                              </p>
                              <p className="mt-1 flex text-xs leading-5 text-gray-500">
                                <a
                                  href={`mailto:${agency.email}`}
                                  className="relative truncate hover:underline"
                                >
                                  {agency.email}
                                </a>
                              </p>
                            </div>
                            <div className="flex  divide-x-2  ">
                              {agency?.Amounts?.map((amount: any) => {
                                return (
                                  <div
                                    className={`flex    space-x-3   px-3 `}
                                    key={amount.id}
                                  >
                                    <div className="flex w-full items-center space-x-3   ">
                                      <span>{amount.Currency?.name}</span>
                                      <h2 className="text-title ">
                                        {parsePriceInLocalCurrency(
                                          amount.amount,
                                          amount.Currency?.code
                                        )}
                                      </h2>
                                      <div></div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                          <div className="flex justify-between z-0 shrink-0 items-center gap-x-4">
                            <div className="flex items-center   space-x-3 ">
                              {type === "PENDING" && (
                                <motion.button
                                  type="button"
                                  className="flex border-1 border-gray-200 rounded-xl space-x-3 "
                                  onClick={() => handleAproveAgency(agency.id)}
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
                              <div>
                                {!agency.isMainTenant && (
                                  <DeleteModel
                                    deleteAction={deleteTenant}
                                    modelId={agency.id}
                                  />
                                )}
                              </div>

                              <CustomDialog
                                label="Ver detalles"
                                title="Detalles de la agencia"
                                style="link"
                              >
                                <>
                                  <div className="flex flex-col">
                                    <div className="mt-4">
                                      <div className="flex items-center gap-x-4">
                                        <div className="flex-none rounded-full bg-gray-50 p-1">
                                          <div className="h-12 w-12 rounded-full bg-gray-50">
                                            <Image
                                              width={48}
                                              height={48}
                                              alt=""
                                              src={
                                                agency.avatar ??
                                                "/assets/img/avatar.png"
                                              }
                                              className="h-12 w-12 flex-none rounded-full bg-gray-50"
                                            />
                                          </div>
                                        </div>
                                        <div className="min-w-0 flex-auto">
                                          <p className="text-sm font-semibold leading-6 text-gray-900">
                                            {agency.name}
                                          </p>
                                          <p className="mt-1 flex text-xs leading-5 text-gray-500">
                                            <a
                                              href={`mailto:${agency.email}`}
                                              className="relative truncate hover:underline"
                                            >
                                              {agency.email}
                                            </a>
                                          </p>
                                        </div>

                                        <UpdateProfileStatus
                                          organizationId={agency.id}
                                        ></UpdateProfileStatus>
                                      </div>{" "}
                                      <div className="flex  divide-x-2 my-7">
                                        {agency?.Amounts?.map((amount: any) => {
                                          return (
                                            <div
                                              className={`flex    space-x-3   px-3 `}
                                              key={amount.id}
                                            >
                                              <div className="flex w-full items-center space-x-3   ">
                                                <span>
                                                  {amount.Currency?.name}
                                                </span>
                                                <h2 className="text-title ">
                                                  {parsePriceInLocalCurrency(
                                                    amount.amount,
                                                    amount.Currency?.code
                                                  )}
                                                </h2>
                                                <div></div>
                                              </div>
                                            </div>
                                          );
                                        })}
                                      </div>
                                    </div>
                                    <div className="mt-4">
                                      <div className="flex flex-col space-y-3 gap-x-4">
                                        <div className="flex-none">
                                          <p className="  font-semibold leading-6 text-gray-900">
                                            Nombre del Responsable
                                          </p>
                                          <p className="mt-1  leading-5 text-gray-500">
                                            {
                                              agency.profileMemberships[0]?.user
                                                ?.name
                                            }
                                          </p>
                                        </div>
                                        <div className="flex-none">
                                          <p className="  font-semibold leading-6 text-gray-900">
                                            Email del Responsable
                                          </p>
                                          <p className="mt-1  leading-5 text-gray-500">
                                            {
                                              agency.profileMemberships[0]?.user
                                                ?.email
                                            }
                                          </p>
                                        </div>
                                        <div className="flex-none">
                                          <p className="  font-semibold leading-6 text-gray-900">
                                            Teléfono de contacto
                                          </p>
                                          <p className="mt-1  leading-5 text-gray-500">
                                            {agency.phone ?? "No disponible"}
                                          </p>
                                        </div>
                                        <div className="flex-none">
                                          <p className="  font-semibold leading-6 text-gray-900">
                                            Dirección de la agencia
                                          </p>
                                          <p className="mt-1  leading-5 text-gray-500">
                                            {agency.address ?? "No disponible"}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </>
                              </CustomDialog>
                            </div>
                          </div>
                        </div>

                        {/* Permisos */}
                        <PermissionsTable
                          organizationId={agency.id}
                        ></PermissionsTable>
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

"use client";

import NotFound from "@/components/layouts/errors/NotFound";
import { Suspense, useEffect, useState } from "react";
import PageLoader from "@/components/ui/loaders/PageLoader";
import { formatTimestampToDateString } from "@/utils/facades/frontendFacades/strFacade";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CustomDialog } from "@/components/ui/componenets/Dialog";
import ViewChanges from "./ViewChanges";
import { EyeIcon } from "@heroicons/react/24/outline";
import { useDebouncedCallback } from "use-debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Dropdown from "@/components/ui/componenets/Dropdown";
import { MenuItem } from "@headlessui/react";
import { LogAction, Organization } from "@prisma/client";
import { getAllTenants } from "@/actions/global/tenantSystem/get-all-tenants";
import { CleanFilters } from "@/components/ui/CleanFilters";

const getActionColor = (action: string) => {
  switch (action) {
    case "CREATE":
      return "bg-green-100 text-green-800";
    case "UPDATE":
      return "bg-yellow-100 text-yellow-800";
    case "DELETE":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const ActivitiesList = ({ data }: { data: any }) => {
  const [agencies, setAgencies] = useState<Organization[] | null>(null);
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const searchParams = useSearchParams();

  const handleSearchParams = useDebouncedCallback((param, values) => {
    const params = new URLSearchParams(searchParams.toString());
    if (values.length > 0) {
      params.set(param, values.join(","));
    } else {
      params.delete(param);
    }
    router.replace(`${pathName}?${params.toString()}`);
  }, 50);

  const pathName = usePathname();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const _agencies = await getAllTenants();

      setAgencies(_agencies);
    };

    fetchData();
  }, []);

  const getSelectedAgencies = () => {
    return searchParams
      .get("profile")
      ?.split(",")
      .map((i) => parseInt(i));
  };

  return (
    <div>
      <Suspense
        fallback={
          <div>
            <PageLoader />
          </div>
        }
      >
        <div className="flex flex-col text-primary">
          <div className="divide-gray-200">
            <div className="pt-3 flex flex-col space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-primary">Búsqueda</span>
                <span className="ml-auto lg:block hidden text-2xs font-medium">
                  Filtros
                </span>
              </div>

              <div className="flex gap-2 items-center md:items-end md:flex-row flex-col justify-center md:justify-end py-4">
                {/* Date Range Filter */}
                <div className="flex flex-col lg:flex-row gap-4 items-center">
                  <div className="w-full lg:w-1/2 flex md:flex-row flex-col gap-2">
                    <label
                      htmlFor="start-date"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Fecha de Inicio
                    </label>
                    <input
                      type="date"
                      id="start-date"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      onChange={(e) => {
                        setStartDate(e.target.value);
                        handleSearchParams("startDate", [
                          new Date(e.target.value).toISOString().slice(0, 10),
                        ]);
                      }}
                      value={
                        startDate
                          ? new Date(startDate).toISOString().slice(0, 10)
                          : ""
                      }
                    />
                  </div>
                  <div className="w-full lg:w-1/2 flex md:flex-row flex-col gap-2">
                    <label
                      htmlFor="end-date"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Fecha de Fin
                    </label>
                    <input
                      type="date"
                      id="end-date"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      onChange={(e) => {
                        setEndDate(e.target.value);
                        handleSearchParams("endDate", [
                          new Date(e.target.value).toISOString().slice(0, 10),
                        ]);
                      }}
                      value={
                        endDate
                          ? new Date(endDate).toISOString().slice(0, 10)
                          : ""
                      }
                    />
                  </div>
                </div>

                <Dropdown variant="ghost" label={"Perfil"}>
                  {agencies?.map((item) => (
                    <MenuItem key={`profile-option-${item.id}`}>
                      <button
                        type="button"
                        onClick={() => {
                          const selectedAgencies = getSelectedAgencies();

                          if (selectedAgencies) {
                            if (selectedAgencies.includes(item.id)) {
                              const copy = selectedAgencies?.filter(
                                (a) => a !== item.id
                              );
                              handleSearchParams("profile", copy);
                            } else {
                              const copy = [...selectedAgencies!, item.id];
                              handleSearchParams("profile", copy);
                            }
                          } else {
                            handleSearchParams("profile", [item.id]);
                          }
                        }}
                        className="flex items-center gap-2 w-full px-4 py-2 text-left text-sm text-gray-700 focus:bg-gray-100 dark:focus:bg-gray-100/10 focus:text-primary dark:focus:text-gray-100 dark:text-white"
                      >
                        <div
                          className={`py-1 px-0.5 h-4 w-1 bg-indigo-600 rounded-xl transition-all ${
                            getSelectedAgencies()?.includes(item.id)
                              ? "opacity-100"
                              : "opacity-0"
                          }`}
                        ></div>
                        <span>{item.name}</span>
                      </button>
                    </MenuItem>
                  ))}
                </Dropdown>

                <Dropdown
                  variant="ghost"
                  label={
                    searchParams.get("action")
                      ? `Acción: ${searchParams.get("action")}`
                      : "Acción"
                  }
                >
                  {Object.keys(LogAction).map((key) => (
                    <MenuItem key={`option-${key}`}>
                      <button
                        type="button"
                        onClick={() => handleSearchParams("action", [key])}
                        className="flex items-center gap-2 w-full px-4 py-2 text-left text-sm text-gray-700 focus:bg-gray-100 dark:focus:bg-gray-100/10 focus:text-primary dark:focus:text-gray-100 dark:text-white"
                      >
                        <div
                          className={`py-1 px-0.5 h-4 w-1 bg-indigo-600 rounded-xl transition-all ${
                            searchParams.get("action") === key
                              ? "opacity-100"
                              : "opacity-0"
                          }`}
                        ></div>
                        <span>{key}</span>
                      </button>
                    </MenuItem>
                  ))}
                </Dropdown>
              </div>
            </div>
            <div className="flex flex-col justify-end p-1">
              <CleanFilters />
            </div>
          </div>

          {Object.keys(data).length === 0 ? (
            <NotFound message="No data found"></NotFound>
          ) : (
            <div className="w-full overflow-x-auto">
              <Table className="mt-6">
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-center">Usuario</TableHead>
                    <TableHead className="text-center">Acción</TableHead>
                    <TableHead className="text-center">Fecha</TableHead>
                    <TableHead className="text-center">Acciones</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {data?.map((log, index: number) => (
                    <TableRow key={`log-${log.id + index}`}>
                      <TableCell className="text-start flex flex-col">
                        <span>{log.profile?.name || "Desconocido"}</span>
                        <span className="text-sm text-neutral-400">
                          {log.profile?.email || "Desconocido"}
                        </span>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge className={getActionColor(log.action)}>
                          {log.action}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <span>
                          {formatTimestampToDateString(
                            log.createdAt.toLocaleDateString()
                          )}
                        </span>
                      </TableCell>

                      <TableCell className="text-center flex items-center justify-center">
                        <CustomDialog
                          dialogTitle="Registro de Cambios"
                          icon={
                            <EyeIcon className="size-6 self-center"></EyeIcon>
                          }
                          label=""
                        >
                          <ViewChanges
                            type={log.action}
                            changes={log.changes as any}
                          ></ViewChanges>
                        </CustomDialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </Suspense>
    </div>
  );
};

export default ActivitiesList;

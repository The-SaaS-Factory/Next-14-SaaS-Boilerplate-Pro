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
        <div className="text-primary flex flex-col">
          <div className="divide-gray-200">
            <div className="flex flex-col space-y-4 pt-3">
              <div className="flex items-center gap-2">
                <span className="text-primary">Search</span>
                <span className="text-2xs ml-auto hidden font-medium lg:block">
                  Filters
                </span>
              </div>

              <div className="flex flex-col items-center justify-center gap-2 py-4 md:flex-row md:items-end md:justify-end">
                {/* Date Range Filter */}
                <div className="flex flex-col items-center gap-4 lg:flex-row">
                  <div className="flex w-full flex-col gap-2 md:flex-row lg:w-1/2">
                    <label
                      htmlFor="start-date"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Start Date
                    </label>
                    <input
                      type="date"
                      id="start-date"
                      className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
                  <div className="flex w-full flex-col gap-2 md:flex-row lg:w-1/2">
                    <label
                      htmlFor="end-date"
                      className="block text-sm font-medium text-gray-700"
                    >
                      End Date
                    </label>
                    <input
                      type="date"
                      id="end-date"
                      className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
                                (a) => a !== item.id,
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
                        className="focus:text-primary flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-gray-700 focus:bg-gray-100 dark:text-white dark:focus:bg-gray-100/10 dark:focus:text-gray-100"
                      >
                        <div
                          className={`h-4 w-1 rounded-xl bg-indigo-600 px-0.5 py-1 transition-all ${
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
                        className="focus:text-primary flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-gray-700 focus:bg-gray-100 dark:text-white dark:focus:bg-gray-100/10 dark:focus:text-gray-100"
                      >
                        <div
                          className={`h-4 w-1 rounded-xl bg-indigo-600 px-0.5 py-1 transition-all ${
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
                    <TableHead className="text-center">User</TableHead>
                    <TableHead className="text-center">Action</TableHead>
                    <TableHead className="text-center">Date</TableHead>
                    <TableHead className="text-center">Actions</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {data?.map((log, index: number) => (
                    <TableRow key={`log-${log.id + index}`}>
                      <TableCell className="flex flex-col text-start">
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
                            log.createdAt.toLocaleDateString(),
                          )}
                        </span>
                      </TableCell>

                      <TableCell className="flex items-center justify-center text-center">
                        <CustomDialog
                          dialogTitle="Changes registered"
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

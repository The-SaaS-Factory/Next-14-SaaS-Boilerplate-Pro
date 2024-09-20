"use client";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

interface IPagination {
  totalPages: number;
  totalCount: number;
  offset: number;
  dataLength: number;
}

export default function Pagination({
  totalPages,
  totalCount,
  offset,
  dataLength,
}: IPagination) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams as any);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };
  return (
    <div className="flex flex-col">
      <div className="text-primary">
        Mostrando <span className="font-medium">{offset + 1}</span> a{" "}
        <span className="font-medium">{offset + dataLength}</span> de{" "}
        <span className="font-medium">{totalCount}</span> resultados
      </div>
      <div className="flex items-center justify-between space-x-3">
        <Link
          href={createPageURL(currentPage - 1)}
          className={
            currentPage - 1 === 0 ? `pointer-events-none opacity-50` : ""
          }
        >
          <button className="btn-icon">
            <ChevronLeftIcon className="text-primary h-5 w-5" />
          </button>
        </Link>
        <Link
          href={createPageURL(currentPage + 1)}
          className={
            currentPage >= totalPages ? `pointer-events-none opacity-50` : ""
          }
        >
          <button className="btn-icon">
            <ChevronRightIcon className="text-primary h-5 w-5" />
          </button>
        </Link>
      </div>
    </div>
  );
}

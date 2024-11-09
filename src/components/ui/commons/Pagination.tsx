"use client";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { Button } from "../button";

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
        Showing <span className="font-medium">{offset + 1}</span> to{" "}
        <span className="font-medium">{offset + dataLength}</span> of{" "}
        <span className="font-medium">{totalCount}</span> results
      </div>
      <div className="flex items-center justify-between space-x-3">
        <Link
          href={createPageURL(currentPage - 1)}
          className={
            currentPage - 1 === 0 ? `pointer-events-none opacity-50` : ""
          }
        >
          <Button variant="outline">
            <ChevronLeftIcon className="text-primary h-5 w-5" />
          </Button>
        </Link>
        <Link
          href={createPageURL(currentPage + 1)}
          className={
            currentPage >= totalPages ? `pointer-events-none opacity-50` : ""
          }
        >
          <Button variant="outline">
            <ChevronRightIcon className="text-primary h-5 w-5" />
          </Button>
        </Link>
      </div>
    </div>
  );
}

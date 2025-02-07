"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { Button } from "../button";

interface IPagination {
  totalPages: number;
  totalCount: number;
  offset: number;
  dataLength: number;
}

export default function Pagination({
  totalCount,
  offset,
  dataLength,
}: IPagination) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page"));
  const currentLimit = Number(searchParams.get("limit"));
  const { replace } = useRouter();
  const [limit, setLimit] = useState(currentLimit);

  useEffect(() => {
    const params = new URLSearchParams(searchParams as any);

    if (limit !== currentLimit) {
      params.set("limit", limit.toString());
    }

    if (currentPage !== 0) params.set("page", "1");

    replace(`${pathname}?${params.toString()}`);
  }, [limit, pathname, searchParams]);

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
          <Button variant="outline">
            <ChevronLeftIcon className="text-primary h-5 w-5" />
          </Button>
        </Link>

        <Select onValueChange={(v) => setLimit(Number(v))}>
          <SelectTrigger className="w-[80px]">
            <SelectValue placeholder="20" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="30">30</SelectItem>
            <SelectItem value="40">40</SelectItem>
            <SelectItem value="50">50</SelectItem>
            <SelectItem value="70">50</SelectItem>
            <SelectItem value="100">100</SelectItem>
            <SelectItem value="250">250</SelectItem>
            <SelectItem value="500">500</SelectItem>
          </SelectContent>
        </Select>

        <Link
          href={createPageURL(currentPage + 1)}
          className={
            currentPage * limit >= totalCount
              ? `pointer-events-none opacity-50`
              : ""
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

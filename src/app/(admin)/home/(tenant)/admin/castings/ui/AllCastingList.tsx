"use client";

import { getUserCastings } from "@/actions/admin/castingModule/get-all-castings";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { CastingItem } from "./CastingItem";
import { useMembership } from "@/app/hooks/useMembership";
import TableLoaderSkeleton from "@/components/ui/loaders/TableLoaderSkeleton";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CastingStatus } from "@prisma/client";
import { useDebouncedCallback } from "use-debounce";
import { TextInput } from "@tremor/react";
import { MagnifyingGlassCircleIcon } from "@heroicons/react/24/outline";
import Pagination from "@/components/ui/commons/Pagination";

interface Props {
  status?: CastingStatus;
}

const AllCastingList: React.FC<Props> = ({ status }) => {
  const [castings, setCastings] = useState<any[] | null>();
  const { profile, permissions } = useMembership();

  const [data, setData] = useState<any | null>();

  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();

  const currentPage = Number(searchParams?.get("page")) || 1;
  const query = searchParams?.get("query") || "";
  const search = query || "";
  const limit = 20;
  const offset = (currentPage - 1) * limit;

  const handleSearchParams = useDebouncedCallback((param, values) => {
    // Convertimos los searchParams a string antes de crear un nuevo URLSearchParams
    const params = new URLSearchParams(searchParams.toString());

    if (values.length > 0) {
      params.set(param, values.join(","));
    } else {
      params.delete(param);
    }
    router.replace(`${pathName}?${params.toString()}`);
  }, 50);

  useEffect(() => {
    const fetchData = async () => {
      console.log("status", status);
      const _castings = await getUserCastings({
        args: {
          limit,
          offset,
          query: search,
          status: status,
          search: searchParams,
        },
      });

      setData(_castings);
      setCastings(_castings.data);
    };

    fetchData();
  }, [offset, search]);

  return (
    <div className="flex-1 p-4 overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <TextInput
          defaultValue={searchParams.get("query") || ""}
          icon={MagnifyingGlassCircleIcon}
          onChange={(e) => handleSearchParams("query", [e.target.value])}
          type="text"
          placeholder="Buscar castings"
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Identificación</TableHead>
            <TableHead>Aplicaciones</TableHead>
            <TableHead>Estado</TableHead>

            <TableHead>Fecha de Cierre</TableHead>
            <TableHead>Fecha límite</TableHead>

            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!castings && <TableLoaderSkeleton count={4}></TableLoaderSkeleton>}

          {castings?.map((casting) => (
            <CastingItem
              profile={profile}
              permissions={permissions}
              key={casting.id}
              casting={casting}
            ></CastingItem>
          ))}
        </TableBody>
      </Table>

      <Pagination
        offset={offset}
        dataLength={castings?.length}
        totalCount={data?.totalCount}
        totalPages={data?.totalCount}
      />
    </div>
  );
};

export default AllCastingList;

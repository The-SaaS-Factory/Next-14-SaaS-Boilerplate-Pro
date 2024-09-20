import NotFound from "@/components/layouts/errors/NotFound";
import { Suspense } from "react";
import { getUserCastings } from "@/actions/admin/castingModule/get-all-castings";
import {
  Badge,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@tremor/react";
import PageLoader from "@/components/ui/loaders/PageLoader";
import Link from "next/link";
import { formatTimestampToDateString } from "@/utils/facades/serverFacades/strFacade";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { CastingStatus } from "@prisma/client";
import { getStatusName } from "@/utils/facades/frontendFacades/visualFacade";

const CastingsList = async ({
  query,
  currentPage,
  status,
}: {
  query: string;
  currentPage: number;
  status: CastingStatus;
}) => {
  const search = query || "";
  const limit = 20;
  const offset = (currentPage - 1) * limit;

  const { data, totalCount } = await getUserCastings({
    args: {
      query: search,
      limit,
      offset,
      status,
      search: search,
    },
  });

  return (
    <div>
      <Suspense
        fallback={
          <div>
            <PageLoader />
          </div>
        }
      >
        {data.length === 0 ? (
          <div className="flex justify-center items-center h-96">
            <NotFound message="No castings found" />
          </div>
        ) : (
          <div className="flex flex-col text-primary">
            <Table className="mt-6">
              <TableHead>
                <TableRow className="">
                  <TableHeaderCell className="text-center">
                    Nombre
                  </TableHeaderCell>
                  <TableHeaderCell className="text-center ">
                    Aplicaciones
                  </TableHeaderCell>
                  <TableHeaderCell className="text-center">
                    Estado
                  </TableHeaderCell>
                  <TableHeaderCell className="text-center ">
                    Ubicación
                  </TableHeaderCell>
                  <TableHeaderCell className="text-center">
                    Fecha de cierre
                  </TableHeaderCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {data?.map((item: any, index: number) => (
                  <TableRow key={`userS-${item.id + index}`}>
                    <TableCell className="text-center text">
                      <span>{item.name}</span>
                    </TableCell>
                    <TableCell className="text-center text-primary">
                      <span>{item._count?.aplications}</span>
                    </TableCell>
                    <TableCell className={`   text-center text-primary  `}>
                      <span>{getStatusName(item.status)}</span>
                    </TableCell>
                    <TableCell className="text-center  text-primary">
                      <Badge color={"sky"}>{item.ubication}</Badge>
                    </TableCell>

                    <TableCell className="text-center  text-primary">
                      <span>
                        {formatTimestampToDateString(item.dateLimitApplicants)}
                      </span>
                    </TableCell>
                    <TableCell className="w-14   ">
                      <Link
                        href={`/home/castings/edit/${item.id}`}
                        className="btn-icon  "
                      >
                        <PencilSquareIcon className="w-5 h-5  " />
                        <span>Editar</span>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="flex mt-7 justify-between">
              <div className="text-primary">
                Mostrando <span className="font-medium">{offset + 1}</span> a{" "}
                <span className="font-medium">{offset + data.length}</span> de{" "}
                <span className="font-medium">{totalCount}</span> resultados
              </div>
            </div>
          </div>
        )}
      </Suspense>
    </div>
  );
};

export default CastingsList;

import NotFound from "@/components/layouts/errors/NotFound";
import { Suspense } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@tremor/react";
import PageLoader from "@/components/ui/loaders/PageLoader";

import Link from "next/link";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { getUserCastingRoles } from "@/actions/admin/castingModule/get-user-casting-roles";
import DeleteModel from "@/components/core/DeleteModel";
import { deleteCastingRole } from "@/actions/admin/castingModule/delete-casting-role";

const RolesList = async () => {
  const roles = await getUserCastingRoles();
  return (
    <div>
      <Suspense
        fallback={
          <div>
            <PageLoader />
          </div>
        }
      >
        {roles.length === 0 ? (
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
                </TableRow>
              </TableHead>

              <TableBody>
                {roles?.map((item: any, index: number) => (
                  <TableRow key={`userS-${item.id + index}`}>
                    <TableCell className="text-center  text-primary">
                      {item.name}
                    </TableCell>
                    <TableCell className="w-14  flex space-x-3 ">
                      <DeleteModel
                        modelId={item.id}
                        deleteAction={deleteCastingRole}
                      />

                      <Link
                        href={` /home/admin/settings/roles/edit/${item.id}`}
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
          </div>
        )}
      </Suspense>
    </div>
  );
};

export default RolesList;

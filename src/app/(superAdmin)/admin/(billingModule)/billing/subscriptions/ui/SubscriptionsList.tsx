import { getAllSuscriptions } from "@/actions/superAdmin/superAdminBillingModule/get-all-suscriptions";
import NotFound from "@/components/layouts/errors/NotFound";
import Pagination from "@/components/ui/commons/Pagination";
import {
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableBody,
} from "@tremor/react";
import { MembershipType } from "@/interfaces/billingModule";
import { formatTimestampToDateString } from "@/utils/facades/frontendFacades/strFacade";
import { Suspense } from "react";
import TableLoaderSkeleton from "@/components/ui/loaders/TableLoaderSkeleton";
import Link from "next/link";
import { PencilIcon } from "@heroicons/react/24/outline";
import UserCard from "@/components/ui/commons/UserCard";
import { Button } from "@/components/ui/button";

const SubscriptionsList = async ({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) => {
  const search = query || "";
  const limit = 20;
  const offset = (currentPage - 1) * limit;

  const { data, totalPages, totalCount } = await getAllSuscriptions({
    args: {
      search,
      limit,
      offset,
    },
  });

  console.log(data);

  return (
    <div>
      <Suspense fallback={<TableLoaderSkeleton count={4} />}>
        {data.length === 0 ? (
          <div className="flex h-96 items-center justify-center">
            <NotFound message="No subscription found" />
          </div>
        ) : (
          <div className="flex flex-col">
            <Table className="mt-6">
              <TableHead>
                <TableRow className="">
                  <TableHeaderCell className="text-left">
                    User / Organization
                  </TableHeaderCell>
                  <TableHeaderCell className="text-center">
                    Plan
                  </TableHeaderCell>
                  <TableHeaderCell className="text-center">
                    Created
                  </TableHeaderCell>
                  <TableHeaderCell className="text-center">
                    Expires
                  </TableHeaderCell>
                  <TableHeaderCell className="text-center">
                    Actions
                  </TableHeaderCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {data?.map((item: MembershipType, index: number) => (
                  <TableRow key={`userS-${item.id + index}`}>
                    <TableCell className="items-center text-left">
                      <UserCard user={item.organization} />
                    </TableCell>
                    <TableCell className="text text-center">
                      {item.plan?.name}
                    </TableCell>

                    <TableCell className="text text-center">
                      {formatTimestampToDateString(item.startDate)}{" "}
                    </TableCell>
                    <TableCell className="text text-center">
                      {formatTimestampToDateString(item.endDate)}{" "}
                    </TableCell>
                    <TableCell className="text flex text-center">
                      <Link href={`subscriptions/edit/${item.id}`}>
                        <Button variant="outline">
                          <PencilIcon className="h-6 w-6" />
                          <span className="sr-only">,</span>
                        </Button>
                      </Link>
                      {/* <DeleteModel
                        modelId={plan.id}
                        deleteAction={deletePlan} 
                      />*/}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="mt-7 flex justify-between">
              <Pagination
                offset={offset}
                dataLength={data.length}
                totalCount={totalCount}
                totalPages={totalPages}
              />
            </div>
          </div>
        )}
      </Suspense>
    </div>
  );
};

export default SubscriptionsList;

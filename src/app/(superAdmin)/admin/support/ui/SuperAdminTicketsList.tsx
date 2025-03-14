import { getAllSupportTicket } from "@/actions/global/supportModule/superAdmin/get-all-support-tickets";
import NotFound from "@/components/layouts/errors/NotFound";
import Pagination from "@/components/ui/commons/Pagination";
import UserCard from "@/components/ui/commons/UserCard";
import { formatTimestampToDateString } from "@/utils/facades/frontendFacades/strFacade";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@tremor/react";
import Link from "next/link";

// eslint-disable-next-line no-undef
export const showTicketStatus = (status: string): JSX.Element => {
  if (status === "OPEN") {
    return <span className={"badge-pending"}>Open</span>;
  } else if (status === "AWAITING_RESPONSE") {
    return <span className={"badge-green"}>Waiting for response</span>;
  } else if (status === "UNDER_REVIEW") {
    return <span className={"badge-orange"}>Under Review</span>;
  } else if (status === "CANCELED") {
    return <span className={"badge-red"}>Canceled</span>;
  } else if (status === "CLOSED") {
    return <span className={"badge-sky"}>Closed</span>;
  } else if (status === "REOPENED") {
    return <span className={"badge-paid"}>Re Open</span>;
  } else {
    return <span className={"badge-unknown"}>Unknown</span>;
  }
};

const SuperAdminTicketsList = async ({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) => {
  const search = query || "";
  const limit = 10;
  const offset = (currentPage - 1) * limit;

  const { data, totalPages, totalCount } = await getAllSupportTicket({
    args: {
      search,
      limit,
      offset,
    },
  });

  return (
    <div>
      {data.length === 0 ? (
        <div className="flex h-96 items-center justify-center">
          <NotFound message="No tickets found" />
        </div>
      ) : (
        <div className="flex flex-col">
          <Table className="mt-6">
            <TableHead>
              <TableRow className="">
                <TableHeaderCell className="text-left">
                  User / Organization
                </TableHeaderCell>
                <TableHeaderCell className="text-left">Subject</TableHeaderCell>
                <TableHeaderCell className="text-center">Plan</TableHeaderCell>
                <TableHeaderCell className="text-center">
                  Departament
                </TableHeaderCell>
                <TableHeaderCell className="text-center">
                  Status
                </TableHeaderCell>
                <TableHeaderCell className="text-center">Date</TableHeaderCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {data?.map((item: any, index: number) => (
                <TableRow key={`userInvoice-${index}`}>
                  <TableCell className="text text-left">
                    {item.profile && <UserCard user={item.profile} />}
                  </TableCell>
                  <TableCell className="space-x-3 text-left">
                    <span>{item.subject}</span>
                  </TableCell>
                  <TableCell className="space-x-3 text-left">
                    <span className="uppercase">{item.departament}</span>
                  </TableCell>
                  <TableCell className="text text-center">
                    {showTicketStatus(item.status)}
                  </TableCell>
                  <TableCell className="text text-center">
                    {formatTimestampToDateString(item.createdAt)}
                  </TableCell>
                  <TableCell className="text text-center">
                    <Link
                      href={`/admin/support/ticket/${item.id}`}
                      className="btn-main"
                    >
                      View
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mt-7 flex justify-between">
            <div className="text-primary">
              Showing <span className="font-medium">{offset + 1}</span> to{" "}
              <span className="font-medium">{offset + data.length}</span> of{" "}
              <span className="font-medium">{totalCount}</span> results
            </div>
            <Pagination
              offset={offset}
              dataLength={data.length}
              totalCount={totalCount}
              totalPages={totalPages}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SuperAdminTicketsList;

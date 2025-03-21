import NotFound from "@/components/layouts/errors/NotFound";
import Pagination from "@/components/ui/commons/Pagination";
import {
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableBody,
  Badge,
} from "@tremor/react";

import Link from "next/link";
import { EyeIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import PageLoader from "@/components/ui/loaders/PageLoader";
import { Suspense } from "react";
import { getAllCoupons } from "@/actions/superAdmin/superAdminBillingModule/coupons/get-all-coupons";
import ConnectCouponWithStripe from "./ConnectCouponWithStripe";
import { getAllCurrencies } from "@/actions/superAdmin/superAdminBillingModule/get-all-currencies";
import {
  getStatusName,
  getBadgeClass,
} from "@/utils/facades/frontendFacades/visualFacade";

const CouponsList = async ({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) => {
  const search = query || "";
  const limit = 20;
  const offset = (currentPage - 1) * limit;

  const currencies = await getAllCurrencies();
  const { data, totalPages, totalCount } = await getAllCoupons({
    args: {
      search,
      limit,
      offset,
    },
  });

  return (
    <div>
      <Suspense fallback={<PageLoader />}>
        {data.length === 0 ? (
          <div className="flex h-96 items-center justify-center">
            <NotFound message="No coupons found" />
          </div>
        ) : (
          <div className="flex flex-col">
            <Table className="mt-6">
              <TableHead>
                <TableRow className="">
                  <TableHeaderCell className="text-center">
                    Name / Code
                  </TableHeaderCell>
                  <TableHeaderCell className="text-center">
                    User
                  </TableHeaderCell>
                  <TableHeaderCell className="text-center">
                    Status
                  </TableHeaderCell>
                  <TableHeaderCell className="text-center">
                    Stripe Conection
                  </TableHeaderCell>
                  <TableHeaderCell className="text-center">
                    Amount off
                  </TableHeaderCell>
                  <TableHeaderCell className="text-center">
                    % off
                  </TableHeaderCell>
                  <TableHeaderCell className="text-center">
                    Duration
                  </TableHeaderCell>
                  <TableHeaderCell className="text-center">
                    Invoices
                  </TableHeaderCell>
                  <TableHeaderCell className="text-center">
                    Actions
                  </TableHeaderCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {data?.map((item: any, index: number) => (
                  <TableRow key={`userS-${item.id + index}`}>
                    <TableCell className="flex flex-col items-center text-center">
                      <span className="font-bold">{item.name}</span>
                      <span className="text-primary">
                        Coupon Code for internal invoices: <b> {item.code}</b>
                      </span>
                      <span className="text-primary">
                        Coupon Code for stripe checkoout:{" "}
                        <b>
                          {
                            item.settings.find(
                              (setting: any) =>
                                setting.name === "stripeCouponPromotionCode",
                            )?.value
                          }
                        </b>
                      </span>
                    </TableCell>
                    <TableCell className="items-center text-center">
                      <span>
                        {item.user?.name || "Global use"} - ({item.user?.id})
                      </span>
                    </TableCell>
                    <TableCell className="items-center text-center">
                      <span className={getBadgeClass(item.status)}>
                        {getStatusName(item.status)}
                      </span>
                    </TableCell>
                    <TableCell className="items-center text-center">
                      <ConnectCouponWithStripe
                        coupon={item}
                        currencies={currencies}
                        path={`/admin/billing/coupons`}
                        settings={item.settings}
                      />
                    </TableCell>
                    <TableCell className="text text-center">
                      <Badge color={"sky"}>{item.amountOff} off</Badge>
                    </TableCell>
                    <TableCell className="text text-center">
                      <Badge color={"sky"}>{item.percentOff} % off</Badge>
                    </TableCell>
                    <TableCell className="text text-center">
                      <Badge color={"blue"}>
                        {item.durationInMonths} / {item.maxRedemptions}{" "}
                      </Badge>
                    </TableCell>
                    <TableCell className="text text-center">
                      <Badge color={"blue"}>
                        <div>
                          {item.invoices?.length} / {item.maxRedemptions}
                          <hr />
                        </div>
                      </Badge>
                      <ul>
                        <span>Invoices: </span>
                        {item.invoices?.map((invoice) => (
                          <Link
                            key={`invoice-${invoice.id}`}
                            href={`/admin/billing/invoices/${invoice.id}`}
                          >
                            <li className="flex gap-1 space-x-1">
                              {invoice.id}
                              <EyeIcon className="h-5 w-5" />
                            </li>
                          </Link>
                        ))}
                      </ul>
                    </TableCell>

                    <TableCell className="w-14">
                      <Link
                        href={`/admin/billing/coupons/edit/${item.id}`}
                        className="btn-icon"
                      >
                        <PencilSquareIcon className="h-5 w-5" />
                        <span>Edit</span>
                      </Link>
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

export default CouponsList;

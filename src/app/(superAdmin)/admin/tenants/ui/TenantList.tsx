import NotFound from "@/components/layouts/errors/NotFound";
import Pagination from "@/components/ui/commons/Pagination";
import OperateUser from "./OperateUser";
import UserCard from "@/components/ui/commons/UserCard";
import { getAllTenantBySearch } from "@/actions/global/tenantSystem/get-all-tenants";
import { IOrganization } from "@/interfaces/saasTypes";
import OperateTenant from "./OperateTenant";
import { formatTimestampToDateString } from "@/utils/facades/frontendFacades/strFacade";

const TenantList = async ({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) => {
  const search = query || "";
  const limit = 20;
  const offset = (currentPage - 1) * limit;

  const { data, totalPages, totalCount } = await getAllTenantBySearch({
    args: {
      search,
      limit,
      offset,
    },
  });

  return (
    <div>
      {data.length === 0 ? (
        <div className="flex justify-center items-center h-96">
          <NotFound message="No tenants found" />
        </div>
      ) : (
        <div className=" ">
          <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <table className="min-w-full  divide-y divide-gray-300 text-primary">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold   sm:pl-0"
                      >
                        Name
                      </th>

                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold  "
                      >
                        Subscription Plan
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold  "
                      >
                        Members
                      </th>
                      <th
                        scope="col"
                        className="relative py-3.5 pl-3 pr-4 sm:pr-0"
                      >
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y    divide-gray-200 bg-main text-primary">
                    {data?.map((tenant: IOrganization) => (
                      <tr key={tenant.id}>
                        <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                          <UserCard user={tenant} />
                        </td>
                        <td className="whitespace-nowrap px-3 py-5 text-sm  text">
                          {tenant.subscription && (
                            <div className=" ">
                              {tenant.subscription.plan.name ?? "-"} / until{" "}
                              {formatTimestampToDateString(
                                tenant.subscription.endDate,
                              )}
                            </div>
                          )}
                        </td>
                        <td className="whitespace-nowrap px-3 py-5 text-sm  text">
                          <div className="mt-1  text-primary flex flex-col">
                            {tenant.userMemberships?.length}
                          </div>
                        </td>

                        <td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                          <OperateTenant tenantId={tenant.id} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="flex mt-7 justify-between">
            <div className="text-primary">
              Mostrando <span className="font-medium">{offset + 1}</span> a{" "}
              <span className="font-medium">{offset + data?.length}</span> de{" "}
              <span className="font-medium">{totalCount}</span> resultados
            </div>
            <Pagination
              offset={offset}
              dataLength={data?.length}
              totalCount={totalCount}
              totalPages={totalPages}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TenantList;

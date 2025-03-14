import { getAllPlans } from "@/actions/superAdmin/superAdminBillingModule/get-all-plans";
import NotFound from "@/components/layouts/errors/NotFound";
import TableLoaderSkeleton from "@/components/ui/loaders/TableLoaderSkeleton";
import { Suspense } from "react";
import Link from "next/link";
import { PencilIcon } from "@heroicons/react/24/outline";
import DeleteModel from "@/components/core/DeleteModel";
import { deletePlan } from "@/actions/superAdmin/superAdminBillingModule/delete-plan";
import { getPriceRange } from "@/utils/facades/modulesFacades/billingFacade";
import {
  getBadgeClass,
  getStatusName,
} from "@/utils/facades/frontendFacades/visualFacade";
import { Button } from "@/components/ui/button";

const BillingPlansList = async () => {
  const { data } = await getAllPlans();

  return (
    <div>
      <Suspense fallback={<TableLoaderSkeleton count={10} />}>
        {data.length === 0 ? (
          <div className="flex h-96 w-full items-center justify-center">
            <NotFound message="No plans found" />
          </div>
        ) : (
          <div className=" ">
            <div className="mt-8 flow-root">
              <div className="-my-2 overflow-x-auto">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <table className="text-primary min-w-full divide-y divide-gray-300">
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold sm:pl-0"
                        >
                          Name
                        </th>

                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold sm:pl-0"
                        >
                          Status
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold"
                        >
                          Pricing
                        </th>

                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold"
                        >
                          Capabilities
                        </th>
                        <th
                          scope="col"
                          className="relative py-3.5 pl-3 pr-4 sm:pr-0"
                        >
                          <span className="sr-only">Actions</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-main text-primary divide-y divide-gray-200">
                      {data?.map((plan: any) => (
                        <tr key={plan.id}>
                          <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                            <div className=" ">{plan.name}</div>
                          </td>

                          <td className="whitespace-nowrap px-3 py-5 text-sm">
                            <div className={getBadgeClass(plan.status)}>
                              {getStatusName(plan.status)}
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-3 py-5 text-sm">
                            {plan.pricing && plan.pricing.length > 0
                              ? getPriceRange(plan.pricing, "usd")
                              : "No prices yet"}
                          </td>
                          <td className="whitespace-nowrap px-3 py-5 text-sm">
                            {plan.PlanCapabilities?.length}
                          </td>
                          <td className="flex space-x-3 py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                            <Link href={`plans/edit/${plan.id}`}>
                              <Button variant="outline">
                                <PencilIcon className="h-6 w-6" />
                                <span className="sr-only">,</span>
                              </Button>
                            </Link>
                            <DeleteModel
                              modelId={plan.id}
                              deleteAction={deletePlan}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </Suspense>
    </div>
  );
};

export default BillingPlansList;

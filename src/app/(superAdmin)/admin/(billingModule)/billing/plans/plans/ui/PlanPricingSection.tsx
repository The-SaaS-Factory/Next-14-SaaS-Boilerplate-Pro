import Link from "next/link";
import { PencilIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import DeleteModel from "@/components/core/DeleteModel";
import { deletePlanPrice } from "@/actions/superAdmin/superAdminBillingModule/delete-plan-price";
import { Plan, Pricing } from "@prisma/client";
import { getAllCurrencies } from "@/actions/superAdmin/superAdminBillingModule/get-all-currencies";
import ConnectPricingWithStripe from "../../../../ui/ConnectPricingWithStripe";
import PlanStripeContection from "./PlanStripeContection";
import { IPricing } from "@/interfaces/billingModule";
import { Button } from "@/components/ui/button";

const PlanPricingSection = async ({
  plan,
  pricings,
}: {
  plan: Plan;
  pricings: Pricing[];
}) => {
  const currencies = await getAllCurrencies();
  return (
    <div className="space-y-12">
      <div className="w-full">
        <div className="space-y-12">
          <div className={`grid grid-cols-1 gap-x-8 md:grid-cols-3`}>
            <div className="p-7 lg:col-span-1">
              <h2 className="text-subtitle">Plan pricings</h2>
              <p className="text-primary mt-3 text-sm leading-6">
                Manage pricings of this Plan
              </p>
            </div>

            <div className="flex w-full max-w-md flex-col pt-7 lg:col-span-2">
              <div className="flex justify-between">
                <Link
                  className="ml-4"
                  href={`/admin/billing/plans/plans/edit/${plan.id}/addPricing`}
                >
                  <Button>
                    <PlusCircleIcon className="h-6 w-6" />
                    Add Pricing
                  </Button>
                </Link>
              </div>
              <div>
                {pricings?.map((pricing: IPricing, index: number) => (
                  <div
                    key={`currency-${index}`}
                    className="bg-main mt-4 flex flex-col space-y-3 rounded-md p-4 shadow-md"
                  >
                    <div className="flex w-full justify-between">
                      <span className="text-primary text-lg">
                        ${pricing.price.toFixed(2)} (ID: {pricing.id})
                      </span>
                      <div className="flex flex-col">
                        <span className="text-primary text-sm">
                          Frequency: {pricing.frequency}
                        </span>
                        <span className="text-primary text-sm">
                          Estado: {pricing.status}
                        </span>
                      </div>
                      <div className="flex space-x-3">
                        <Link
                          href={`/admin/billing/plans/plans/edit/${plan.id}/editPricing/${pricing.id}`}
                        >
                          <button className="btn-icon">
                            <PencilIcon className="h-6 w-6" />
                          </button>
                        </Link>

                        <DeleteModel
                          modelId={pricing.id as number}
                          primaryModelId={plan.id as number}
                          deleteAction={deletePlanPrice}
                        />
                      </div>
                    </div>
                    <hr />
                    <span>Stripe Price Connection</span>
                    {plan.stripeProductId ? (
                      <ConnectPricingWithStripe
                        pricing={pricing}
                        currencies={currencies}
                        settings={pricing.settings}
                        path={`/admin/billing/plans/plans/edit/${plan.id}`}
                        stripeProductId={plan.stripeProductId}
                      />
                    ) : (
                      <div className="bg-main flex flex-col items-center rounded-md p-7">
                        <span className="text-primary">
                          Please connect the plan with stripe first
                        </span>

                        <PlanStripeContection plan={plan} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanPricingSection;

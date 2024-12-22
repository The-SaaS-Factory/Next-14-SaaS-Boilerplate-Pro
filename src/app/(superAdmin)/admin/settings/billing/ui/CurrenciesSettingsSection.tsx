import { getAllCurrencies } from "@/actions/superAdmin/superAdminBillingModule/get-all-currencies";
import Link from "next/link";
import { PencilIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import DeleteModel from "@/components/core/DeleteModel";
import { deleteCurrency } from "@/actions/superAdmin/superAdminBillingModule/delete-currency";
import { Button } from "@/components/ui/button";

const CurrenciesSettingsSection = async () => {
  const currencies = await getAllCurrencies();
  return (
    <div className="space-y-12">
      <div className="w-full">
        <div className="space-y-12">
          <div className={`grid grid-cols-1 gap-x-8 md:grid-cols-3`}>
            <div className="p-7 lg:col-span-1">
              <h2 className="text-subtitle">Currencies </h2>
              <p className="text-primary mt-3 text-sm leading-6">
                Manage the currencies accepted on the platform.
              </p>
            </div>

            <div className="flex w-full max-w-md flex-col pt-7 lg:col-span-2">
              <div className="flex justify-between">
                <h2 className="text-subtitle">
                  Currencies
                  <span className="text-sm">({currencies?.length})</span>
                </h2>
                <Link
                  className="ml-3"
                  href="/admin/settings/billing/addCurrency"
                >
                  <Button variant="outline">
                    <PlusCircleIcon className="h-6 w-6" />
                    Add currency
                  </Button>
                </Link>
              </div>
              <div>
                {currencies?.map((currency: any, index: number) => (
                  <div
                    key={`currency-${index}`}
                    className="bg-main mt-4 flex flex-row items-center justify-between rounded-md p-4 shadow-md"
                  >
                    <div className="flex w-full justify-between">
                      <span className="text-primary text-sm">
                        {currency.name}
                      </span>
                      <div className="flex items-center space-x-3">
                        <Link
                          href={`/admin/settings/billing/editCurrency/${currency.id}`}
                        >
                          <Button variant="outline">
                            <PencilIcon className="h-6 w-6" />
                          </Button>
                        </Link>

                        <DeleteModel
                          modelId={currency.id}
                          deleteAction={deleteCurrency}
                        />
                      </div>
                    </div>
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

export default CurrenciesSettingsSection;

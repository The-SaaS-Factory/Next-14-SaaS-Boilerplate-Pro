import { getAllCurrencies } from "@/actions/superAdmin/superAdminBillingModule/get-all-currencies";
import Link from "next/link";
import { PencilIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import DeleteModel from "@/components/core/DeleteModel";
import { deleteCurrency } from "@/actions/superAdmin/superAdminBillingModule/delete-currency";

const CurrenciesSettingsSection = async () => {
  const currencies = await getAllCurrencies();
  return (
    <div className="space-y-12">
      <div className="w-full">
        <div className="space-y-12">
          <div className={`grid grid-cols-1 gap-x-8  md:grid-cols-3`}>
            <div className="lg:col-span-1 p-7">
              <h2 className="text-subtitle">Currencies </h2>
              <p className="mt-3 text-sm leading-6 text-primary">
                Manage the currencies accepted on the platform.
              </p>
            </div>

            <div className="lg:col-span-2 flex flex-col w-full max-w-md pt-7">
              <div className="flex justify-between">
                <h2 className="text-subtitle">
                  Currencies
                  <span className="text-sm">({currencies?.length})</span>
                </h2>
                <Link
                  className="ml-3"
                  href="/admin/settings/billing/addCurrency"
                >
                  <button className="btn-icon">
                    <PlusCircleIcon className="w-6 h-6" />
                    Add currency
                  </button>
                </Link>
              </div>
              <div>
                {currencies?.map((currency: any, index: number) => (
                  <div
                    key={`currency-${index}`}
                    className="flex flex-row justify-between items-center bg-main rounded-md shadow-md p-4 mt-4"
                  >
                    <div className="flex w-full justify-between">
                      <span className="text-sm text-primary">
                        {currency.name}
                      </span>
                      <div className="flex space-x-3">
                        <Link
                          href={`/admin/settings/billing/editCurrency/${currency.id}`}
                        >
                          <button className="btn-icon">
                            <PencilIcon className="w-6 h-6" />
                          </button>
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

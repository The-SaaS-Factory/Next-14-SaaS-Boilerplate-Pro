import Link from "next/link";
import { PencilIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import DeleteModel from "@/components/core/DeleteModel";
import { getPaymentMethods } from "@/actions/superAdmin/superAdminBillingModule/get-all-payment-methods";
import { PaymentMethod } from "@prisma/client";
import { deletePaymentMethod } from "@/actions/superAdmin/superAdminBillingModule/delete-payment-methods";
import { Button } from "@/components/ui/button";

const PaymentMethodsSection = async () => {
  const paymentMethods = await getPaymentMethods();
  return (
    <div className="space-y-12">
      <div className="w-full">
        <div className="space-y-12">
          <div className={`grid grid-cols-1 gap-x-8 md:grid-cols-3`}>
            <div className="p-7 lg:col-span-1">
              <h2 className="text-subtitle">Payment Methods</h2>
              <p className="text-primary mt-3 text-sm leading-6">
                Manage payments gateways and methods.
              </p>
            </div>

            <div className="flex w-full max-w-md flex-col pt-7 lg:col-span-2">
              <div className="flex justify-between">
                <h2 className="text-subtitle">
                  Payment Methods Added
                  <span className="text-sm">({paymentMethods?.length})</span>
                </h2>
                <Link
                  className="ml-3"
                  href="/admin/settings/billing/addPaymentMethod"
                >
                  <Button variant="outline">
                    <PlusCircleIcon className="h-6 w-6" />
                    Add Payment Method
                  </Button>
                </Link>
              </div>
              <div>
                {paymentMethods?.map(
                  (payment: PaymentMethod, index: number) => (
                    <div
                      key={`currency-${index}`}
                      className="bg-main mt-4 flex flex-row items-center justify-between rounded-md p-4 shadow-md"
                    >
                      <div className="flex w-full justify-between">
                        <span className="text-primary text-sm">
                          {payment.name}
                        </span>

                        <span className="text-primary text-sm">
                          Estado: {payment.status}
                        </span>
                        <div className="flex space-x-3">
                          <Link
                            href={`/admin/settings/billing/editPaymentMethod/${payment.id}`}
                          >
                            <Button variant="outline">
                              <PencilIcon className="h-6 w-6" />
                            </Button>
                          </Link>

                          <DeleteModel
                            modelId={payment.id}
                            deleteAction={deletePaymentMethod}
                          />
                        </div>
                      </div>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodsSection;

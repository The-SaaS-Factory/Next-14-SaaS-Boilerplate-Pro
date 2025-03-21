"use client";
import { RadioGroup } from "@headlessui/react";
import { Dialog, Transition } from "@headlessui/react";
import {
  CheckBadgeIcon,
  CurrencyDollarIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Fragment, useEffect, useRef, useState } from "react";
import { classNames } from "@/utils/facades/frontendFacades/strFacade";
import Image from "next/image";
import Link from "next/link";
import { AdminCurrencies, PaymentMethod } from "@prisma/client";
import { Select, SelectItem } from "@tremor/react";
import { parsePriceInLocalCurrency } from "@/utils/facades/frontendFacades/parseValuesFacade";
import { IPricing, PlanType } from "@/interfaces/billingModule";
import { constants } from "@/lib/constants";
import usePaymentMethods from "@/utils/hooks/usePaymentMethods";
import { toast } from "sonner";
import { activateTrialPlan } from "@/actions/superAdmin/superAdminBillingModule/activate-trial-plan";
import { useSession } from "next-auth/react";

const onlyStripe = true;

export type SettingType = {
  settingName: string;
  settingValue: string;
};

type PageParams = {
  payments: any;
  plans: any;
  currencies: AdminCurrencies[];
  paymentMethods: PaymentMethod[];
};

const PlansComponent = ({ plans, currencies, paymentMethods }: PageParams) => {
  const [currencySelected, setCurrencySelected] = useState<any>(
    currencies.find((currency: AdminCurrencies) => currency.main),
  );

  const [selectMethodModal, setSelectMethodModal] = useState(false);
  const handleSetOpenModal = () => setSelectMethodModal(!selectMethodModal);
  const [planSelected, setPlanSelected] = useState<any>(null);
  const [pricing, setPricing] = useState<any>({
    frequencies: [
      { value: "month", label: "Monthly", priceSuffix: "/month" },
      { value: "year", label: "Yearly", priceSuffix: "/year" },
    ],
  });
  const [frequency, setFrequency] = useState(pricing.frequencies[0]);

  useEffect(() => {
    const allFrequencies: string[] = [];

    plans?.map((plan: PlanType) => {
      plan.pricing?.map((pricing: IPricing) => {
        if (plan.status === "ACTIVE") {
          if (!allFrequencies.includes(pricing.frequency)) {
            allFrequencies.push(pricing.frequency);
          }
        }
      });
    });

    if (allFrequencies.length > 0) {
      const formattedTypes: any = allFrequencies.map((typeName) => ({
        value: typeName,
        label: typeName.charAt(0).toUpperCase() + typeName.slice(1),
        priceSuffix: `/${typeName}`,
      }));

      setPricing({
        frequencies: [...formattedTypes],
      });

      setFrequency(formattedTypes[0]);
    }
  }, [plans]);

  const parseFrequencyName = (name: string) => {
    if (name === "Year") {
      return "Annually";
    }
    return name;
  };

  const handleConvertCurrency = (price: number) => {
    return price * currencySelected.rate;
  };

  const handleActivateTrialPlan = async (planId: number, pricingId: number) => {
    await activateTrialPlan({
      planId,
      pricingId,
      currencyId: currencySelected.id,
    })
      .then(() => {
        toast.success("Test plan activated successfully");
        window.location.reload();
        window.location.href = "/home/settings/billing/planActive";
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const { payWithStripe } = usePaymentMethods(
    currencySelected.id,
    paymentMethods,
  );

  return (
    <div>
      <SelectPaymentMethod
        open={selectMethodModal}
        setOpen={handleSetOpenModal}
        pricingSelected={planSelected}
        paymentMethods={paymentMethods}
        currencySelected={currencySelected}
      />
      <div className="bg-transparent">
        <div className="mx-auto flex w-14 justify-center py-7">
          <Select
            className="mx-auto w-full"
            defaultValue={currencySelected?.code ?? "usd"}
            onValueChange={(value) => {
              setCurrencySelected(
                currencies.find(
                  (currency: AdminCurrencies) => currency.code === value,
                ),
              );
            }}
            icon={CurrencyDollarIcon}
          >
            {currencies?.map((currency: AdminCurrencies) => (
              <SelectItem key={`currency-${currency.id}`} value={currency.code}>
                {currency.name}
              </SelectItem>
            ))}
          </Select>
        </div>

        <section id="Membership">
          <div className="mx-auto mt-3 flex max-w-7xl flex-col px-6 lg:px-8">
            <div className="mx-auto max-w-4xl sm:text-center">
              <h2 className="text-base font-semibold leading-7 text-indigo-600">
                Prices
              </h2>
              <p className="mega-title mt-2">
                Membership plans in {constants.appName}
              </p>
            </div>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600 sm:text-center"></p>

            <div className="max-lg my-14 flex justify-between px-7">
              <div></div>
              <div className="mx-auto flex w-full max-w-lg">
                {pricing.frequencies.length > 1 && (
                  <div className="mx-auto w-full items-center">
                    <div className=" ">
                      <RadioGroup
                        value={frequency}
                        onChange={setFrequency}
                        className={`grid grid-cols-${pricing.frequencies.length} gap-x-1 rounded-full p-1 text-center text-xs font-semibold leading-5 ring-1 ring-inset ring-gray-200`}
                      >
                        <RadioGroup.Label className="sr-only">
                          Frequency
                        </RadioGroup.Label>
                        {pricing.frequencies.map((option: any) => (
                          <RadioGroup.Option
                            key={option.value}
                            value={option}
                            className={() =>
                              classNames(
                                frequency.value === option.value
                                  ? "bg-indigo-600 text-white"
                                  : "text",
                                "cursor-pointer rounded-full px-2.5 py-1",
                              )
                            }
                          >
                            <span>{parseFrequencyName(option.label)}</span>
                          </RadioGroup.Option>
                        ))}
                      </RadioGroup>
                    </div>
                    <div></div>
                  </div>
                )}
              </div>
            </div>
            <div className="flex w-full">
              <div className="mx-auto mt-3 grid grid-cols-1 gap-4 p-3 md:grid-cols-2 lg:grid-cols-3">
                {plans?.map((plan: PlanType) => {
                  return plan.pricing
                    ?.filter(
                      (pricing: IPricing) =>
                        pricing.frequency === frequency.value &&
                        plan.status === "ACTIVE",
                    )
                    .map((tier: any) => (
                      <div key={plan.id} className="col-span-1">
                        <div
                          key={tier.id}
                          className="rounded-2xl border border-gray-200 p-7"
                        >
                          <h2
                            id={tier.id}
                            className="title text-lg font-semibold leading-8"
                          >
                            {plan.name}
                          </h2>
                          <div
                            className="magic-link subtitle mt-4 max-w-sm text-sm leading-6"
                            dangerouslySetInnerHTML={{
                              __html: plan.description ?? "",
                            }}
                          ></div>
                          <p className="mt-6 flex items-baseline gap-x-1">
                            <span className="mega-title text-4xl font-bold tracking-tight">
                              {parsePriceInLocalCurrency(
                                handleConvertCurrency(tier.price),
                                currencySelected.code,
                              )}
                            </span>
                            <span className="text-sm font-semibold leading-6 text-gray-600">
                              {frequency.priceSuffix}
                            </span>
                          </p>
                          <ul
                            role="list"
                            className="my-3 space-y-3 divide-y divide-gray-100"
                          >
                            {plan.PlanCapabilities?.map(
                              (capa: any, index: number) => {
                                return (
                                  <li
                                    key={`capa-${index}`}
                                    className="text flex items-center space-x-3 p-1"
                                  >
                                    {capa.capabilitie?.type === "PERMISSION" ? (
                                      <div className="flex items-center space-x-3">
                                        {capa.count === 1 ? (
                                          <button className="mr-2">
                                            {" "}
                                            <CheckBadgeIcon className="h-5 w-5 text-green-500" />{" "}
                                          </button>
                                        ) : (
                                          <button className="mr-2">
                                            {" "}
                                            <XMarkIcon
                                              className="h-5 w-5 text-red-500"
                                              aria-hidden="true"
                                            />
                                          </button>
                                        )}{" "}
                                        <div className="flex flex-col">
                                          <span>{capa.capabilitie.name}</span>
                                          <p className="text text-sm">
                                            {capa.capabilitie.description}
                                          </p>
                                        </div>
                                      </div>
                                    ) : (
                                      <li className="text flex items-center space-x-3 p-1">
                                        <CheckBadgeIcon className="h-5 w-5 text-green-500" />{" "}
                                        <span>
                                          {capa.count} {capa.capabilitie.name}{" "}
                                          {capa.capabilitie.type === "LIMIT" &&
                                            "/ month"}
                                        </span>
                                      </li>
                                    )}{" "}
                                  </li>
                                );
                              },
                            )}
                          </ul>

                          <div className="flex space-x-3">
                            {plan.freeTrialDays && plan.freeTrialDays > 0 && (
                              <button
                                onClick={() => {
                                  handleActivateTrialPlan(plan.id, tier.id);
                                }}
                                className={classNames(
                                  tier.mostPopular
                                    ? "bg-indigo-600 text-white shadow-sm hover:bg-indigo-500"
                                    : "text-indigo-600 ring-1 ring-inset ring-indigo-200 hover:ring-indigo-300",
                                  "mt-6 block rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600",
                                )}
                              ></button>
                            )}

                            <button
                              onClick={() => {
                                setPlanSelected(tier);
                                if (!onlyStripe) {
                                  setSelectMethodModal(true);
                                } else {
                                  payWithStripe("PLAN", tier.id);
                                }
                              }}
                              className={classNames(
                                tier.mostPopular
                                  ? "bg-indigo-600 text-white shadow-sm hover:bg-indigo-500"
                                  : "text-indigo-600 ring-1 ring-inset ring-indigo-200 hover:ring-indigo-300",
                                "mt-6 block rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600",
                              )}
                            >
                              Buy Plan
                            </button>
                          </div>
                        </div>
                      </div>
                    ));
                })}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export function SelectPaymentMethod({
  open,
  setOpen,
  currencySelected,
  paymentMethods,
  pricingSelected,
}: {
  open: boolean;
  setOpen: () => void;
  currencySelected: any;
  paymentMethods: any;
  pricingSelected: any;
}) {
  const cancelButtonRef = useRef(null);

  const {
    paymentMethosAvailables,
    payWithStripe,
    payWithQvapay,
    payWithCUP,
    payWithWallet,
  } = usePaymentMethods(currencySelected.id, paymentMethods);

  const handleSelectPaymentMethod = (paymentMethod: any) => {
    if (paymentMethod.name === "Stripe") {
      payWithStripe("PLAN", pricingSelected.id);
    }
    if (paymentMethod.name === "CUP en Cuba") {
      payWithCUP("PLAN", pricingSelected.id);
    }
    if (paymentMethod.name === "QvaPay") {
      payWithQvapay("PLAN", pricingSelected.id);
    }
    if (paymentMethod.name === "Wallet") {
      payWithWallet("PLAN", pricingSelected.id);
    }
  };

  const { data: session } = useSession();

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel
                className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6"
                style={{ width: "100%" }}
              >
                {session ? (
                  <>
                    <div>
                      <div className="mt-3 text-center sm:mt-5">
                        <Dialog.Title
                          as="h3"
                          className="text text-base font-semibold leading-6"
                        >
                          Select {currencySelected.name}
                        </Dialog.Title>
                      </div>
                    </div>
                    <div className="mt-14 flex flex-col space-y-3">
                      <div className="my-7 flex flex-col space-y-3">
                        {paymentMethosAvailables.map((paymentMethod) => {
                          return (
                            <div
                              className="flex items-center space-x-3"
                              key={paymentMethod.id}
                            >
                              <button
                                type="button"
                                className="inline-flex w-full justify-center rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                onClick={() => {
                                  handleSelectPaymentMethod(paymentMethod);
                                }}
                              >
                                Pay with {paymentMethod.name}
                                {paymentMethod.image && (
                                  <Image
                                    width={100}
                                    height={30}
                                    src={paymentMethod.image}
                                    className="ml-3 h-5 w-auto"
                                    alt="Stripe"
                                  />
                                )}
                              </button>
                            </div>
                          );
                        })}
                      </div>

                      <br />
                      <button
                        type="button"
                        className="text-primary mt-7 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                        onClick={() => setOpen()}
                        ref={cancelButtonRef}
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col space-y-7">
                    <h2 className="title pt-7 text-center">Necesitas login</h2>
                    <Link href={"/home"} className="btn-main mx-auto">
                      Acceder
                    </Link>
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default PlansComponent;

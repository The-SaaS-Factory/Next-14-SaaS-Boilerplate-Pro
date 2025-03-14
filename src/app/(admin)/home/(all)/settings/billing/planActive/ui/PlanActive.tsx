"use client";
import React from "react";
import { Card, Flex, ProgressBar, Text } from "@tremor/react";
import { PlanCapabilitieType } from "@/interfaces/userModule";
import { CheckBadgeIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { ISubscription } from "@/interfaces/saasTypes";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const PlanActive = ({
  subscription,
  planCapabilities,
  usedCapabilities,
}: {
  subscription: ISubscription;
  planCapabilities: PlanCapabilitieType[];
  usedCapabilities: any[];
}) => {
  const getUserCountCapabilitie = (capabilityId: number) => {
    const capabilitie = usedCapabilities?.find(
      (c: any) => c.capabilityId === capabilityId,
    );
    return capabilitie ? capabilitie.count : 0;
  };

  const getPorcent = (userCount: number, planCount: number) => {
    return (userCount * 100) / planCount;
  };

  return (
    <div>
      <Card className="my-7">
        <div className="my-3 flex items-center space-x-3">
          <span>Your current plan is:</span>
          <span className="font-bold"> {subscription?.plan?.name}</span>
          <Link href={"/home/settings/billing/buyPlan"}>
            <Button variant="secondary" className="w-full">
              Upgrade
              <span className="relative ml-3 flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
                <span className="relative inline-flex h-3 w-3 rounded-full bg-sky-500"></span>
              </span>
            </Button>
          </Link>
        </div>
        <hr />
        <br />
        {planCapabilities?.filter((c: any) => c.capabilitie?.type === "LIMIT")
          .length > 0 && (
          <div>
            <h2 className="title">Current use:</h2>
            <div className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-3">
              {planCapabilities
                ?.filter((c: any) => c.capabilitie.type === "LIMIT")
                .map((capabilitie: any, index: number) => (
                  <Flex key={`capabilitie-${index}`}>
                    <Card className="mx-auto max-w-lg">
                      <Text>{capabilitie.capabilitie?.name}</Text>
                      <Flex>
                        <Text>
                          {getUserCountCapabilitie(capabilitie.capabilityId)}
                        </Text>
                        <Text>max {capabilitie.count}</Text>
                      </Flex>
                      <ProgressBar
                        value={getPorcent(
                          getUserCountCapabilitie(capabilitie.capabilityId),
                          capabilitie.count,
                        )}
                        color="sky"
                        className="mt-3"
                      />
                    </Card>
                  </Flex>
                ))}
            </div>
            <hr className="my-7" />
          </div>
        )}
        <div>
          <h2 className="title">Features and limits of plans</h2>
          <ul
            role="list"
            className="my-3 grid grid-cols-2 space-y-3 divide-y divide-gray-100 lg:grid-cols-1"
          >
            {planCapabilities?.map((capa: any, index: number) => (
              <li
                key={`capa-${index}`}
                className="flex items-center space-x-3 p-1"
              >
                {capa.capabilitie.type === "PERMISSION" ? (
                  capa.count == 1 ? (
                    <Button variant="ghost" className="mr-2">
                      {" "}
                      <CheckBadgeIcon className="h-5 w-5 text-green-500" />
                    </Button>
                  ) : (
                    <Button variant="ghost" className="mr-2">
                      {" "}
                      <XMarkIcon className="h-5 w-5 text-red-500" />
                    </Button>
                  )
                ) : (
                  capa.count
                )}{" "}
                {capa.capabilitie.name}{" "}
                {capa.capabilitie.type === "LIMIT" && "/ month"}
              </li>
            ))}
          </ul>
        </div>
      </Card>
    </div>
  );
};

export default PlanActive;

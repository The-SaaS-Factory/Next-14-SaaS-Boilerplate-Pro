"use client";
import { connectCapabilitieWithPlan } from "@/actions/superAdmin/superAdminBillingModule/connect-capabilitie-with-plan";
import { Button } from "@/components/ui/button";
import { Capability } from "@prisma/client";
import { Select, SelectItem, TextInput } from "@tremor/react";
import React, { useState } from "react";
import { toast } from "sonner";

const UpsertPlanCapabilities = ({
  planOnEdit,
  capabilities,
}: {
  planOnEdit: any;
  capabilities: Capability[];
}) => {
  //States
  const [newDataForCapabilitie, setDataForCapabilitie] = useState(0);

  const saveCapabilitieForPlan = (capabilityId: any, capabilitieName: any) => {
    if (planOnEdit) {
      const payload = {
        capabilityId: parseInt(capabilityId),
        planId: parseInt(planOnEdit.id),
        count: newDataForCapabilitie,
        name: capabilitieName,
      };

      connectCapabilitieWithPlan(payload)
        .then(() => toast.success(" Capability saved"))
        .catch((e) => toast.error(e.message));
    }
  };

  return (
    <div>
      {planOnEdit && (
        <div>
          <div className="w-full">
            <div className="space-y-12">
              <div
                className={`grid grid-cols-3 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12`}
              >
                <div className="p-7 lg:col-span-1">
                  <h2 className="text-subtitle">Capabilities</h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    {" "}
                    Set the capabilities for this plan
                  </p>
                </div>

                <div className="lg:col-span-2">
                  {capabilities
                    ?.filter((c: any) => c.group === planOnEdit.group)
                    .map((capabilitie: any, index: number) => (
                      <div key={`capabilitie-${index}`} className="mt-2">
                        <label
                          htmlFor={capabilitie.name}
                          className="text block text-sm font-medium leading-6"
                        >
                          {capabilitie.name}
                          <span className="ml-1 font-medium text-sky-500">
                            {" "}
                            Current
                          </span>
                          <span className="ml-1 font-medium text-sky-500">
                            {" "}
                            {capabilitie.type === "LIMIT" ||
                            capabilitie.type === "AMOUNT"
                              ? (planOnEdit.PlanCapabilities?.find(
                                  (c: { capabilityId: number }) =>
                                    c.capabilityId == capabilitie.id,
                                )?.count ?? "Not set")
                              : ""}
                          </span>
                          <span className="ml-1 font-medium text-sky-500">
                            {" "}
                            {capabilitie.type === "PERMISSION"
                              ? (planOnEdit.PlanCapabilities?.find(
                                  (c: { capabilityId: number }) =>
                                    c.capabilityId == capabilitie.id,
                                )?.count ?? null)
                                ? "Yes"
                                : "No"
                              : ""}
                          </span>
                        </label>
                        <div className="my-3 flex space-x-3 rounded-md sm:max-w-md">
                          {capabilitie.type === "LIMIT" ||
                          capabilitie.type === "AMOUNT" ? (
                            <TextInput
                              onValueChange={(value) =>
                                setDataForCapabilitie(parseInt(value))
                              }
                              min={0}
                            />
                          ) : (
                            <Select
                              onValueChange={(value: string) =>
                                setDataForCapabilitie(parseInt(value))
                              }
                            >
                              <SelectItem value="">-Change-</SelectItem>
                              <SelectItem value="1">Yes </SelectItem>
                              <SelectItem value="0">No</SelectItem>
                            </Select>
                          )}
                          <Button
                            onClick={() =>
                              saveCapabilitieForPlan(
                                capabilitie.id,
                                capabilitie.name,
                              )
                            }
                          >
                            Save
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpsertPlanCapabilities;

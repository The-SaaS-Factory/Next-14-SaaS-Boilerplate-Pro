import PageName from "@/components/ui/commons/PageName";
import React from "react";
import { Metadata } from "next";
import UpsertPlan from "../ui/UpsertPlan";

export const metadata: Metadata = {
  title: "Nuevo Plan",
};

const SuperADminBillingModuleNewPlanPage = () => {
  return (
    <div>
      <PageName isSubPage={true} name={"Nuevo Plan"} />
      <UpsertPlan />
    </div>
  );
};

export default SuperADminBillingModuleNewPlanPage;

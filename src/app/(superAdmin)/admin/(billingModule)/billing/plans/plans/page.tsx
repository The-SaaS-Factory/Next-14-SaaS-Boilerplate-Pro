import PageName from "@/components/ui/commons/PageName";
import React from "react";
import { Metadata } from "next";
import BillingPlansList from "./ui/BillingPlansList";

export const metadata: Metadata = {
  title: "Plans",
};

const SuperAdminBillingPlansModulePage = ({
  params: { locale },
}: {
  params: { locale: string };
}) => {
  return (
    <div>
      <PageName
        name={"Plans"}
        isSubPage={true}
        btn1={{
          name: "Add plan",
          href: "plans/add",
        }}
      />
      <BillingPlansList />
    </div>
  );
};

export default SuperAdminBillingPlansModulePage;

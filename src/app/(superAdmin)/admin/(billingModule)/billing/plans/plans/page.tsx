import PageName from "@/components/ui/commons/PageName";
import React, { Suspense } from "react";
import { Metadata } from "next";
import BillingPlansList from "./ui/BillingPlansList";
import { getAllPlans } from "@/actions/superAdmin/superAdminBillingModule/get-all-plans";
import TableLoaderSkeleton from "@/components/ui/loaders/TableLoaderSkeleton";

export const metadata: Metadata = {
  title: "Plans",
};

const SuperAdminBillingPlansModulePage = async () => {
  const { data } = await getAllPlans();
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
      <Suspense fallback={<TableLoaderSkeleton count={10} />}>
        <BillingPlansList data={data} />
      </Suspense>
    </div>
  );
};

export default SuperAdminBillingPlansModulePage;

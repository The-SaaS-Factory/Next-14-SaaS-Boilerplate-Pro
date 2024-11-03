"use client";
import React, { useEffect } from "react";
import { getPlanByName } from "@/actions/superAdmin/superAdminBillingModule/get-plan-by-name";
import { useRouter } from "next/navigation";
import PlanActive from "./ui/PlanActive";
import PaymentStatusAlert from "../../ui/PaymentStatusAlert";
import { getUserCapabilities } from "@/actions/admin/userModule/get-user-capabilities";
import { useMembership } from "@/utils/hooks/useMembership";

const AdminPlanActive = ({
  searchParams,
}: {
  searchParams?: {
    paymentStatus?: string;
  };
}) => {
  const router = useRouter();
  const [planCapabilities, setPlanCapabilities] = React.useState<any[]>([]);
  const [capacitiesUsed, setCapacitiesUsed] = React.useState<any[]>([]);

  //Queries
  const getPlan = async (name: string) => {
    return await getPlanByName(name);
  };

  const { organization } = useMembership();

  useEffect(() => {
    if (organization) {
      if (!organization.subscription?.plan?.name) {
        router.push("buyPlan", { scroll: false });
      }

      getPlan(organization.subscription?.plan?.name).then((data) => {
        if (!data) return;
        setPlanCapabilities(data.PlanCapabilities);
      });

      getUserCapabilities().then((data) => {
        if (!data) return;

        setCapacitiesUsed(data);
      });
    }
  }, [organization]);

  return (
    <div>
      <PlanActive
        subscription={organization?.subscription}
        planCapabilities={planCapabilities}
        usedCapabilities={capacitiesUsed}
      />
      <PaymentStatusAlert status={searchParams?.paymentStatus} />
    </div>
  );
};

export default AdminPlanActive;

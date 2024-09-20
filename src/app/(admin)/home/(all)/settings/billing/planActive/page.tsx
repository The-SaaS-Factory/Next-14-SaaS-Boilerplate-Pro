import React, { Suspense } from "react";
import PaymentStatusAlert from "../../ui/PaymentStatusAlert";
const AdminPlanActive = async ({
  searchParams,
}: {
  searchParams?: {
    paymentStatus?: string;
  };
}) => {
  return (
    <div>
      <Suspense></Suspense>
      <PaymentStatusAlert status={searchParams?.paymentStatus} />
    </div>
  );
};

export default AdminPlanActive;

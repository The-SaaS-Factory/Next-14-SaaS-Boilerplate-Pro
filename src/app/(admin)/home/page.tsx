import React from "react";
import { Metadata } from "next";

import AgencyDashboard from "./(tenant)/admin/dashboard/page";
import DemoBanner from "@/components/core/DemoBanner";
import { constants } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Home",
};

const SuperAdminDashboardPage = async () => {
  return (
    <>
      {constants.demoMode && <DemoBanner />}
      <AgencyDashboard />
    </>
  );
};

export default SuperAdminDashboardPage;

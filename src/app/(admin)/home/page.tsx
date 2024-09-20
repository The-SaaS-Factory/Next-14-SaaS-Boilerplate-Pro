import React from "react";
import { Metadata } from "next";

import AgencyDashboard from "./(tenant)/admin/dashboard/page";

export const metadata: Metadata = {
  title: "Home",
};

const SuperAdminDashboardPage = async () => {
  return (
    <>
      <AgencyDashboard />
    </>
  );
};

export default SuperAdminDashboardPage;

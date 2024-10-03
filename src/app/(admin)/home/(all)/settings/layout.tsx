import React, { ReactNode } from "react";
import SettingsTabs from "./ui/SettingsTabs";
import PageName from "@/components/ui/commons/PageName";
import { Metadata } from "next";
import { getMembership } from "@/utils/facades/serverFacades/userFacade";

import { isOrganizationAdmin } from "@/utils/facades/serverFacades/securityFacade";
export const metadata: Metadata = {
  title: "Settings",
};

const SettingRoot = async ({ children }: { children: ReactNode }) => {
  const { organization, userMembership } = await getMembership();

  return (
    <div>
      <PageName name={"Settings"} />
      <SettingsTabs
        isOrganizationAdmin={isOrganizationAdmin(userMembership)}
        profile={organization}
      />
      <div>{children}</div>
    </div>
  );
};

export default SettingRoot;

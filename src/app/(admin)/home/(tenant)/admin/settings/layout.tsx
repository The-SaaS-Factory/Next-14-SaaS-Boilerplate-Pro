import React, { ReactNode } from "react";
import PageName from "@/components/ui/commons/PageName";
import { Metadata } from "next";
import CastingSettingsTabs from "./ui/CastingSettingsTabs";

export const metadata: Metadata = {
  title: "Ajustes de Castings",
};

const AgencyCastingSettingsRoot = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <PageName
        name={"Ajustes de Castings"}
        breadcrumbs={[
          { name: "Dashboard", href: "/home" },
          {
            name: "Castings Settings",
            href: "/home/admin/castings/settings/roles",
          },
        ]}
        
      />
      <CastingSettingsTabs />
      <div className="py-3">{children}</div>
    </div>
  );
};

export default AgencyCastingSettingsRoot;

import React, { ReactNode } from "react";
import SettingsTabs from "./ui/SettingsTabs";
import PageName from "@/components/ui/commons/PageName";
import { Metadata } from "next";
 import { getMembership} from "@/utils/facades/serverFacades/userFacade";
 
export const metadata: Metadata = {
  title: "Ajustes",
};

const SettingRoot = async ({ children }: { children: ReactNode }) => {

  const profile = await getMembership();
  return (
    <div>
      <PageName
        name={"Ajustes"}
        
      />
      <SettingsTabs profile={profile} />
      <div>{children}</div>
    </div>
  );
};

export default SettingRoot;

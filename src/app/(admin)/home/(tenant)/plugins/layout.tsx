import React, { ReactNode } from "react";
import PageName from "@/components/ui/commons/PageName";
import PluginsTabs from "./ui/PluginsTabs";
import { constants } from "@/lib/constants";

const TenentPluginsRoot = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      {constants.multiTenant ? (
        <>
          <PageName
            name={"Plugins"}
            breadcrumbs={[
              {
                name: "Dashboard",
                href: "/home",
              },
              {
                name: "Plugins",
                href: "/home/plugins/actives",
              },
            ]}
          />
          <PluginsTabs />
          <div>{children}</div>
        </>
      ) : (
        <div>
          <div>{children}</div>
        </div>
      )}
    </div>
  );
};

export default TenentPluginsRoot;

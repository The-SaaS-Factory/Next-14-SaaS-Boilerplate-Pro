import React, { ReactNode } from "react";
import { Metadata } from "next";

import FactoryTabs from "./ui/FactoryTabs";
import ProjectHeader from "./ui/ProjectHeader";
export const metadata: Metadata = {
  title: "The Factory",
};

const SettingRootFactory = async ({
  children,
  params: { projectId },
}: {
  children: ReactNode;
  params: { projectId: number };
}) => {
  return (
    <div className="-mt-4 lg:-mt-8">
      <FactoryTabs />

      <div className="lg:p-3">
        <div className="flex flex-col space-y-3">
          <ProjectHeader projectId={Number(projectId)} />
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default SettingRootFactory;

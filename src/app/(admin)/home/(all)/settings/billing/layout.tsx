import { ReactNode } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings",
};

const AdminSettingsModuleGeneralPage = async ({
  children,
}: {
  children: ReactNode;
}) => {
  return (
    <div className="mt-1">
      <div>
        <div className="-mt-3 bg-white"></div>

        <div>{children}</div>
      </div>
    </div>
  );
};

export default AdminSettingsModuleGeneralPage;

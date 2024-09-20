import { ReactNode } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Configuraciones",
};

const AdminSettingsModuleGeneralPage = async ({
  children,
}: {
  children: ReactNode;
}) => {
  return (
    <div className="mt-1">
      <div>
        <div className="bg-white -mt-3 "></div>

        <div>{children}</div>
      </div>
    </div>
  );
};

export default AdminSettingsModuleGeneralPage;

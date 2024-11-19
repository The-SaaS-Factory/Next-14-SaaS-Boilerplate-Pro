import { Metadata } from "next";
import { ReactNode } from "react";
export const metadata: Metadata = {
  title: "Saas Develpment Services",
};

const BoilerplatesAdminRoot = async ({ children }: { children: ReactNode }) => {
  return <main>{children}</main>;
};
export default BoilerplatesAdminRoot;

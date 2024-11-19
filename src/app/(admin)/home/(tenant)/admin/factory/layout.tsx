import { Metadata } from "next";
import { ReactNode } from "react";
export const metadata: Metadata = {
  title: "Saas Factory",
};

const SaasFactoryAdminRoot = async ({ children }: { children: ReactNode }) => {
  return <div >{children}</div>;
};
export default SaasFactoryAdminRoot;

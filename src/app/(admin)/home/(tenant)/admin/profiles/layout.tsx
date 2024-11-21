import { Metadata } from "next";
import { ReactNode } from "react";
export const metadata: Metadata = {
  title: "My profiles",
};

const ProfileAdminRoot = async ({ children }: { children: ReactNode }) => {
  return <div>{children}</div>;
};
export default ProfileAdminRoot;

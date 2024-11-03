import PageName from "@/components/ui/commons/PageName";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function TenantDashboard() {
  return (
    <div>
      <PageName name="Dashboard" />
      <span>Your tenant dashboard here</span>;
    </div>
  );
}

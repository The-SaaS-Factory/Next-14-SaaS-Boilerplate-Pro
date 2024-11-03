import PageName from "@/components/ui/commons/PageName";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Other Section Example",
};

export default function TenantSectionExample1() {
  return (
    <div>
      <PageName name="Section 1 example title" />
      <span>Your Section content here</span>;
    </div>
  );
}

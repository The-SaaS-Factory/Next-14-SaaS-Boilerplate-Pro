import PageName from "@/components/ui/commons/PageName";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Other Section Example 2",
};

export default function TenantSectionExample2() {
  return (
    <div>
      <PageName name="Section 2 example title" />
      <span>Your Section content here</span>;
    </div>
  );
}

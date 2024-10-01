import { ReactNode } from "react";
import AuthSessionHandler from "@/components/core/AuthSessionHandler";
import SessionWrapper from "@/components/core/SessionWrapper";
import { SectionProvider } from "@/components/ui/SectionProvider";
import OrganizationLayout from "@/components/layouts/OrganizationLayout";

const AdminRoot = async ({ children }: { children: ReactNode }) => {
  return (
    <main>
      <SectionProvider sections={[]}>
        <SessionWrapper>
          <AuthSessionHandler>
            <div>
              <OrganizationLayout>{children}</OrganizationLayout>
            </div>
          </AuthSessionHandler>
        </SessionWrapper>
      </SectionProvider>
    </main>
  );
};
export default AdminRoot;

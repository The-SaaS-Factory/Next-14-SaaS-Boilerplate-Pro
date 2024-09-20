import { ReactNode } from "react";
import AuthSessionHandler from "@/components/core/AuthSessionHandler";
import SessionWrapper from "@/components/core/SessionWrapper";
import BusinessAdminLayout from "@/components/layouts/BusinessAdminLayout";
import { SectionProvider } from "@/components/ui/SectionProvider";
 

const AdminRoot = async ({ children }: { children: ReactNode }) => {
  return (
    <main>
      <SectionProvider sections={[]}>
        <SessionWrapper>
          <AuthSessionHandler>
            <div>
              <BusinessAdminLayout>{children}</BusinessAdminLayout>
            </div>
          </AuthSessionHandler>
        </SessionWrapper>
      </SectionProvider>
    </main>
  );
};
export default AdminRoot;

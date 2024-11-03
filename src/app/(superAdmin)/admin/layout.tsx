import { ReactNode } from "react";
import AuthSessionHandler from "@/components/core/AuthSessionHandler";
import SessionWrapper from "@/components/core/SessionWrapper";
import SuperAdminLayout from "@/components/layouts/SuperAdminLayout";
import { SectionProvider } from "@/components/ui/SectionProvider";

const SuperAdminRoot = async ({ children }: { children: ReactNode }) => {
  return (
    <main>
      <SectionProvider sections={[]}>
        <SessionWrapper>
          <AuthSessionHandler>
            <div>
              <SuperAdminLayout>{children}</SuperAdminLayout>
            </div>
          </AuthSessionHandler>
        </SessionWrapper>
      </SectionProvider>
    </main>
  );
};
export default SuperAdminRoot;

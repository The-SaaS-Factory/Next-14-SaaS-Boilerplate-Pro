"use client";

import { deleteTenant } from "@/actions/global/tenantSystem/delete-tenant";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

function OperateTenant({ tenantId }: { tenantId: number }) {
  const handleDeleteTenant = async () => {
    await deleteTenant(tenantId).then(() => {
      toast.success("Tenant deleted successfully");
    });
  };

  return (
    <div>
      <Button
        onClick={() => {
          handleDeleteTenant();
        }}
      >
        Delete Tenant
      </Button>
    </div>
  );
}

export default OperateTenant;

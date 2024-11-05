"use client";

import { deleteTenant } from "@/actions/global/tenantSystem/delete-tenant";
import DeleteModel from "@/components/core/DeleteModel";

function OperateTenant({ tenantId }: { tenantId: number }) {
  return (
    <div>
      <DeleteModel deleteAction={deleteTenant} modelId={tenantId} />
    </div>
  );
}

export default OperateTenant;

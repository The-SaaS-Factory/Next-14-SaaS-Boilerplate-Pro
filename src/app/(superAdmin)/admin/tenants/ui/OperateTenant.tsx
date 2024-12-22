"use client";

import { deleteTenant } from "@/actions/global/tenantSystem/delete-tenant";
import DeleteModel from "@/components/core/DeleteModel";
import { Button } from "@/components/ui/button";
import { constants } from "@/lib/constants";
import { Trash2 } from "lucide-react";

function OperateTenant({ tenantId }: { tenantId: number }) {
  return (
    <div>
      {constants.demoMode ? (
        <Button disabled variant="secondary">
          <Trash2 className="h-6 w-6" />
          <span>Delete</span>
        </Button>
      ) : (
        <DeleteModel deleteAction={deleteTenant} modelId={tenantId} />
      )}
    </div>
  );
}

export default OperateTenant;

"use client";

import { useState, useEffect } from "react";

export function useCapability(capabilityName: string) {
  const [hasCapability, setHasCapability] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const organizationStr = localStorage.getItem("organization");
      if (!organizationStr) {
        setHasCapability(false);
        setLoading(false);
        return;
      }

      const organization = JSON.parse(organizationStr);
      const capability = organization.capabilities.find(
        (cap: any) => cap.capability.name === capabilityName,
      );

      if (!capability) {
        setHasCapability(false);
        setLoading(false);
        return;
      }

      // Si es de tipo PERMISSION, solo verificamos que exista
      if (capability.capability.type === "PERMISSION") {
        setHasCapability(capability.count !== 0);
      }
      // Si es de tipo LIMIT, verificamos contra el plan
      else if (capability.capability.type === "LIMIT") {
        const planCapability =
          organization.subscription.plan.PlanCapabilities.find(
            (pc: any) => pc.capabilityId === capability.capabilityId,
          );

        setHasCapability(
          planCapability ? capability.count < planCapability.count : false,
        );
      }
    } catch (error) {
      console.error("Error checking capability:", error);
      setHasCapability(false);
    } finally {
      setLoading(false);
    }
  }, [capabilityName]);

  return { hasCapability, loading };
}

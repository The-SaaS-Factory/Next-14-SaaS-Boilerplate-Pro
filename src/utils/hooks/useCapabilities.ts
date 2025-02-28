"use client";

import { useState, useEffect } from "react";

const capabilityCache = new Map();

export function useCapability(capabilityName: string) {
  const [hasCapability, setHasCapability] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (capabilityCache.has(capabilityName)) {
      setHasCapability(capabilityCache.get(capabilityName));
      setLoading(false);
      return;
    }

    async function checkCapability() {
      try {
        const { checkOrganizationCapabilityInServer } = await import("@/utils/facades/serverFacades/membershipFacade");
        const result = await checkOrganizationCapabilityInServer({
          capabilityName
        });

        capabilityCache.set(capabilityName, result);

        setHasCapability(result);
      } catch (error) {
        console.error("Error checking capability:", error);
        setHasCapability(false);
      } finally {
        setLoading(false);
      }
    }

    checkCapability();
  }, [capabilityName]);

  return { hasCapability, loading };
}
"use client";
import { getMembership } from "@/utils/facades/serverFacades/userFacade";
import { useState, useEffect } from "react";

export const useMembership = () => {
  const [organizationData, setOrganizationData] = useState<any>(null);
  const [userMembershipData, setUserMembershipData] = useState<any>(null);

  useEffect(() => {
    const fetchMembershipData = async () => {
      try {
        const storedOrganization = localStorage.getItem("organization");
        const storedUserMembership = localStorage.getItem("userMembership");

        if (storedOrganization && storedUserMembership) {
          setOrganizationData(JSON.parse(storedOrganization));
          setUserMembershipData(JSON.parse(storedUserMembership));
        } else {
          const { organization, userMembership } = await getMembership();

          if (!organization || !userMembership) {
            throw new Error("Failed to fetch membership data");
          }

          localStorage.setItem("organization", JSON.stringify(organization));
          localStorage.setItem(
            "userMembership",
            JSON.stringify(userMembership),
          );

          setOrganizationData(organization);
          setUserMembershipData(userMembership);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchMembershipData();
  }, []);

  const checkOrganizationCapability = ({ capabilityName }) => {
    const subscription = organizationData?.subscription;
    const organizationCapabilities = organizationData?.capabilities;

    if (!subscription) return false;
    if (!organizationCapabilities) return false;

    const organizationCapability = organizationCapabilities.find(
      (o) => o.capability.name === capabilityName,
    );

    if (!organizationCapability) return false;

    if (organizationCapability.capability.type === "PERMISSION") {
      return organizationCapability.count === 1;
    } else if (organizationCapability.capability.type === "LIMIT") {
      // Usamos `await` para resolver la promesa devuelta por `find`
      const planCapability = subscription.plan.planCapabilities.find((p) => {
        return (
          p.planId === subscription.planId &&
          p.capabilityId === organizationCapability.capability.id
        );
      });

      if (!planCapability) return false;

      return organizationCapability.count < planCapability.count;
    }

    return false;
  };

  return {
    organization: organizationData,
    userMembership: userMembershipData,
    checkOrganizationCapability,
  };
};

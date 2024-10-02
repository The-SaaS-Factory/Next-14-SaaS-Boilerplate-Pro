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
            JSON.stringify(userMembership)
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

  return {
    organization: organizationData,
    userMembership: userMembershipData,
  };
};

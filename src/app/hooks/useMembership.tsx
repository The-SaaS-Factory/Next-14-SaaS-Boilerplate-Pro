import { getMembership } from "@/utils/facades/serverFacades/userFacade";
import { useState, useEffect } from "react";

interface MembershipData {
  profile: any;
  permissions: any[];
  userMembership: any;
}

export const useMembership = () => {
  const [data, setData] = useState<MembershipData | null>(null);

  useEffect(() => {
    const fetchMembershipData = async () => {
      try {
        const membershipData = await getMembership();
        if (!membershipData) {
          throw new Error("Failed to fetch membership data");
        }
        setData(membershipData);
      } catch (err) {
        console.log(err);
      }
    };

    fetchMembershipData();
  }, []);

  return {
    permissions: data?.permissions,
    profile: data?.profile,
    userMembership: data?.userMembership,
  };
};

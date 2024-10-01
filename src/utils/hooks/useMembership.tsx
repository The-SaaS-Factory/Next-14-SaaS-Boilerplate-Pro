import { getMembership } from "@/utils/facades/serverFacades/userFacade";
import { useState, useEffect } from "react";

export const useMembership = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchMembershipData = async () => {
      try {
        const { organization } = await getMembership();
        if (!organization) {
          throw new Error("Failed to fetch membership data");
        }
        setData(organization);
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

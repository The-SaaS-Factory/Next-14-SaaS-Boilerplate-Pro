"use client";
import React, { useEffect, useState } from "react";
import Tabs from "@/components/core/Tabs";
import {
  BuildingLibraryIcon,
  CodeBracketIcon,
  CreditCardIcon,
  FaceSmileIcon,
  UserGroupIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

import { constants } from "@/lib/constants";
import useSuperAdmin from "@/utils/hooks/useSuperAdmin";
import { UserIcon, Users } from "lucide-react";
import { IOrganization } from "@/interfaces/saasTypes";

const SettingsTabs = ({
  profile,
  isOrganizationAdmin,
}: {
  profile: IOrganization;
  isOrganizationAdmin: boolean;
}) => {
  const { isSuperAdmin } = useSuperAdmin(profile);

  const [tabs, setTabs] = useState(
    [
      {
        path: "/home/settings/profile",
        label: "Account",
        icon: UserIcon,
      },
      isOrganizationAdmin && {
        path: "/home/settings/organization/settings",
        label: constants.tanantModelName + " settings",
        icon: BuildingLibraryIcon,
      },
      isOrganizationAdmin && {
        path: "/home/settings/organization/members",
        label: "Members",
        icon: Users,
      },
      isOrganizationAdmin && {
        path: "/home/settings/billing/planActive",
        label: "Billing",
        icon: CreditCardIcon,
      },
      isOrganizationAdmin && {
        path: "/home/settings/profile/portal",
        label: "Portal",
        icon: CreditCardIcon,
      },
    ].filter((item) => item),
  );

  useEffect(() => {
    if (!isSuperAdmin) return;
    setTabs([
      {
        path: "/home/settings/profile",
        label: "Profile",
        icon: UsersIcon,
      },
      {
        path: "/admin/settings/general",
        label: "General",
        icon: UserGroupIcon,
      },
      {
        path: "/admin/settings/integrations",
        label: "Integrations",
        icon: CodeBracketIcon,
      },
      {
        path: "/admin/settings/marketing",
        label: "Marketing",
        icon: FaceSmileIcon,
      },
      {
        path: "/admin/settings/billing",
        label: "Billing",
        icon: CreditCardIcon,
      },
    ]);
  }, [profile, isSuperAdmin]);

  return (
    <div>
      <Tabs tabs={tabs} />
    </div>
  );
};

export default SettingsTabs;

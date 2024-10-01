"use client";
import React, { useEffect, useState } from "react";
import Tabs from "@/components/core/Tabs";
import {
  BuildingStorefrontIcon,
  CodeBracketIcon,
  CreditCardIcon,
  FaceSmileIcon,
  UserGroupIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

import { constants } from "@/lib/constants";
import useSuperAdmin from "@/utils/hooks/useSuperAdmin";

const SettingsTabs = ({ profile }: { profile: any }) => {
  const { isSuperAdmin } = useSuperAdmin(profile);

  const [tabs, setTabs] = useState([
    {
      path: "/home/settings/profile",
      label: "Perfil",
      icon: UsersIcon,
    },
  ]);

  useEffect(() => {
    if (profile?.type === "CLIENT") return;
    if (constants.multiTenant) {
      setTabs([
        {
          path: "/home/settings/profile",
          label: "Perfil",
          icon: UsersIcon,
        },
        {
          path: "/home/settings/ecomemrce",
          label: "Ajustes de la tienda",
          icon: UsersIcon,
        },
        {
          path: "/home/settings/billing/planActive",
          label: "Planes de membresía",
          icon: UserGroupIcon,
        },
        {
          path: "/home/settings/profile/portal",
          label: "Portal",
          icon: CreditCardIcon,
        },
      ]);
    } else {
      setTabs([
        {
          path: "/home/settings/profile",
          label: "Perfil",
          icon: UsersIcon,
        },
        {
          path: "/home/settings/ecommerce",
          label: "Ajustes de la tienda",
          icon: BuildingStorefrontIcon,
        },
      ]);
    }
  }, [profile, isSuperAdmin]);

  useEffect(() => {
    if (!isSuperAdmin) return;
    setTabs([
      {
        path: "/home/settings/profile",
        label: "Perfil",
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

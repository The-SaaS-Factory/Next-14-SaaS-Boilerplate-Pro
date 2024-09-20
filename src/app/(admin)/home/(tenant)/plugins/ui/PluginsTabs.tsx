"use client";
import React from "react";
import Tabs from "@/components/core/Tabs";
import {
  BuildingStorefrontIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

const PluginsTabs = () => {
  const tabs = [
    {
      path: "/home/plugins/actives",
      label: "Instalados",
      icon: CheckCircleIcon,
    },
    {
      path: "/home/plugins/shop",
      label: "Tienda",
      icon: BuildingStorefrontIcon,
    },
  ];

  return (
    <div>
      <Tabs tabs={tabs} />
    </div>
  );
};

export default PluginsTabs;

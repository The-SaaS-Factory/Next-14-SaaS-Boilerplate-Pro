"use client";
import Tabs from "@/components/core/Tabs";
import { LightBulbIcon } from "@heroicons/react/24/outline";

import { MonitorSmartphone, RadioTower, ShuffleIcon } from "lucide-react";

const FactoryTabs = () => {
  const tabs = [
    {
      path: "idea",
      label: "Idea",
      icon: LightBulbIcon,
    },
    {
      path: "development",
      label: "Development",
      icon: MonitorSmartphone,
    },
    {
      path: "validation",
      label: "Validation",
      icon: ShuffleIcon,
    },

    {
      path: "live",
      label: "Production",
      icon: RadioTower,
    },
  ].filter((item) => item);

  return (
    <div>
      <Tabs tabs={tabs} />
    </div>
  );
};

export default FactoryTabs;

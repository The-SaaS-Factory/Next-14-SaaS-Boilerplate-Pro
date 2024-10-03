"use client";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import React from "react";

const Tabs = ({
  tabs,
}: {
  tabs: {
    path: string;
    label: string;
    icon: any | null;
  }[];
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const search = searchParams.get("subpage");

  const isActive = (path) => {
    if (search) {
      const s = search.split("=");

      return s.includes(search) && path.includes("?");
    }
    return pathname.includes(path);
  };

  return (
    <div>
      <div className="flex overflow-auto border-b-2 w-[100%] py-1 border-gray-200 ">
        <div className="flex space-x-2">
          {tabs.map((tab) => (
            <div
              key={tab.path}
              className={`flex items-center space-x-2 hover:bg-gray-200 dark:hover:bg-gray-800 p-2 rounded-xl ${
                isActive(tab.path) ? "active-tab" : ""
              }`}
            >
              {tab.icon &&
                React.createElement(tab.icon, {
                  className: isActive(tab.path)
                    ? "w-5 h-5 text-primary active-tab"
                    : "text-primary w-5 h-5",
                  "aria-hidden": "true",
                })}
              <Link
                href={tab.path}
                className={isActive(tab.path) ? "active-tab" : "text-primary"}
              >
                {tab.label}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tabs;

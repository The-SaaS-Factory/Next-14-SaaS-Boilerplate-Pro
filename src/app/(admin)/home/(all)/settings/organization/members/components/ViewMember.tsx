"use client";

import React, { useState } from "react";

interface Props {
  member: any;
}

export const ViewMember: React.FC<Props> = ({ member }) => {
  const [activeTab, setActiveTab] = useState("information");

  return (
    <div className="bg-main flex w-full flex-col px-4">
      <div className="flex border-b border-gray-300">
        <button
          onClick={() => setActiveTab("information")}
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === "information"
              ? "border-b-2 border-indigo-500 text-indigo-600"
              : "text-gray-600"
          }`}
        >
          Information
        </button>
      </div>

      {activeTab === "information" && (
        <div className="p-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center font-medium text-gray-700">
              name:
            </div>
            <div className="text-gray-600">{member.user.name}</div>
            <div className="flex items-center font-medium text-gray-700">
              Email:
            </div>
            <div className="text-gray-600">{member.user.email}</div>
          </div>
        </div>
      )}

      {activeTab === "roles" && (
        <div className="flex items-center space-x-3">Roles</div>
      )}
    </div>
  );
};

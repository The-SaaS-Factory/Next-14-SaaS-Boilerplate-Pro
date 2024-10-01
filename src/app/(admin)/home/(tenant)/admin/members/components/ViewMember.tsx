"use client";

import React, { useState } from "react";

interface Props {
  member: any;
}

export const ViewMember: React.FC<Props> = ({ member }) => {
  const [activeTab, setActiveTab] = useState("information");

  return (
    <div className="flex flex-col w-full mx-auto p-4">
      <div className="flex border-b border-gray-300 mb-4">
        <button
          onClick={() => setActiveTab("information")}
          className={`py-2 px-4 text-sm font-medium ${
            activeTab === "information"
              ? "border-b-2 border-indigo-500 text-indigo-600"
              : "text-gray-600"
          }`}
        >
          Information
        </button>
        <button
          onClick={() => setActiveTab("roles")}
          className={`py-2 px-4 text-sm font-medium ${
            activeTab === "roles"
              ? "border-b-2 border-indigo-500 text-indigo-600"
              : "text-gray-600"
          }`}
        >
          Role
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
        <div className="  flex space-x-3 items-center">Roles</div>
      )}
    </div>
  );
};

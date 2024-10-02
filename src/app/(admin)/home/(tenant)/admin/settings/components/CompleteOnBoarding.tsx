"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { constants } from "@/lib/constants";

export const CompleteOnBoarding = ({
  isOnboardingCompleted,
}: {
  isOnboardingCompleted?: boolean;
}) => {
  const pathname = usePathname();

  if (isOnboardingCompleted === null) return null;

  const isAgencyProfilePage = pathname === "/home/admin/settings";

  if (!isOnboardingCompleted && !isAgencyProfilePage) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-neutral-800/30 backdrop-blur-sm z-[999]">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-4">
          Complete your {constants.tanantModelName} configuration
        </h2>
        <p className="mb-4 text-gray-700">
          You need to complete your {constants.tanantModelName} profile setup to continue. Please fill out all required fields. Go toSettings
        </p>
        <Link
          href="/home/admin/settings"
          className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Complete onboarding
        </Link>
      </div>
    </div>
    
    );
  }

  return null;
};

export default CompleteOnBoarding;

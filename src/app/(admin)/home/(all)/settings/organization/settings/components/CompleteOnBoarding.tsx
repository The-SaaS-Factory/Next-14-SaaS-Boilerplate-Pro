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

  const isAgencyProfilePage = pathname === "/home/onboarding";

  if (!isOnboardingCompleted && !isAgencyProfilePage) {
    return (
      <div className="fixed inset-0 z-[999] flex items-center justify-center bg-neutral-800/30 backdrop-blur-sm">
        <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
          <h2 className="mb-4 text-2xl font-semibold">
            Complete your {constants.tanantModelName} configuration
          </h2>
          <p className="mb-4 text-gray-700">
            You need to complete your {constants.tanantModelName} profile setup
            to continue. Please fill out all required fields. Go toSettings
          </p>
          <Link
            href="/home/onboarding"
            className="inline-block rounded-lg bg-blue-600 px-4 py-2 text-white transition duration-300 hover:bg-blue-700"
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

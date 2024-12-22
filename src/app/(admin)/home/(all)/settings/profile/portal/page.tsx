import React from "react";
import { Metadata } from "next";
import { BuildingLibraryIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { constants } from "@/lib/constants";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "User Payment Portal",
};

const UserPortal = async () => {
  return (
    <div>
      <div className="flex">
        <div className="bg-main flex-1 bg-gradient-to-br p-3">
          <div className="flex justify-center space-x-3 text-center text-xl font-bold">
            <span className="text-red-500">
              {!constants.portalStripe &&
                "Not found Stripe Portal URL, Get the portal URL in Stripe then paste it in .env as  NEXT_PUBLIC_STRIPE_PORTAL"}
            </span>
            <Link
              className="flex items-center space-x-3"
              href={`${constants.portalStripe} `}
            >
              <Button className="flex-items flex">
                <span>Stripe Portal</span>
                <BuildingLibraryIcon className="inline-block h-8 w-8" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPortal;

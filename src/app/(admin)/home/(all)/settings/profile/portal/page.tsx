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
        <div className="flex-1 p-3 bg-gradient-to-br bg-main">
          <div className="text-xl  flex space-x-3 justify-center font-bold text-center">
            <span className="text-red-500">
              {!constants.portalStripe &&
                "Not found Stripe Portal URL, Get the portal URL in Stripe"}
            </span>
            <Link
              className="  flex items-center space-x-3"
              href={`${constants.portalStripe} `}
            >
              <Button className="flex flex-items">
                <span>Stripe Portal</span>
                <BuildingLibraryIcon className="h-8 w-8 inline-block" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPortal;

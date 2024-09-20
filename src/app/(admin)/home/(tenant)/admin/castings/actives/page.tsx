/* eslint-disable no-unused-vars */
import PageName from "@/components/ui/commons/PageName";
import React from "react";
import { Metadata } from "next";
import CastingsList from "../ui/CastingsList";
import { CastingStatus } from "@prisma/client";
import AllCastingList from "../ui/AllCastingList";

export const metadata: Metadata = {
  title: "Castings en proceso",
};

const AgencyCastingActivesPage = ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) => {
  return (
    <div>
      <PageName name={"Castings en proceso"} isSubPage={true} />
      <AllCastingList status={CastingStatus.IN_PROGRESS} />
    </div>
  );
};

export default AgencyCastingActivesPage;

import React from "react";
import PageName from "@/components/ui/commons/PageName";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Plugins",
};

const Plugins = async () => {
  return (
    <div>
      <PageName name={"Plugins"} />
    </div>
  );
};

export default Plugins;

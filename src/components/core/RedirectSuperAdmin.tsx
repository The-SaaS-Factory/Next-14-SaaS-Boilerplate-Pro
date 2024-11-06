"use client";

import { useEffect } from "react";

export const RedirectSuperAdmin = ({ redirect }: { redirect: boolean }) => {
  useEffect(() => {
    if (redirect) window.location.href = "/admin";
  }, []);
  return <div> </div>;
};

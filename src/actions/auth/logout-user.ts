"use server";

import { redirect } from "next/navigation";
import { logout } from "../auth";

export const LogoutUser = () => {
  logout();
  redirect("/");
};

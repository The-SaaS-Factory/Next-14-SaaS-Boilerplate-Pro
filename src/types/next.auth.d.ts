/* eslint-disable no-unused-vars */
import NextAuth, { DefaultSession, DefaultJWT } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      type: string | null;
      email: string | null;
      avatar: string | null;
      isSuperAdmin: boolean | null;
      permissions: string[] | null;
      membershipPlan: string | null;
      membershipEndDate: string | null;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userId: string;
  }
}

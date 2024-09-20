"use client";
import { ReactNode } from "react";
import { useSession } from "next-auth/react";
import FullLoader from "../ui/loaders/FullLoader";
import { useRouter } from "next/navigation";

const AuthSessionHandler = ({
  children,
  lastUrl,
}: {
  children: ReactNode;
  lastUrl?: string;
}) => {
  const { status } = useSession();
  const navigation = useRouter();

  if (status === "loading") {
    return (
      <div className="">
        <FullLoader />
      </div>
    );
  }

  if (status === "authenticated") {
    return <div className="relative z-0">{children}</div>;
  }

  if (status === "unauthenticated") {
    window.localStorage.setItem("lastUrl", lastUrl);
    navigation.push("/login");
  }
};
export default AuthSessionHandler;

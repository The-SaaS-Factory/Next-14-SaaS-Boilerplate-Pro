"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Confetti from "react-confetti";
import { Button } from "@/components/ui/button";
import { refreshOrganizationData } from "@/utils/facades/serverFacades/organizationFacade";

export default function SuccessPaymentPage() {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    refreshOrganizationData();
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    const timer = setTimeout(() => setShowConfetti(false), 5000);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center bg-gradient-to-b from-blue-100 to-white p-4">
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={200}
        />
      )}
      <h1 className="mb-4 pt-14 text-center text-4xl font-bold text-blue-600 md:text-5xl">
        Payment Completed
      </h1>
      <p className="mb-8 text-center text-xl text-gray-600 md:text-2xl">
        Thank you for activating your plan on our platform!
      </p>
      <Button asChild>
        <Link href="/home/settings/billing/planActive">View Your Plan</Link>
      </Button>
    </div>
  );
}

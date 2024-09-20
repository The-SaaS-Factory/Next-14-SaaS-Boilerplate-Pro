"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import ReactConfetti from "react-confetti";
import { toast } from "sonner";

const PaymentStatusAlert = ({ status }: { status: string | undefined }) => {
  const { replace } = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    if (!status) return;
    if (status === "unpaid") {
      toast.error(
        "Your payment has not been processed. Please try again later."
      );
    }

    if (status === "pending") {
      toast.info(
        "Your payment is pending. Please wait for the payment to be processed."
      );
    }

    if (status === "success") {
      toast.success(
        "Tu pago ha sido procesado con éxito. Gracias por tu compra."
      );
    }

    if (status === "cancelled") {
      toast.error(" Tu pago ha sido cancelado. Por favor, inténtalo de nuevo.");
    }

    if (status === "error") {
      toast.error(
        "An error occurred while processing your payment. Please try again later."
      );
    }

    if (status === "invalid") {
      toast.error("Invalid payment method. Please try again later.");
    }

    // Remove status from url.
    setTimeout(() => {
      replace(pathName);
    }, 5000);
  }, [status]);

  return (
    <div>
      {status === "success" && (
        <div className="z-50">
          <ReactConfetti width={1000} height={1000} />
        </div>
      )}
    </div>
  );
};

export default PaymentStatusAlert;

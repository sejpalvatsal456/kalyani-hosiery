"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PaymentResultClient() {
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const status = params.get("status");

    if (status) {
      sessionStorage.setItem("paymentStatus", status);
    }

    const timer = setTimeout(() => {
      router.replace("/cart");
    }, 1000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="h-screen flex items-center justify-center">
      <p className="text-lg font-medium">Verifying payment...</p>
    </div>
  );
}
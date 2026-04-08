"use client";

export const dynamic = "force-dynamic";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function PaymentResultPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const status = searchParams.get("status");

    if (status) {
      // ✅ store in sessionStorage
      sessionStorage.setItem("paymentStatus", status);
    }

    // ⏳ small delay (optional but nice UX)
    setTimeout(() => {
      router.replace("/cart");
    }, 1000);
  }, [searchParams, router]);

  return (
    <div className="h-screen flex items-center justify-center">
      <p className="text-lg font-medium">Verifying payment...</p>
    </div>
  );
}
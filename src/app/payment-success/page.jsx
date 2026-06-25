'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function PaymentSuccess() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/dashboard/reader/delivery');
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-green-600">
          Payment Successful
        </h1>

        <p className="mt-3 text-[#f10262]">
          Your delivery request has been submitted.
        </p>

        <p className="mt-2 text-sm text-gray-400">
          Redirecting to delivery history...
        </p>
      </div>
    </div>
  );
}
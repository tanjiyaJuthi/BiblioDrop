"use client";

import { Button, Card } from "@heroui/react";
import { ShoppingBag, ArrowLeft, House } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#ef0161]/2 flex items-center justify-center px-6">
      <Card className="w-full max-w-lg bg-[#ef0161]/5 backdrop-blur-xl shadow-2xl">
        <div className="py-12 px-8 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-xl bg-orange-500/10">
            <ShoppingBag className="h-10 w-10 text-[#ef0161]" />
          </div>

          <h1 className="mt-6 text-7xl font-extrabold">
            404
          </h1>

          <h2 className="mt-3 text-2xl font-semibold">
            Oops! Page not found
          </h2>

          <p className="mt-4 text-zinc-400 leading-relaxed">
            The page you're looking for may have been removed,
            renamed, or is temporarily unavailable.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Button
              variant="bordered"
              className="flex-1 border-zinc-700 h-9.5 rounded-xl bg-[#ef0161]/10"
              startContent={<ArrowLeft size={18} />}
              onPress={() => router.back()}
            >
              Go Back
            </Button>

            <Button
              color="warning"
              className="flex-1 font-semibold h-9.5 rounded-xl bg-[#ef0161]"
              startContent={<House size={18} />}
              onPress={() => router.push("/")}
            >
              Continue Exploring
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
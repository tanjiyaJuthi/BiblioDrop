"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import Loading from "@/app/loading";

const CallbackPage = () =>  {
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await authClient.getSession();

      if (!data?.user) {
        router.replace("/signin");
        return;
      }

      if (!data.user.role) {
        router.replace("/choose-role");
      } else {
        router.replace("/");
      }
    };

    checkSession();
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Loading />
    </div>
  );
}

export default CallbackPage;
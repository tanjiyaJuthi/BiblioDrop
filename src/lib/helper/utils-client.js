"use client";

import { useState } from "react";
import { authClient } from "../auth-client";
import { useRouter } from "next/navigation";

export const useGoogleAuth = () => {
  const router = useRouter();

  const [googleLoading, setGoogleLoading] = useState(false);

  const handleGoogleAuth = async () => {
    setGoogleLoading(true);

    try {
        await authClient.signIn.social({
          provider: "google",
          callbackURL: "/auth/callback",
        });
    } catch (error) {
      console.error(error);
    } finally {
      setGoogleLoading(false);
    }
  };

  return {
    handleGoogleAuth,
    googleLoading,
  };
};
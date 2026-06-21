"use client";

import { useState } from "react";
import { authClient } from "../auth-client";

export const useGoogleAuth = () => {
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleGoogleAuth = async () => {
    setGoogleLoading(true);

    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: `/choose-role`,
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
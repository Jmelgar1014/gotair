// components/Providers.tsx
"use client";

import { ReactNode, useEffect } from "react";
import { Toaster, toast } from "sonner";

export function Providers({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Only run in browser
    const justLoggedOut = sessionStorage.getItem("justLoggedOut");

    const justLoggedIn = sessionStorage.getItem("justLoggedIn");
    if (justLoggedOut === "true") {
      // Show your toast:
      toast.success("You have been logged out.", {
        duration: 5_000,
      });
      // Clear the flag so it only runs once
      sessionStorage.removeItem("justLoggedOut");
    }

    if (justLoggedIn === "true") {
      toast.success("You have logged in.", {
        duration: 5_000,
      });
      sessionStorage.removeItem("justLoggedIn");
    }
  }, []);

  return (
    <>
      {children}
      <Toaster position="top-center" richColors duration={5_000} />
    </>
  );
}

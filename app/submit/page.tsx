"use client";
import React, { useCallback, useEffect, useMemo } from "react";
import AddStationNavBar from "@/components/layout/AddStationNavBar";
import LocationForm from "@/components/layout/LocationForm";
import { useAuth0 } from "@auth0/auth0-react";
import LoadingSkeleton from "@/components/layout/LoadingSkeleton";
import { useRouter } from "next/navigation";
import { usePermissionContext } from "@/context/PermissionProvider";
const Page = () => {
  const router = useRouter();
  const { authToken, role, result } = usePermissionContext();
  const { isAuthenticated, isLoading } = useAuth0();

  const isAuthorized = useMemo(() => {
    // Still loading Auth0 state
    if (isLoading) return null;

    // If we have a cached role from localStorage (handled by provider), use it
    // This prevents redirect on refresh while Auth0 rehydrates
    if (role && role.includes("baseUser")) {
      return true;
    }

    // If Auth0 has fully loaded and user is not authenticated, deny access
    if (!isLoading && !isAuthenticated) return false;

    // If authenticated but no result/role yet, keep loading
    if (isAuthenticated && (!result || !role)) return null;

    // Final check once everything is loaded
    return role?.includes("baseUser") || false;
  }, [isLoading, isAuthenticated, result, role]);

  const handleRedirect = useCallback(() => {
    router.push("/");
  }, [router]);

  useEffect(() => {
    // Don't redirect while Auth0 is still loading
    if (isLoading) return;

    // Don't redirect if we have a valid cached role (prevents refresh redirect)
    if (role && role.includes("baseUser")) return;

    // Only redirect if Auth0 has finished loading AND user is definitely not authenticated
    if (!isLoading && !isAuthenticated) {
      handleRedirect();
      return;
    }

    // If authenticated but invalid/missing permissions, redirect
    if (isAuthenticated && result && (!role || !role.includes("baseUser"))) {
      handleRedirect();
      return;
    }

    // Log errors for debugging (only in development)
    if (!result && isAuthenticated && process.env.NODE_ENV === "development") {
      console.error("Permission result not available");
    }
  }, [isLoading, isAuthenticated, role, result, handleRedirect]);

  if (!isAuthorized) {
    return null;
  }

  return (
    <>
      <AddStationNavBar />
      <LocationForm token={authToken} />
    </>
  );
};

export default Page;

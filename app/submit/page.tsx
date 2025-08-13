"use client";
import React from "react";
import AddStationNavBar from "@/components/layout/AddStationNavBar";
import LocationForm from "@/components/layout/LocationForm";
import LoadingSkeleton from "@/components/layout/LoadingSkeleton";
import { useAuthorization } from "@/context/useAuthorization"; // Your custom hook

const Page = () => {
  const { isAuthorized, isLoading, authToken } = useAuthorization(["baseUser"]);

  // Show loading skeleton while determining authorization
  if (isLoading) {
    return <LoadingSkeleton />;
  }

  // Don't render if not authorized (redirect is in progress)
  if (!isAuthorized) {
    return null;
  }

  // Render authorized content
  return (
    <>
      <AddStationNavBar />
      <LocationForm token={authToken} />
    </>
  );
};

export default Page;

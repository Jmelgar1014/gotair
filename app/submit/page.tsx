"use client";
import React, { useEffect } from "react";
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

  useEffect(() => {
    if (isLoading) return;
    const checkRoles = async () => {
      if (!isAuthenticated) {
        router.push("/");
        return;
      }
      try {
        if (!result) {
          router.push("/");
          console.error("Invalid Token");
          return;
        }
        // const result = await response.json();

        if (!role?.includes("baseUser")) {
          router.push("/");
          return;
        }

        // setRole(result.permission);
        // setToken(token);
      } catch (error) {
        console.log(error);
      }
    };

    checkRoles();
  }, [isAuthenticated, isLoading]);

  return (
    <>
      {isLoading ? (
        <LoadingSkeleton />
      ) : (
        role?.includes("baseUser") && (
          <>
            <AddStationNavBar />
            <LocationForm token={authToken} />
          </>
        )
      )}
    </>
  );
};

export default Page;

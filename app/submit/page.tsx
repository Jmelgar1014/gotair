"use client";
import React, { useEffect } from "react";
import AddStationNavBar from "@/components/layout/AddStationNavBar";
import LocationForm from "@/components/layout/LocationForm";
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import LoadingSkeleton from "@/components/layout/LoadingSkeleton";
import { useRouter } from "next/navigation";
const Page = () => {
  const router = useRouter();
  const { isAuthenticated, getAccessTokenSilently, isLoading } = useAuth0();
  const [token, setToken] = useState<string>("");
  const [role, setRole] = useState<string>("");
  useEffect(() => {
    if (isLoading) return;
    const checkRoles = async () => {
      if (!isAuthenticated) {
        router.push("/");
        return;
      }
      try {
        const token = await getAccessTokenSilently({
          authorizationParams: {
            audience: "gotairlogin",
          },
        });

        const response = await fetch("/api/permissions", {
          method: "POST",
          headers: {
            authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          router.push("/");
          console.error("Invalid Token");
          return;
        }
        const result = await response.json();

        if (!result.permission?.includes("baseUser")) {
          router.push("/");
          return;
        }

        setRole(result.permission);
        setToken(token);
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
            <LocationForm token={token} />
          </>
        )
      )}
    </>
  );
};

export default Page;

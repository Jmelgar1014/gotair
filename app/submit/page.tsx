"use client";
import React, { useEffect } from "react";
import AddStationNavBar from "@/components/layout/AddStationNavBar";
import LocationForm from "@/components/layout/LocationForm";
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
const Page = () => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [token, setToken] = useState<string>("");
  const [role, setRole] = useState<string>("");
  useEffect(() => {
    const checkRoles = async () => {
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

      const data = await response.json();
      setToken(token);
      setRole(data.permission);
    };

    checkRoles();
  }, [isAuthenticated]);

  return (
    <>
      <AddStationNavBar />
      <LocationForm role={role} token={token} />
    </>
  );
};

export default Page;

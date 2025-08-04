"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

type responseType = {
  message: string;
  permission: string;
};

interface PermissionsContextValues {
  result: responseType | null;
  authToken: string;
  role: string;
  getPermissions: () => Promise<"permissionValue" | null>;
}

const PermissionContext = createContext<PermissionsContextValues | undefined>(
  undefined
);

export const PermissionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { getAccessTokenSilently } = useAuth0();
  const [authToken, setAuthToken] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [result, setResult] = useState<responseType | null>(null);

  useEffect(() => {
    const fetchToken = async () => {
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

        const data = await response.json();

        setAuthToken(token);
        setResult(data);
        setRole(data.permission);
      } catch (error) {
        console.log(error);
      }
    };

    fetchToken();
  }, [getAccessTokenSilently]);

  const getPermissions = async () => {
    if (!authToken) return null;
    // Decode or fetch permissions using the token here
    return "permissionValue";
  };

  return (
    <PermissionContext.Provider
      value={{ authToken, role, getPermissions, result }}
    >
      {children}
    </PermissionContext.Provider>
  );
};

// Custom hook for using the context
export function usePermissionContext() {
  const ctx = useContext(PermissionContext);
  if (!ctx)
    throw new Error(
      "usePermissionContext must be used within PermissionProvider"
    );
  return ctx;
}

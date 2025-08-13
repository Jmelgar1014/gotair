"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { useAuth0 } from "@auth0/auth0-react";

type responseType = {
  message: string;
  permission: string;
};

interface PermissionsContextValues {
  result: responseType | null;
  authToken: string;
  role: string;
  isLoading: boolean;
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
  const { getAccessTokenSilently, isAuthenticated, isLoading } = useAuth0();
  const [authToken, setAuthToken] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [result, setResult] = useState<responseType | null>(null);

  useEffect(() => {
    if (!isAuthenticated || isLoading) {
      return;
    }

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
        console.log(data);
        localStorage.setItem("role", data.permission ?? "");

        setAuthToken(token);
        setResult(data);
        setRole(data.permission);
      } catch (error) {
        console.log(error);
      }
    };
    const cachedRole = localStorage.getItem("role");
    if (cachedRole) {
      setRole(cachedRole); // UI is instant
    }

    fetchToken();
  }, [getAccessTokenSilently, isAuthenticated, isLoading]);

  const getPermissions = useCallback(async () => {
    if (!authToken) return null;
    // Decode or fetch permissions using the token here
    return "permissionValue";
  }, [authToken]);
  const value = useMemo(
    () => ({ authToken, role, result, getPermissions, isLoading }),
    [authToken, role, result, getPermissions, isLoading]
  );
  return (
    <PermissionContext.Provider value={value}>
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

// hooks/useAuthorization.ts
import { useEffect, useMemo, useCallback } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useRouter } from "next/navigation";
import { usePermissionContext } from "@/context/PermissionProvider";

type AuthorizationResult = {
  isAuthorized: boolean | null; // null = loading, boolean = determined
  isLoading: boolean;
  authToken: string;
};

export const useAuthorization = (
  requiredRoles: string[] = ["baseUser"],
  redirectTo: string = "/"
): AuthorizationResult => {
  const router = useRouter();
  const { authToken, role, result } = usePermissionContext();
  const { isAuthenticated, isLoading } = useAuth0();

  // Memoize authorization check
  const isAuthorized = useMemo(() => {
    // Still loading Auth0 state
    if (isLoading) return null;

    // Check cached role first (prevents refresh redirect)
    if (role && requiredRoles.some((reqRole) => role.includes(reqRole))) {
      return true;
    }

    // If Auth0 has loaded and user is not authenticated, deny access
    if (!isLoading && !isAuthenticated) return false;

    // If authenticated but no result/role yet, keep loading
    if (isAuthenticated && (!result || !role)) return null;

    // Final check once everything is loaded
    return requiredRoles.some((reqRole) => role?.includes(reqRole)) || false;
  }, [isLoading, isAuthenticated, result, role, requiredRoles]);

  // Memoize redirect function
  const handleRedirect = useCallback(() => {
    router.push(redirectTo);
  }, [router, redirectTo]);

  // Handle redirects
  useEffect(() => {
    // Don't redirect while Auth0 is loading
    if (isLoading) return;

    // Don't redirect if we have valid cached permissions
    if (role && requiredRoles.some((reqRole) => role.includes(reqRole))) return;

    // Redirect if not authenticated (after Auth0 finished loading)
    if (!isLoading && !isAuthenticated) {
      handleRedirect();
      return;
    }

    // Redirect if authenticated but lacking required permissions
    if (
      isAuthenticated &&
      result &&
      (!role || !requiredRoles.some((reqRole) => role.includes(reqRole)))
    ) {
      handleRedirect();
      return;
    }
  }, [isLoading, isAuthenticated, role, result, requiredRoles, handleRedirect]);

  return {
    isAuthorized,
    isLoading: isLoading || isAuthorized === null,
    authToken,
  };
};

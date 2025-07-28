// context/AuthProvider.tsx
"use client";

import { Auth0Provider } from "@auth0/auth0-react";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <Auth0Provider
      domain="dev-6ohlvojg873h5znq.us.auth0.com"
      clientId="RAdLCgtyySF5DHeJJtUnyM9fHtC1dQtW"
      authorizationParams={{
        redirect_uri:
          typeof window !== "undefined" ? window.location.origin : "",
        audience: "gotairlogin",
        scope: "openid profile email",
      }}
    >
      {children}
    </Auth0Provider>
  );
}

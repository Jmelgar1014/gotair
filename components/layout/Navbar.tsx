"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth0 } from "@auth0/auth0-react";
import Link from "next/link";
type NavbarProps = {
  searchInput: string;
  setSearchInput: (val: string) => void;
  onSearch: () => void;
  role: string;
};

const Navbar = ({
  searchInput,
  setSearchInput,
  onSearch,
  role,
}: NavbarProps) => {
  const { isAuthenticated, loginWithRedirect, logout, isLoading } = useAuth0();

  const [localInput, setLocalInput] = useState<string>(searchInput); // initialize with current

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchInput(localInput);
    }, 500);

    return () => clearTimeout(handler);
  }, [localInput, setSearchInput]); // include all deps

  const handleLogout = () => {
    // 1) Persist a “just logged out” flag
    try {
      sessionStorage.setItem("justLoggedOut", "true");
    } catch (e) {
      console.warn("Unable to write sessionStorage:", e);
    }

    // 2) Redirect
    logout({
      logoutParams: { returnTo: window.location.origin },
    });
  };

  const handleLogIn = () => {
    // 1) Persist a “just logged out” flag
    try {
      sessionStorage.setItem("justLoggedIn", "true");
    } catch (e) {
      console.warn("Unable to write sessionStorage:", e);
    }

    // 2) Redirect
    loginWithRedirect();
  };
  return (
    <header className="border-b-[1px] border-slate-100 shadow-sm">
      <nav className="grid grid-cols-1 sm:flex sm:justify-around p-4">
        <div className="flex justify-center items-center">
          <span className="text-center text-3xl font-semibold ">Got Air?</span>
        </div>

        <div className="max-w-2xl flex p-4 justify-center">
          <form
            className="flex"
            action=""
            onSubmit={(e) => {
              e.preventDefault();
              onSearch();
            }}
          >
            <Input
              className="w-full"
              placeholder="zip/state/city"
              value={localInput}
              onChange={(e) => setLocalInput(e.target.value)}
            />
            <Button
              className="cursor-pointer ml-4 bg-blue-600 hover:bg-blue-800"
              type="submit"
            >
              <svg
                width="1024"
                height="1024"
                viewBox="0 0 1024 1024"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="currentColor"
                  d="M1014.64 969.04L703.71 656.207c57.952-69.408 92.88-158.704 92.88-256.208c0-220.912-179.088-400-400-400s-400 179.088-400 400s179.088 400 400 400c100.368 0 192.048-37.056 262.288-98.144l310.496 312.448c12.496 12.497 32.769 12.497 45.265 0c12.48-12.496 12.48-32.752 0-45.263zM396.59 736.527c-185.856 0-336.528-150.672-336.528-336.528S210.734 63.471 396.59 63.471s336.528 150.672 336.528 336.528S582.446 736.527 396.59 736.527"
                />
              </svg>
            </Button>
          </form>
        </div>
        <div className="flex items-center justify-center">
          <div>
            {role !== "" && isAuthenticated && (
              <>
                {role === "Admin" ? (
                  <Button className="bg-blue-600 hover:bg-blue-800 mr-4 cursor-pointer">
                    <Link href="/admin/dashboard">Dashboard</Link>
                  </Button>
                ) : (
                  <Button className="bg-blue-600 hover:bg-blue-800 mr-4 cursor-pointer">
                    <Link href="/submit">Add Location</Link>
                  </Button>
                )}
                <Button
                  className="bg-blue-600 hover:bg-blue-800 cursor-pointer"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            )}
          </div>

          {!isLoading && !isAuthenticated && (
            <Button
              className="bg-blue-600 hover:bg-blue-800 "
              onClick={handleLogIn}
            >
              Login
            </Button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

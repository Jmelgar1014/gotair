"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "../components/layout/Navbar";
export const dynamic = "auto";
import MapClient from "@/components/layout/MapClient";
import AddStation from "@/components/layout/AddStation";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth0 } from "@auth0/auth0-react";
import { usePermissionContext } from "@/context/PermissionProvider";

export default function Home() {
  const { authToken, role } = usePermissionContext();
  const router = useRouter();
  // const [jwtToken, setJwtToken] = useState<string>("");
  const { isAuthenticated } = useAuth0();
  const searchParams = useSearchParams();
  // const [role, setRole] = useState<string>("");
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchLocation, setSearchLocation] = useState<[number, number] | null>(
    null
  );

  useEffect(() => {
    if (isAuthenticated) {
      console.log("authenticated");
      // checkRoles();
    } else {
      console.log("not authenticated");
      // setRole("");
      // checkRoles();
    }
    const locationParam = searchParams.get("location");

    if (locationParam === null) return;
    console.log(locationParam);

    if (!locationParam) {
      setSearchLocation([51.5073509, -0.1277583]);
      return;
    }
    const fetchCoords = async () => {
      try {
        const res = await fetch(
          `/api/search?q=${encodeURIComponent(locationParam)}`,
          {
            method: "GET",
          }
        );
        const data = await res.json();
        console.log(data);
        if (data.length > 0) {
          const lat = parseFloat(data[0].lat);
          const lng = parseFloat(data[0].lon);
          setSearchLocation([lat, lng]);
        } else {
          setSearchLocation([51.5073509, -0.1277583]);
        }
      } catch (err) {
        setSearchLocation([51.5073509, -0.1277583]);
        console.error("Failed to fetch geocode:", err);
      }
    };
    fetchCoords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  useEffect(() => {
    const locationParam = searchParams.get("location");

    if (locationParam === null) return;
    console.log(locationParam);

    if (!locationParam) {
      setSearchLocation([51.5073509, -0.1277583]);
      return;
    }
    const fetchCoords = async () => {
      try {
        const res = await fetch(
          `/api/search?q=${encodeURIComponent(locationParam)}`,
          {
            method: "GET",
          }
        );
        const data = await res.json();
        console.log(data);
        if (data.length > 0) {
          const lat = parseFloat(data[0].lat);
          const lng = parseFloat(data[0].lon);
          setSearchLocation([lat, lng]);
        } else {
          setSearchLocation([51.5073509, -0.1277583]);
        }
      } catch (err) {
        setSearchLocation([51.5073509, -0.1277583]);
        console.error("Failed to fetch geocode:", err);
      }
    };
    fetchCoords();
  }, [searchParams]);
  const handleSearch = async () => {
    if (!searchInput) return;

    try {
      const res = await fetch(
        `/api/search?q=${encodeURIComponent(searchInput)}`,
        {
          headers: { "Content-type": "application/json" },
        }
      );
      const data = await res.json();

      if (data.length > 0) {
        const lat = parseFloat(data[0].lat);
        const lng = parseFloat(data[0].lon);
        setSearchLocation([lat, lng]);
        console.log(searchLocation);
      } else {
        alert("Location not found.");
      }
      const params = new URLSearchParams(searchParams.toString());

      params.set("location", searchInput);

      router.replace(`?${params.toString()}`);
    } catch (error) {
      console.error("Error geocoding:", error);
    }

    setSearchInput("");
  };

  return (
    <>
      <Navbar
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        onSearch={handleSearch}
        role={role}
      />

      <main className="grid grid-cols-1 gap-8 w-full sm:flex  ">
        <section className="w-full sm:max-w-96 p-4 ">
          <div className="flex justify-center  m-2">
            <Card className="max-w-96 w-full p-4 sm:w-full shadow-md ">
              <CardHeader>
                <CardTitle>Air Legend</CardTitle>
                {/* <CardDescription>Card Description</CardDescription> */}
                {/* <CardAction>Card Action</CardAction> */}
              </CardHeader>
              <CardContent>
                <p className="text-zinc-500 font-semibold">Pump Types</p>
                <p className="my-2">Free Air</p>
                <p className="my-2">Paid Air</p>
              </CardContent>
            </Card>
          </div>
          {role === "Admin" && <AddStation jwt={authToken} />}
        </section>
        <section className=" flex-1">
          <div className="p-4 max-w-5xl h-full ">
            <MapClient searchLocation={searchLocation} />
          </div>
        </section>
      </main>
    </>
  );
}

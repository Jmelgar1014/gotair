"use client";
import Navbar from "../components/layout/Navbar";
export const dynamic = "auto";
import MapClient from "@/components/layout/MapClient";
import AddStation from "@/components/layout/AddStation";
import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { usePermissionContext } from "@/context/PermissionProvider";
import LegendCard from "@/components/layout/LegendCard";
const DEFAULT_LOCATION: [number, number] = [51.5073509, -0.1277583];

export default function Home() {
  const { authToken, role } = usePermissionContext();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchLocation, setSearchLocation] = useState<[number, number] | null>(
    null
  );

  const fetchGeocode = async (
    query: string
  ): Promise<[number, number] | null> => {
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`, {
        method: "GET",
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();

      if (data.length > 0) {
        const lat = parseFloat(data[0].lat);
        const lng = parseFloat(data[0].lon);

        // Validate coordinates
        if (!isNaN(lat) && !isNaN(lng)) {
          return [lat, lng];
        }
      }

      return null;
    } catch (error) {
      console.error("Failed to fetch geocode:", error);
      return null;
    }
  };

  useEffect(() => {
    const locationParam = searchParams.get("location");

    if (locationParam === null) return;
    console.log(locationParam);

    if (!locationParam) {
      setSearchLocation(DEFAULT_LOCATION);
      return;
    }
    const fetchCoords = async () => {
      const coordinates = await fetchGeocode(locationParam);

      setSearchLocation(coordinates || DEFAULT_LOCATION);
    };

    fetchCoords();
  }, [searchParams]);

  const handleSearch = useCallback(async () => {
    if (!searchInput) return;

    try {
      const coords = await fetchGeocode(searchInput);

      if (coords) {
        setSearchLocation(coords);

        // Update URL with new location
        const params = new URLSearchParams(searchParams.toString());
        params.set("location", searchInput);
        router.replace(`?${params.toString()}`);
      } else {
        alert("Location not found.");
      }
    } catch (error) {
      console.error("Error during search:", error);
      alert("Search failed. Please try again.");
    } finally {
      setSearchInput("");
    }
  }, [searchInput, router, searchParams]);

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
            <LegendCard />
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

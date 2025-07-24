"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "../components/layout/Navbar";
export const Dynamic = "force-dynamic";
import MapClient from "@/components/layout/MapClient";
import AddStation from "@/components/layout/AddStation";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchLocation, setSearchLocation] = useState<[number, number]>([
    51.5073509, -0.1277583,
  ]);

  useEffect(() => {
    const locationParam = searchParams.get("location");
    if (!locationParam) return;

    const fetchCoords = async () => {
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${locationParam}`
        );
        const data = await res.json();
        if (data.length > 0) {
          const lat = parseFloat(data[0].lat);
          const lng = parseFloat(data[0].lon);
          setSearchLocation([lat, lng]);
        }
      } catch (err) {
        console.error("Failed to fetch geocode:", err);
      }
    };

    fetchCoords();
  }, []);
  const handleSearch = async () => {
    if (!searchInput) return;

    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${searchInput}`
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
          <AddStation />
        </section>
        <section className=" flex-1">
          <div className="p-4 max-w-4xl h-full">
            <MapClient searchLocation={searchLocation} />
          </div>
        </section>
      </main>
    </>
  );
}

// components/MapClient.tsx
"use client";

import dynamic from "next/dynamic";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

// now legal inside a client component
const LeafletMap = dynamic(() => import("./Map"), { ssr: false });

type searchInfo = {
  searchLocation: [number, number] | null;
};

export default function MapClient({ searchLocation }: searchInfo) {
  const locations = useQuery(api.tasks.get);

  return <LeafletMap list={locations} location={searchLocation} />;
}

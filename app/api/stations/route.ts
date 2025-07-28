import { NextResponse } from "next/server";
import { api } from "@/convex/_generated/api";
import { fetchMutation } from "convex/nextjs";

export async function POST(req: Request) {
  const { name, address, lat, lng } = await req.json();

  const langNum = parseFloat(lat);
  const lngNum = parseFloat(lng);

  await fetchMutation(api.addStation.addStation, {
    name: name,
    address: address,
    lat: langNum,
    lng: lngNum,
  });

  return NextResponse.json(
    { success: true, station: "created" },
    { status: 201 }
  );
}

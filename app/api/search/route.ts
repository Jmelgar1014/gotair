import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const query = searchParams.get("q");

  const data = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query || "")}`,
    {
      headers: {
        "User-Agent": "got-air-portfolio/0.1 jmelgar420@gmail.com",
      },
    }
  );

  const result = await data.json();

  return NextResponse.json(result);
}

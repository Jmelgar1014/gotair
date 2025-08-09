import { NextResponse } from "next/server";
import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
import { fetchMutation } from "convex/nextjs";
import jwt from "jsonwebtoken";
import jwtksClient from "jwks-rsa";
import { GetPublicKeyOrSecret } from "jsonwebtoken";
import { z } from "zod";
import {
  getLocationType,
  insertLocationType,
  submitLocationType,
} from "@/schema/submitLocationSchema";

export type userSubmitType = z.infer<typeof submitLocationType>;

interface jwtPayload {
  aud: string[];
  azp: string;
  exp: number;
  iat: number;
  iss: string;
  permissions: string[];
  scope: string;
  sub: string;
}

const client = jwtksClient({
  jwksUri: "https://dev-6ohlvojg873h5znq.us.auth0.com/.well-known/jwks.json",
});

const getKey: GetPublicKeyOrSecret = (header, callback) => {
  client.getSigningKey(header.kid, (err, key) => {
    if (err || !key) {
      callback(err, undefined);
    } else {
      callback(null, key.getPublicKey());
    }
  });
};

export async function GET(req: Request) {
  const authHeader = req.headers.get("authorization");

  if (!authHeader) {
    return Response.json({ error: "No token provided" }, { status: 401 });
  }

  const parts = authHeader.split(" ");
  const token = parts.length > 1 ? parts[1] : null;

  if (!token) {
    return Response.json({ error: "Token malformed" }, { status: 401 });
  }

  const verifyJwt = () =>
    new Promise((resolve, reject) => {
      jwt.verify(token, getKey, { algorithms: ["RS256"] }, (err, decoded) => {
        if (err) reject(err);
        else resolve(decoded);
      });
    });

  try {
    const decoded = (await verifyJwt()) as jwtPayload;

    const { searchParams } = new URL(req.url);
    const cursor = searchParams.get("cursor");

    if (decoded.permissions.includes("Admin")) {
      const data = await fetchQuery(api.submitLocation.getSubmits, {
        paginationOpts: { numItems: 10, cursor: cursor || null },
      });

      const parsed = getLocationType.safeParse(data);

      if (!parsed.success) {
        return NextResponse.json({
          error: "Response Error",
        });
      }

      return NextResponse.json(parsed.data, { status: 200 });
    } else {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
  } catch (error) {
    console.log(error);
  }
}

export async function POST(req: Request) {
  const authHeader = req.headers.get("authorization");

  if (!authHeader) {
    return Response.json({ error: "No token provided" }, { status: 401 });
  }

  const parts = authHeader.split(" ");
  const token = parts.length > 1 ? parts[1] : null;

  if (!token) {
    return Response.json({ error: "Token malformed" }, { status: 401 });
  }

  const verifyJwt = () =>
    new Promise((resolve, reject) => {
      jwt.verify(token, getKey, { algorithms: ["RS256"] }, (err, decoded) => {
        if (err) reject(err);
        else resolve(decoded);
      });
    });

  try {
    const decoded = (await verifyJwt()) as jwtPayload;

    const id = decoded.sub;

    if (decoded.permissions.includes("baseUser")) {
      const json = await req.json();

      const input = {
        name: json.name,
        address: json.address,
        city: json.city,
        state: json.state,
        userId: id,
      };

      const parsed = insertLocationType.safeParse(input);

      if (!parsed.success) {
        return NextResponse.json(
          {
            Error: "Input is not correct format",
          },
          { status: 400 }
        );
      }

      await fetchMutation(api.submitLocation.submit, parsed.data);
      return NextResponse.json(
        { success: true, station: "created" },
        { status: 200 }
      );
    } else {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
  } catch (error) {
    console.log(error);
  }
}

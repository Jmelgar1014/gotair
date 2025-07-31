import jwt from "jsonwebtoken";
import jwtksClient from "jwks-rsa";
import { GetPublicKeyOrSecret } from "jsonwebtoken";

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

    const permission: string = decoded.permissions[0];

    // Do your permission checks here using decoded

    return Response.json({ message: "Token is valid!", permission });
  } catch (error) {
    return Response.json({ error: error }, { status: 401 });
  }
}

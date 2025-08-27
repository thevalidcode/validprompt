import { NextResponse } from "next/server";

export function handlePreflight() {
  const res = NextResponse.json(null, { status: 204 });
  res.headers.set(
    "Access-Control-Allow-Origin",
    process.env.FRONTEND_URL || "*"
  );
  res.headers.set("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );
  return res;
}

export function withCors(res: NextResponse) {
  res.headers.set(
    "Access-Control-Allow-Origin",
    process.env.FRONTEND_URL || "*"
  );
  res.headers.set("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );
  return res;
}

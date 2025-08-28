import { NextRequest, NextResponse } from "next/server";

const allowedOrigin = process.env.FRONTEND_URL || "";

export function validateOrigin(req: NextRequest): NextResponse | null {
  const origin = req.headers.get("origin");

  if (!origin || origin !== allowedOrigin) {
    return NextResponse.json(
      { error: "CORS origin not allowed" },
      {
        status: 403,
        headers: {
          Vary: "Origin",
        },
      }
    );
  }

  return null; // means it's valid
}

export function handlePreflight(req: NextRequest): NextResponse | null {
  if (req.method === "OPTIONS") {
    const origin = req.headers.get("origin") || "";
    if (origin === allowedOrigin) {
      return NextResponse.json(
        {},
        { status: 200, headers: corsHeaders(origin) }
      );
    }
    return NextResponse.json(
      { error: "CORS origin not allowed" },
      { status: 403 }
    );
  }
  return null; // means it's not a preflight
}

export function corsHeaders(origin: string) {
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Credentials": "true",
    Vary: "Origin",
  };
}

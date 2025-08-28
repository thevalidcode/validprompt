import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";
import axios from "axios";
import { validateOrigin, handlePreflight, corsHeaders } from "@/lib/cors";

const prisma = new PrismaClient();
const MAX_REQUESTS_PER_DAY = 10;

interface GenerateRequest {
  input: string;
}
interface GenerateResponse {
  result: string;
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  // Validate origin
  const originCheck = validateOrigin(req);
  if (originCheck) return originCheck;

  // Handle OPTIONS
  const preflight = handlePreflight(req);
  if (preflight) return preflight;

  const origin = req.headers.get("origin")!;

  try {
    const body: GenerateRequest = await req.json();
    if (!body.input || !body.input.trim()) {
      return NextResponse.json(
        { error: "Input required" },
        { status: 400, headers: corsHeaders(origin) }
      );
    }

    const ip =
      req.headers.get("x-forwarded-for") ||
      req.headers.get("cf-connecting-ip") ||
      "unknown";
    const today = new Date().toISOString().slice(0, 10);

    // Check usage
    const usage = await prisma.usage.findUnique({
      where: { ip_date: { ip, date: today } },
    });

    if (usage?.count && usage.count >= MAX_REQUESTS_PER_DAY) {
      return NextResponse.json(
        { error: "Rate limit reached (10/day)" },
        { status: 429, headers: corsHeaders(origin) }
      );
    }

    // Increment or create
    if (usage) {
      await prisma.usage.update({
        where: { ip_date: { ip, date: today } },
        data: { count: { increment: 1 } },
      });
    } else {
      await prisma.usage.create({
        data: { ip, date: today, count: 1 },
      });
    }

    // Call OpenAI
    const openAiResponse = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-5-nano",
        messages: [
          {
            role: "system",
            content:
              "You generate clear, concise, and high-quality prompts from minimal user input. The result should never exceed a short paragraph (around 200 words max) and must be straight to the point.",
          },
          { role: "user", content: body.input },
        ],
      },
      { headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` } }
    );

    const result =
      openAiResponse.data.choices?.[0]?.message?.content || "No response";

    return NextResponse.json<GenerateResponse>(
      { result },
      { status: 200, headers: corsHeaders(origin) }
    );
  } catch (error: unknown) {
    let message = "Internal Server Error";

    if (axios.isAxiosError(error)) {
      message = error.response?.data?.error?.message ?? message;
    } else if (error instanceof Error) {
      message = error.message;
    }

    console.error(message);

    return NextResponse.json(
      { error: message },
      { status: 500, headers: corsHeaders(origin) }
    );
  }
}

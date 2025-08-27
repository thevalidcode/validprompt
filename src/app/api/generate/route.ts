import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";
import { handlePreflight, withCors } from "@/lib/cors";
import axios from "axios";

const prisma = new PrismaClient();
const MAX_REQUESTS_PER_DAY = 10;

interface GenerateRequest {
  input: string;
}
interface GenerateResponse {
  result: string;
}

export async function OPTIONS() {
  return handlePreflight();
}

export async function POST(req: Request): Promise<Response> {
  try {
    const body: GenerateRequest = await req.json();
    if (!body.input.trim())
      return withCors(
        NextResponse.json({ error: "Input required" }, { status: 400 })
      );

    const ip = req.headers.get("x-forwarded-for") || "unknown";
    const today = new Date().toISOString().slice(0, 10);

    // Check usage
    let usage = await prisma.usage.findUnique({
      where: { ip_date: { ip, date: today } },
    });

    if (usage?.count && usage.count >= MAX_REQUESTS_PER_DAY) {
      return withCors(
        NextResponse.json(
          { error: "Rate limit reached (10/day)" },
          { status: 429 }
        )
      );
    }

    // Increment or create
    if (usage) {
      usage = await prisma.usage.update({
        where: { ip_date: { ip, date: today } },
        data: { count: { increment: 1 } },
      });
    } else {
      usage = await prisma.usage.create({
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
    return withCors(NextResponse.json<GenerateResponse>({ result }));
  } catch (error: any) {
    console.error(error.response.data.error.message || error);
    return withCors(
      NextResponse.json(
        { error: error.response.data.error.message || "Internal Server Error" },
        { status: 500 }
      )
    );
  }
}

import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || "",
});

export async function POST(request) { // Hapus `: NextRequest`
  try {
    const { content } = await request.json();

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: content,
        },
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      max_tokens: 1024,
      stream: false,
    });

    return NextResponse.json(completion);
  } catch (error) {
    console.error("Error in chat completion:", error);
    return NextResponse.json(
      { error: "Failed to get chat completion" },
      { status: 500 }
    );
  }
}
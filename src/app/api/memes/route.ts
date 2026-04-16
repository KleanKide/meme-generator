import { NextResponse } from "next/server";
import { getMemesQuery } from "@/services/queries";

export async function GET() {
  try {
    const memes = await getMemesQuery();

    return NextResponse.json(memes);
  } catch (error) {
    console.error("API route error:", error);

    return NextResponse.json(
      { message: "Failed to load memes" },
      { status: 500 },
    );
  }
}

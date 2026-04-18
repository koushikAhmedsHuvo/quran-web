import { NextRequest, NextResponse } from "next/server";
import { editions } from "../_data/loader";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");

  let result = editions.filter((e) => e.format === "text");
  if (type) result = result.filter((e) => e.type === type);
  result = result.slice().sort((a, b) => a.language.localeCompare(b.language));

  return NextResponse.json(result);
}

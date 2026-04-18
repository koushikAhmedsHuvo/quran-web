import { NextResponse } from "next/server";
import { surahs } from "../_data/loader";

export async function GET() {
  return NextResponse.json(surahs);
}

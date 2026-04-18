import { NextResponse } from "next/server";
import { surahs } from "../../_data/loader";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ number: string }> },
) {
  const { number } = await params;
  const num = parseInt(number);
  if (isNaN(num)) {
    return NextResponse.json({ message: "Invalid surah number" }, { status: 400 });
  }
  const surah = surahs.find((s) => s.number === num);
  if (!surah) {
    return NextResponse.json({ message: `Surah ${num} not found` }, { status: 404 });
  }
  return NextResponse.json(surah);
}

import { NextResponse } from "next/server";
import { printLabel } from "@/lib/printLabel";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = await printLabel(body);
    return NextResponse.json(result);
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        error: "Internal Server Error",
        err,
      },
      { status: 500 }
    );
  }
}

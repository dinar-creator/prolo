import { NextResponse } from "next/server";
import { createShipment } from "@/lib/createShipment";
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = await createShipment(body);
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

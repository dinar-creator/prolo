import { NextResponse } from "next/server";
import { submitCreateShipmentForm } from "@/lib/submitCreateShipmentForm";
import { CreateShipmentFormData } from "@/lib/types";
export async function POST(req: Request) {
  try {
    const body = (await req.json()) as CreateShipmentFormData;
    const result = await submitCreateShipmentForm(body);
    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      {
        error: "Internal Server Error",
        err,
      },
      { status: 500 }
    );
  }
}

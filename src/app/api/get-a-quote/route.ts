import { NextResponse } from "next/server";
import { submitGetAQuoteForm } from "@/lib/submitGetAQuoteForm";
import { GetAQuoteFormData } from "@/lib/types";
export async function POST(req: Request) {
  try {
    const body = (await req.json()) as GetAQuoteFormData;
    const result = await submitGetAQuoteForm(body);
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

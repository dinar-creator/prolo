import { NextResponse } from "next/server";
import { submitContactForm } from "@/lib/submitContactForm";
import { ContactFormData } from "@/lib/types";
export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ContactFormData;
    const result = await submitContactForm(body);
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

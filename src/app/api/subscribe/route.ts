import { NextResponse } from "next/server";
import { SubmitSubscriptionForm } from "@/lib/submitSubscriptionForm";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { email: string };
    const result = await SubmitSubscriptionForm(body);
    return NextResponse.json(result, { status: 200 });
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

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { locales, data } = await req.json();
    const { name, phone, email, storageType, palletCount, storageCity, storageDuration } = data;

    const formboldRes = await fetch(process.env.STORAGE_REQUEST_FORM_URL!, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        phone,
        email,
        storageType,
        palletCount,
        storageCity,
        storageDuration,
        locale: locales,
      }),
    });

    if (!formboldRes.ok) {
      throw new Error(`FormBold responded with ${formboldRes.status}`);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Storage request error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to submit storage request" },
      { status: 500 }
    );
  }
}
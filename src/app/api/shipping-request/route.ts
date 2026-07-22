import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { locales, data } = await req.json();
    const { name, phone, email, loadType, vehicleType, quantity, pickupCity, dropoffCity } = data;

    const formboldRes = await fetch(process.env.SHIPPING_REQUEST_FORM_URL!, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        phone,
        email,
        loadType,
        vehicleType: vehicleType ?? null,
        quantity: quantity ?? null,
        pickupCity,
        dropoffCity,
        locale: locales,
      }),
    });

    if (!formboldRes.ok) {
      throw new Error(`FormBold responded with ${formboldRes.status}`);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Shipping request error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to submit shipping request" },
      { status: 500 }
    );
  }
}
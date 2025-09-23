import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { v4 as uuidv4 } from "uuid";

export async function POST(request) {
  const { finalTotal } = await request.json();

  const instance = new Razorpay({
    key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

  const options = {
    amount: Math.round(finalTotal * 100), // Amount in paise
    currency: "INR",
    receipt: `rcpt${uuidv4()}`,
  };

  try {
    const order = await instance.orders.create(options);
    return NextResponse.json({ order });
  } catch (error) {
    console.error("Razorpay Error:", error);
    return NextResponse.json(
      { error: "Error creating checkout order" },
      { status: 500 }
    );
  }
}

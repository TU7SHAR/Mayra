// app/api/payment-webhook/route.js

import { NextResponse } from "next/server";
import crypto from "crypto";
import nodemailer from "nodemailer"; // Use Nodemailer

export async function POST(request) {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  const body = await request.text();
  const signature = request.headers.get("x-razorpay-signature");

  // Verify the request is actually from Razorpay
  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(body)
    .digest("hex");

  if (expectedSignature !== signature) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const event = JSON.parse(body);

  // Create the Nodemailer transporter (same as your OTP route)
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
  });

  // Handle the event
  switch (event.event) {
    case "payment.captured":
      const paymentCaptured = event.payload.payment.entity;
      console.log("Payment was successful:", paymentCaptured);

      // Send a success email with Nodemailer
      await transporter.sendMail({
        from: `"Myara Organics" <${process.env.EMAIL_SERVER_USER}>`,
        to: paymentCaptured.email,
        subject: "Order Confirmation - Myara Organics",
        html: `<h1>Thank you for your order!</h1><p>Your payment of Rs. ${paymentCaptured.amount / 100} was successful.</p>`,
      });
      break;

    case "payment.failed":
      const paymentFailed = event.payload.payment.entity;
      console.log("Payment failed:", paymentFailed);

      // Send a payment failure email with Nodemailer
      await transporter.sendMail({
        from: `"Myara Organics" <${process.env.EMAIL_SERVER_USER}>`,
        to: paymentFailed.email,
        subject: "Payment Failed - Myara Organics",
        html: `<h1>Your payment failed.</h1><p>Your payment of Rs. ${paymentFailed.amount / 100} could not be processed. Please try again.</p>`,
      });
      break;

    default:
      console.log(`Unhandled event type: ${event.event}`);
  }

  return NextResponse.json({ status: "ok" });
}

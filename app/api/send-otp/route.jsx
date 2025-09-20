// app/api/send-otp/route.js
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";

// Define the session options in one place
const sessionOptions = {
  password: process.env.SESSION_SECRET,
  cookieName: "user-session",
};

export async function POST(request) {
  const { email } = await request.json();

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const hashedOtp = await bcrypt.hash(otp, 10);
  const otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

  // MODIFIED: Use the shared sessionOptions
  const session = await getIronSession(cookies(), sessionOptions);

  session.email = email;
  session.hashedOtp = hashedOtp;
  session.otpExpires = otpExpires;
  await session.save();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
  });

  try {
    await transporter.sendMail({
      from: `"Myara Organics" <${process.env.EMAIL_SERVER_USER}>`,
      to: email,
      subject: "Your Myara Organics Verification Code",
      html: `<p>Your one-time verification code is: <strong>${otp}</strong></p><p>This code will expire in 10 minutes.</p>`,
    });
    return Response.json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Failed to send OTP" }, { status: 500 });
  }
}

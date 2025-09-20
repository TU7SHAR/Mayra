// app/api/verify-otp/route.js
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";

export async function POST(request) {
  const { otp } = await request.json();

  const session = await getIronSession(cookies(), {
    password: process.env.SESSION_SECRET,
    cookieName: "user-session",
  });

  // 1. Check if there's an OTP in the session and if it's expired
  if (
    !session.hashedOtp ||
    !session.otpExpires ||
    Date.now() > session.otpExpires
  ) {
    return Response.json({ error: "OTP expired or invalid." }, { status: 400 });
  }

  // 2. Securely compare the submitted OTP with the stored hash
  const isMatch = await bcrypt.compare(otp, session.hashedOtp);

  if (!isMatch) {
    return Response.json({ error: "Incorrect OTP." }, { status: 400 });
  }

  // 3. If correct, mark the user as logged in and remove the OTP data
  session.isLoggedIn = true;
  delete session.hashedOtp;
  delete session.otpExpires;
  await session.save();

  return Response.json({ message: "Login successful" });
}

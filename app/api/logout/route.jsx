// app/api/logout/route.js
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

export async function POST() {
  const session = await getIronSession(cookies(), {
    password: process.env.SESSION_SECRET,
    cookieName: "user-session",
  });

  // Destroy the session
  session.destroy();

  return Response.json({ message: "Logged out successfully" });
}

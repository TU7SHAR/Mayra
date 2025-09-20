// app/api/session/route.js
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

export async function GET() {
  const session = await getIronSession(cookies(), {
    password: process.env.SESSION_SECRET,
    cookieName: "user-session",
  });

  // If there's no session or the user is not logged in, return an empty object
  if (!session.isLoggedIn) {
    return Response.json({});
  }

  // Return the session data
  return Response.json(session);
}

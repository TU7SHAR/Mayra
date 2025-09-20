// app/api/session/route.js

import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

const sessionOptions = {
  password: process.env.SESSION_SECRET,
  cookieName: "user-session",
};

export async function GET() {
  const session = await getIronSession(cookies(), sessionOptions);

  if (!session.isLoggedIn) {
    return Response.json({ isLoggedIn: false });
  }

  return Response.json(session);
}

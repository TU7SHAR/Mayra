// app/api/cart/clear/route.js
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

const prisma = new PrismaClient();
const sessionOptions = {
  password: process.env.SESSION_SECRET,
  cookieName: "user-session",
};

export async function DELETE() {
  const session = await getIronSession(cookies(), sessionOptions);
  if (!session.isLoggedIn) {
    return Response.json({ error: "Not authenticated" }, { status: 401 });
  }

  await prisma.cartItem.deleteMany({
    where: { userId: session.userId },
  });

  return Response.json([]); // Return an empty cart
}

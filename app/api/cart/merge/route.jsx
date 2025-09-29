import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

const prisma = new PrismaClient();
const sessionOptions = {
  password: process.env.SESSION_SECRET,
  cookieName: "user-session",
};

export async function POST(request) {
  const session = await getIronSession(cookies(), sessionOptions);
  if (!session.isLoggedIn) {
    return Response.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { guestCart } = await request.json();
  const userId = session.userId;

  if (!guestCart || guestCart.length === 0) {
    return Response.json({ message: "No items to merge." });
  }

  for (const guestItem of guestCart) {
    const existingItem = await prisma.cartItem.findFirst({
      where: {
        userId,
        productId: guestItem.productId,
        variantName: guestItem.variant,
      },
    });

    if (existingItem) {
      await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + guestItem.quantity },
      });
    } else {
      await prisma.cartItem.create({
        data: {
          userId,
          productId: guestItem.productId,
          name: guestItem.name,
          variantName: guestItem.variant,
          price: guestItem.price,
          image: guestItem.image,
          quantity: guestItem.quantity,
        },
      });
    }
  }

  return Response.json({ message: "Cart merged successfully." });
}

// app/api/cart/route.js
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

const prisma = new PrismaClient();
const sessionOptions = {
  password: process.env.SESSION_SECRET,
  cookieName: "user-session",
};

// Function to get the current user's cart
export async function GET() {
  const session = await getIronSession(cookies(), sessionOptions);
  if (!session.isLoggedIn) {
    return Response.json({ error: "Not authenticated" }, { status: 401 });
  }
  const cartItems = await prisma.cartItem.findMany({
    where: { userId: session.userId },
  });
  return Response.json(cartItems);
}

// Function to add an item to the cart
export async function POST(request) {
  const session = await getIronSession(cookies(), sessionOptions);
  if (!session.isLoggedIn) {
    return Response.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { product, variant, quantity } = await request.json();
  const userId = session.userId;

  const existingItem = await prisma.cartItem.findFirst({
    where: { userId, productId: product.id, variantName: variant.name },
  });

  if (existingItem) {
    await prisma.cartItem.update({
      where: { id: existingItem.id },
      data: { quantity: existingItem.quantity + quantity },
    });
  } else {
    await prisma.cartItem.create({
      data: {
        userId,
        productId: product.id,
        name: product.name,
        variantName: variant.name,
        price: variant.price,
        image: product.images[0],
        quantity,
      },
    });
  }
  const updatedCart = await prisma.cartItem.findMany({ where: { userId } });
  return Response.json(updatedCart);
}

// Function to delete an item from the cart
export async function DELETE(request) {
  const session = await getIronSession(cookies(), sessionOptions);
  if (!session.isLoggedIn) {
    return Response.json({ error: "Not authenticated" }, { status: 401 });
  }
  const { cartItemId } = await request.json();
  await prisma.cartItem.delete({ where: { id: cartItemId } });
  const updatedCart = await prisma.cartItem.findMany({
    where: { userId: session.userId },
  });
  return Response.json(updatedCart);
}

export async function PUT(request) {
  const session = await getIronSession(cookies(), sessionOptions);
  if (!session.isLoggedIn) {
    return Response.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { cartItemId, newQuantity } = await request.json();

  // Ensure the item belongs to the user before updating
  const itemToUpdate = await prisma.cartItem.findFirst({
    where: { id: cartItemId, userId: session.userId },
  });

  if (!itemToUpdate) {
    return Response.json(
      { error: "Item not found or permission denied." },
      { status: 404 }
    );
  }

  await prisma.cartItem.update({
    where: { id: cartItemId },
    data: { quantity: newQuantity },
  });

  const updatedCart = await prisma.cartItem.findMany({
    where: { userId: session.userId },
  });
  return Response.json(updatedCart);
}

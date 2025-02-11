import { auth } from "@/auth"
import { db } from "@/db"
import { favorites } from "@/db/schema"
import { and, eq } from "drizzle-orm"
import { NextResponse,NextRequest } from "next/server"

export async function GET(req: Request) {
  const session = await auth();
  if (!session || !session.user) {
    return NextResponse.json({ message: "You must be logged in." }, { status: 401 }); // Return a NextResponse
  }

  const url = new URL(req.url);
  const recipeId = url.searchParams.get("recipeId"); // Get recipeId from query params
  if (!recipeId) {
    return NextResponse.json({ message: "recipeId is required" }, { status: 400 });
  }

  try {
    const result = await db
      .select()
      .from(favorites)
      .where(and(eq(favorites.userId, session.user.id), eq(favorites.recipeId, recipeId)))
      .limit(1);

    return NextResponse.json({ isFavorite: result.length > 0 }, { status: 200 }); // Return a NextResponse
  } catch (error) {
    console.error("Error checking favorite status:", error);
    return NextResponse.json({ message: "Error checking favorite status" }, { status: 500 }); // Return a NextResponse
  }
}

export async function POST(req: NextRequest) {
  const session = await auth();

  if (!session || !session.user) {
    return NextResponse.json({ message: "You must be logged in." }, { status: 401 });
  }

  try {
    const url = new URL(req.url);
    const recipeId = url.searchParams.get("recipeId"); // Get recipeId from query params

    if (!recipeId) {
      return NextResponse.json({ message: "recipeId is required" }, { status: 400 });
    }

    const existingFavorite = await db
      .select()
      .from(favorites)
      .where(and(eq(favorites.userId, session.user.id), eq(favorites.recipeId, recipeId)))
      .limit(1);


    if (existingFavorite.length > 0) {
      await db.delete(favorites).where(and(eq(favorites.userId, session.user.id), eq(favorites.recipeId, recipeId)));
      return NextResponse.json({ isFavorite: false }, { status: 200 });
    } else {
      await db.insert(favorites).values({
        userId: session.user.id,
        recipeId: recipeId,
      });
      return NextResponse.json({ isFavorite: true }, { status: 200 });
    }
  } catch (error) {
    console.error("Error toggling favorite:", error);
    return NextResponse.json({ message: "Error toggling favorite" }, { status: 500 });
  }
}

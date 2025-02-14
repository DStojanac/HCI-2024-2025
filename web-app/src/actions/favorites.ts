"use server";

import { auth } from "@/auth";
import { db } from "@/db";
import { favorites } from "@/db/schema";
import { and, eq } from "drizzle-orm";

export async function toggleFavorite(recipeId: string) {
  const session = await auth();
  if (!session || !session.user) {
    throw new Error("You must be logged in.");
  }

  const userId = session.user.id;

  const existingFavorite = await db
    .select()
    .from(favorites)
    .where(and(eq(favorites.userId, userId), eq(favorites.recipeId, recipeId)))
    .limit(1);

  if (existingFavorite.length > 0) {
    await db
      .delete(favorites)
      .where(
        and(eq(favorites.userId, userId), eq(favorites.recipeId, recipeId))
      );
    return { isFavorite: false };
  } else {
    await db.insert(favorites).values({
      userId: userId,
      recipeId: recipeId,
    });
    return { isFavorite: true };
  }
}

export async function getFavoritedRecipes() {
  const session = await auth();
  if (!session || !session.user) {
    return [];
  }

  const userId = session.user.id;

  const favoritedRecipes = await db
    .select()
    .from(favorites)
    .where(eq(favorites.userId, userId));

  return favoritedRecipes.map((favorite) => favorite.recipeId);
}

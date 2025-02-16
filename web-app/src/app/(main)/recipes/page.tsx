import { getRecipes } from "@/sanity/lib/getRecipes";
import { RecipesClient } from "@/components/recipesClient";
import { RECIPE_QUERYResult } from "../../../../sanity.types";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Recipes | Cooksy",
  description:
    "Learn about Cooksy's mission to make cooking accessible and enjoyable for everyone.",
};

export const revalidate = 60; // revalidate this page every 60 seconds

export default async function RecipesPage() {
  const recipes: RECIPE_QUERYResult = await getRecipes();

  return <RecipesClient initialRecipes={recipes} />;
}

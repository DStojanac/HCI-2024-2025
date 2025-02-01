import { RECIPE_QUERY } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";

export async function getRecipes() {
  const recipes = await client.fetch(RECIPE_QUERY);
  return recipes;
}

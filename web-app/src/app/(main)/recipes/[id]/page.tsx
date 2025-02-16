import { RECIPE_ID_QUERY } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import { RECIPE_ID_QUERYResult } from "../../../../../sanity.types";
import RecipeClient from "@/components/recipeClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Recipe | Cooksy",
  description:
    "Learn about Cooksy's mission to make cooking accessible and enjoyable for everyone.",
};

export const revalidate = 60; // revalidate this page every 60 seconds

export default async function RecipePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const recipe: RECIPE_ID_QUERYResult = await client.fetch(RECIPE_ID_QUERY, {
    id,
  });

  return <RecipeClient recipe={recipe} id={id} />;
}

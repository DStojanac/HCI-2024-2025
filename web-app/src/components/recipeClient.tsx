"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, Users, ChefHat } from "lucide-react";
import { urlFor } from "@/sanity/lib/image";
import { RECIPE_ID_QUERYResult } from "../../sanity.types";
import NotFound from "@/app/not-found";
import { FavoriteButton } from "@/components/favoriteButton";
import { useFavorites } from "@/contexts/favoritesContext";
import { useEffect } from "react";
import { useSession } from "next-auth/react";

export default function RecipeClient({
  recipe,
  id,
}: {
  recipe: RECIPE_ID_QUERYResult;
  id: string;
}) {
  const { refreshFavorites } = useFavorites();
  const { status } = useSession();

  useEffect(() => {
    refreshFavorites();
  }, [refreshFavorites, status]);

  if (!recipe) {
    return <NotFound />;
  }

  return (
    <>
      <div className="bg-main-background container mx-auto px-12 py-10 xl:px-20">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Column: Image and Quick Info */}
          <div className="space-y-6">
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <Image
                src={
                  recipe && recipe.mainImage
                    ? urlFor(recipe.mainImage).url()
                    : "/placeholder.svg"
                }
                alt={recipe && recipe.title ? recipe.title : "Recipe Image"}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex justify-between items-center text-main-paragraph-text">
              <h1 className="text-3xl font-bold">{recipe.title}</h1>
              <div className="flex space-x-4 ">
                <FavoriteButton recipeId={id} />
              </div>
            </div>
            <div className="text-second-paragraph-text">
              {recipe.description}
            </div>
            <div className="flex flex-wrap gap-4 text-main-paragraph-text">
              <Badge
                variant="secondary"
                className="flex items-center gap-1 bg-second-background rounded-full"
              >
                <Clock className="h-4 w-4" />
                {recipe.cookingTime} mins
              </Badge>
              <Badge
                variant="secondary"
                className="flex items-center gap-1 bg-second-background rounded-full"
              >
                <Users className="h-4 w-4" />
                {recipe.servings} servings
              </Badge>
              <Badge
                variant="secondary"
                className="flex items-center gap-1 bg-second-background rounded-full"
              >
                <ChefHat className="h-4 w-4" />
                {recipe.difficulty}
              </Badge>
            </div>
          </div>

          {/* Right Column: Ingredients and Instructions */}
          <div>
            <Tabs defaultValue="ingredients" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-second-background  rounded-lg">
                <TabsTrigger
                  value="ingredients"
                  className="text-main-paragraph-text data-[state=active]:bg-main-background"
                >
                  Ingredients
                </TabsTrigger>
                <TabsTrigger
                  value="instructions"
                  className="text-main-paragraph-text data-[state=active]:bg-main-background"
                >
                  Instructions
                </TabsTrigger>
              </TabsList>
              <TabsContent value="ingredients">
                <Card className="border-second-paragraph-text">
                  <CardContent className="pt-6 ">
                    <ul className="list-disc list-inside space-y-2 text-main-paragraph-text">
                      {recipe.ingredients &&
                        recipe.ingredients.map((ingredient) => (
                          <li key={ingredient._key}>
                            {ingredient.amount &&
                            !ingredient.amount.startsWith("0")
                              ? `${ingredient.amount}`
                              : ""}{" "}
                            {ingredient.item}
                          </li>
                        ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="instructions">
                <Card className="border-second-paragraph-text">
                  <CardContent className="pt-6 border-second-paragraph-text">
                    <ol className="list-decimal list-inside space-y-4 text-main-paragraph-text">
                      {recipe.instructions &&
                        recipe.instructions.map((step, index) => (
                          <li key={index} className="pl-2">
                            {step}
                          </li>
                        ))}
                    </ol>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Nutrition Information */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">Nutrition Information</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-lg font-medium">
                  {recipe.nutrition?.calories ?? "N/A"}
                </p>
                <p className="text-sm text-muted-foreground capitalize">
                  Calories
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-lg font-medium">
                  {recipe.nutrition?.fat ?? "N/A"}
                </p>
                <p className="text-sm text-muted-foreground capitalize">Fat</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-lg font-medium">
                  {recipe.nutrition?.carbs ?? "N/A"}
                </p>
                <p className="text-sm text-muted-foreground capitalize">
                  Carbs
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-lg font-medium">
                  {recipe.nutrition?.protein ?? "N/A"}
                </p>
                <p className="text-sm text-muted-foreground capitalize">
                  Protein
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-lg font-medium">
                  {recipe.nutrition?.fiber ?? "N/A"}
                </p>
                <p className="text-sm text-muted-foreground capitalize">
                  Fiber
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Author Information */}
        <div className="mt-12 flex items-center space-x-4">
          <div className="relative w-16 h-16 rounded-full overflow-hidden">
            <Image
              src="/placeholder.svg"
              alt={recipe.author?.name ?? "Unknown Author"}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <p>Recipe by</p>
            <p className="text-lg font-semibold">
              {recipe.author?.name ?? "Unknown Author"}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

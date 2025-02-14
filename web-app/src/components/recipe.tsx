"use client";

import { urlFor } from "@/sanity/lib/image";
import { Card, CardFooter, CardHeader } from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";
import { ChefHat, Clock } from "lucide-react";
import { Badge } from "./ui/badge";
import Link from "next/link";
import { FavoriteButton } from "./favoriteButton";
import NotFound from "@/app/not-found";

type RECIPE = {
  mainImage: string | null;
  title: string | null;
  mealType: string | null;
  cookingTime: number | null;
  difficulty: string | null;
  _id: string;
};

export default function Recipe({ recipe }: { recipe: RECIPE }) {
  if (!recipe) {
    return <NotFound />;
  }

  return (
    <Card className="overflow-hidden">
      <div className="relative aspect-[4/3]">
        <Image
          src={
            recipe.mainImage
              ? urlFor(recipe.mainImage).url()
              : "/placeholder.svg"
          }
          alt={recipe.title || "Recipe Image"}
          fill
          className="object-cover"
        />
        <FavoriteButton
          className="absolute top-2 right-2"
          recipeId={recipe._id}
        />
      </div>
      <CardHeader className="space-y-1">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-lg line-clamp-1">{recipe.title}</h3>
          <Badge
            variant="secondary"
            className="bg-second-background rounded-full ml-2"
          >
            {recipe.mealType}
          </Badge>
        </div>
        <div className="text-second-paragraph-text flex items-center gap-2 text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span className="text-sm">{recipe.cookingTime} mins</span>
          <ChefHat className="h-4 w-4 ml-2" />
          <span className="text-sm">{recipe.difficulty}</span>
        </div>
      </CardHeader>
      <CardFooter className="flex justify-between items-center">
        <Link
          href={"/recipes/" + recipe._id}
          className="font-medium text-second-paragraph-text"
        >
          <Button
            variant="ghost"
            size="sm"
            className="hover:bg-second-background font-medium text-second-paragraph-text"
          >
            View Recipe
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}

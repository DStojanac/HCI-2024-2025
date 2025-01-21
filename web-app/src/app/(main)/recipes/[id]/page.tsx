import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, Users, ChefHat, Heart, Star } from "lucide-react";
import { RECIPE_ID_QUERY } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";



export default async function RecipePage({params}: {params: Promise<{ id: string }>}) {
  const id=(await params).id;
  const recipe=await client.fetch(RECIPE_ID_QUERY, {id});

  return (
    <div className="bg-main-background container mx-auto px-12 py-10 xl:px-20">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Left Column: Image and Quick Info */}
        <div className="space-y-6">
          <div className="relative aspect-video rounded-lg overflow-hidden">
            <Image
              src={urlFor(recipe.mainImage).url()}
              alt={recipe.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex justify-between items-center text-main-paragraph-text">
            <h1 className="text-3xl font-bold">{recipe.title}</h1>
            <div className="flex space-x-4 ">
              <Button
                variant="outline"
                size="icon"
                className="bg-main-background hover:bg-second-background"
              >
                <Heart className="h-6 w-6 " />
              </Button>
            </div>
          </div>
          <div className="text-second-paragraph-text">{recipe.description}</div>
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
          {/* {<div className="flex items-center space-x-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${
                  i < Math.floor(5)
                    ? "text-second-background fill-current"
                    : "text-main-paragraph-text "
                }`}
              />
            ))}
            <span className="font-medium text-second-paragraph-text">
              {5}
            </span>
            <span className="text-muted-foreground text-second-paragraph-text">
              ({5} reviews)
            </span>
          </div> } */}
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
                   {recipe.ingredients.map((ingredient, index) => (
                  <li key={ingredient._key}>
                    {ingredient.amount} {ingredient.item}
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
                    {recipe.instructions.map((step, index) => (
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
              <p className="text-lg font-medium">{recipe.nutrition.calories}</p>
              <p className="text-sm text-muted-foreground capitalize">
                Calories
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-lg font-medium">{recipe.nutrition.fat}</p>
              <p className="text-sm text-muted-foreground capitalize">Fat</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-lg font-medium">{recipe.nutrition.carbs}</p>
              <p className="text-sm text-muted-foreground capitalize">Carbs</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-lg font-medium">{recipe.nutrition.protein}</p>
              <p className="text-sm text-muted-foreground capitalize">
                Protein
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-lg font-medium">{recipe.nutrition.fiber}</p>
              <p className="text-sm text-muted-foreground capitalize">Fiber</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Author Information */}
      <div className="mt-12 flex items-center space-x-4">
        <div className="relative w-16 h-16 rounded-full overflow-hidden">
          <Image
            src="/placeholder.svg"
            alt={recipe.author.name}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <p>Recipe by</p>
          <p className="text-lg font-semibold">{recipe.author.name}</p>
        </div>
      </div>
    </div>
  );
}

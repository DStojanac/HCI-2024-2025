import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, Users, ChefHat, Heart, Star } from 'lucide-react'

type recipePost = {
    id: number;
    name: string;
    ingredients: string[];
    instructions: string[];
    prepTimeMinutes: number;
    cookTimeMinutes: number;
    servings: number;
    difficulty: "Easy" | "Medium" | "Hard";
    cuisine: string;
    caloriesPerServing: number;
    tags: string[];
    userId: number;
    image: string;
    rating: number;
    reviewCount: number;
    mealType: string[];
  };

async function getRecipePost(id: string): Promise<recipePost> {
  const response = await fetch(`${process.env.BASE_API_URL}/recipes/${id}`);
  const data = response.json();
  return data;
}



export default async function RecipePage({ params }: { params: { id: string } }) {
    const recipe = await getRecipePost(params.id);
 
  return (
    <div className="bg-main-background container mx-auto px-20 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Left Column: Image and Quick Info */}
        <div className="space-y-6">
          <div className="relative aspect-video rounded-lg overflow-hidden">
            <Image
              src={recipe.image}
              alt={recipe.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex justify-between items-center text-main-paragraph-text">
            <h1 className="text-3xl font-bold">{recipe.name}</h1>
            <div className="flex space-x-4 ">
              <Button variant="outline" size="icon">
                <Heart className="h-6 w-6 " />
              </Button>
              
            </div>
          </div>
          <div className="flex flex-wrap gap-4 text-main-paragraph-text">
            <Badge variant="secondary" className="flex items-center gap-1 bg-second-background rounded-full">
              <Clock className="h-4 w-4" />
              {recipe.prepTimeMinutes + recipe.cookTimeMinutes} mins
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-1 bg-second-background rounded-full">
              <Users className="h-4 w-4" />
              {recipe.servings} servings
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-1 bg-second-background rounded-full">
              <ChefHat className="h-4 w-4" />
              {recipe.difficulty}
            </Badge>
          </div>
          <div className="flex items-center space-x-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${
                  i < Math.floor(recipe.rating)
                    ? "text-second-background fill-current"
                    : "text-main-paragraph-text "
                }`}
              />
            ))}
            <span className="font-medium text-second-paragraph-text">{recipe.rating}</span>
            <span className="text-muted-foreground text-second-paragraph-text" >({recipe.reviewCount} reviews)</span>
          </div>
        </div>

        {/* Right Column: Ingredients and Instructions */}
        <div>
          <Tabs defaultValue="ingredients" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-second-background rounded-lg">
              <TabsTrigger value="ingredients" className="text-main-paragraph-text data-[state=active]:bg-main-background">Ingredients</TabsTrigger>
              <TabsTrigger value="instructions" className="text-main-paragraph-text data-[state=active]:bg-main-background">Instructions</TabsTrigger>
            </TabsList>
            <TabsContent value="ingredients">
              <Card className="border-second-paragraph-text">
                <CardContent className="pt-6 ">
                  <ul className="list-disc list-inside space-y-2 text-main-paragraph-text">
                    {recipe.ingredients.map((ingredient, index) => (
                      <li key={index}>{ingredient}</li>
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


      {/* Author Information */}
      <div className="mt-12 flex items-center space-x-4">
        <div className="relative w-16 h-16 rounded-full overflow-hidden">
          <Image
            src="/placeholder.svg"
            alt={recipe.userId.toString()}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <p>Recipe by</p>
          <p className="text-lg font-semibold">{recipe.userId}</p>
        </div>
      </div>
    </div>
  )
}

import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Heart, Search, Clock, ChefHat, Star } from "lucide-react";
import Link from "next/link";

export type recipePost = {
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

async function getBlogPosts(): Promise<recipePost[]> {
  const response = await fetch(`${process.env.BASE_API_URL}/recipes`);
  const data = await response.json();
  return data.recipes;
}

export default async function RecipesPage() {
  const recipes: recipePost[] = await getBlogPosts();
  return (
    <div className="container mx-auto px-4 py-10 bg-main-background">
      {/* Search and Filters Section */}
      <div className="text-main-paragraph-text space-y-6 mb-8">
        <h1 className="text-4xl font-bold text-center mb-8">
          Discover Recipes
        </h1>
        {/* Search Bar */}
        <div className="relative max-w-2xl mx-auto bg-main-background ">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search recipes..."
            className="pl-10 h-12 rounded-full focus:ring-second-btn shadow-lg"
          />
        </div>

        {/* Filters */}
        <div className="text-main-paragraph-text border shadow-md flex flex-col md:flex-row gap-4 items-center justify-between bg-muted/50 p-4 rounded-2xl">
          <div className="flex flex-wrap gap-4 items-center bg-main-background">
            <Select>
              <SelectTrigger className="w-[160px] border border-second-btn focus:ring-0 focus:border-second-btn">
                <SelectValue placeholder="Cuisine Type" />
              </SelectTrigger>
              <SelectContent className="bg-main-background">
                <SelectItem
                  value="all"
                  className="hover:bg-second-background cursor-pointer"
                >
                  All
                </SelectItem>
                <SelectItem
                  value="italian"
                  className="hover:bg-second-background cursor-pointer"
                >
                  Italian
                </SelectItem>
                <SelectItem
                  value="mexican"
                  className="hover:bg-second-background cursor-pointer"
                >
                  Mexican
                </SelectItem>
                <SelectItem
                  value="indian"
                  className="hover:bg-second-background cursor-pointer"
                >
                  Indian
                </SelectItem>
                <SelectItem
                  value="chinese"
                  className="hover:bg-second-background cursor-pointer"
                >
                  Chinese
                </SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="w-[160px] border border-second-btn focus:ring-0 focus:border-second-btn">
                <SelectValue placeholder="Cooking Time" />
              </SelectTrigger>
              <SelectContent className="bg-main-background">
                <SelectItem
                  value="all"
                  className="hover:bg-second-background cursor-pointer"
                >
                  All
                </SelectItem>
                <SelectItem
                  value="15"
                  className="hover:bg-second-background cursor-pointer"
                >
                  Under 15 mins
                </SelectItem>
                <SelectItem
                  value="30"
                  className="hover:bg-second-background cursor-pointer"
                >
                  Under 30 mins
                </SelectItem>
                <SelectItem
                  value="60"
                  className="hover:bg-second-background cursor-pointer"
                >
                  Under 1 hour
                </SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="w-[160px] border border-second-btn focus:ring-0 focus:border-second-btn">
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent className="bg-main-background">
                <SelectItem
                  value="all"
                  className="hover:bg-second-background cursor-pointer"
                >
                  All
                </SelectItem>
                <SelectItem
                  value="easy"
                  className="hover:bg-second-background cursor-pointer"
                >
                  Easy
                </SelectItem>
                <SelectItem
                  value="medium"
                  className="hover:bg-second-background cursor-pointer"
                >
                  Medium
                </SelectItem>
                <SelectItem
                  value="hard"
                  className="hover:bg-second-background cursor-pointer"
                >
                  Hard
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            variant="outline"
            className=" border border-second-btn focus:ring-0 focus:border-second-btn hover:bg-second-background"
          >
            Clear Filters
          </Button>
        </div>

        {/* Categories */}
        <ScrollArea className="text-main-paragraph-text w-full whitespace-nowrap rounded-lg flex">
          <div className="flex space-x-4 justify-center">
            {categories.map((category) => (
              <Button
                key={category.name}
                variant="ghost"
                className="flex flex-col items-center gap-2 h-auto p-4"
              >
                <div className="relative w-16 h-16 rounded-full overflow-hidden">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="bg-black object-cover"
                  />
                </div>
                <span className="text-sm font-medium">{category.name}</span>
              </Button>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>

      {/* Recipe Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {recipes.map((recipe, index) => (
          <Card key={index} className="overflow-hidden">
            <div className="relative aspect-[4/3]">
              <Image
                src={recipe.image}
                alt={recipe.name}
                fill
                className="object-cover"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 bg-main-background  rounded-full  hover:bg-second-background"
              >
                <Heart className="h-7 w-7" />
              </Button>
            </div>
            <CardHeader className="space-y-1">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-lg line-clamp-1">
                  {recipe.name}
                </h3>
                <Badge
                  variant="secondary"
                  className="bg-second-background rounded-full ml-2"
                >
                  {recipe.mealType[0]}
                </Badge>
              </div>
              <div className="text-second-paragraph-text flex items-center gap-2 text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span className="text-sm">
                  {recipe.prepTimeMinutes + recipe.cookTimeMinutes} mins
                </span>
                <ChefHat className="h-4 w-4 ml-2" />
                <span className="text-sm">{recipe.difficulty}</span>
              </div>
            </CardHeader>
            <CardFooter className="flex justify-between items-center">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(recipe.rating)
                        ? "text-second-background fill-current"
                        : "text-second-background"
                    }`}
                  />
                ))}
                <span className="text-second-paragraph-text text-muted-foreground ml-2">
                  ({recipe.reviewCount})
                </span>
              </div>
              <Link
                href={"/recipes/" + recipe.id.toString()}
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
        ))}
      </div>
    </div>
  );
}

const categories = [
  { name: "Breakfast", image: "/placeholder.svg" },
  { name: "Main Course", image: "/placeholder.svg" },
  { name: "Desserts", image: "/placeholder.svg" },
  { name: "Vegetarian", image: "/placeholder.svg" },
  { name: "Soups", image: "/placeholder.svg" },
  { name: "Salads", image: "/placeholder.svg" },
  { name: "Snacks", image: "/placeholder.svg" },
  { name: "Beverages", image: "/placeholder.svg" },
];

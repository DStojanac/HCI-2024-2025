"use client";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Search } from "lucide-react";
import { useQueryState } from "nuqs";
import { RECIPE_QUERYResult } from "../../sanity.types";
import Recipe from "./recipe";

export function RecipesClient({
  initialRecipes,
}: {
  initialRecipes: RECIPE_QUERYResult;
}) {
  const [searchTerm, setSearchTerm] = useQueryState("search", {
    defaultValue: "",
  });
  const [cuisineType, setCuisineType] = useQueryState("cuisine", {
    defaultValue: "all",
  });
  const [cookingTime, setCookingTime] = useQueryState("time", {
    defaultValue: "all",
  });
  const [difficulty, setDifficulty] = useQueryState("difficulty", {
    defaultValue: "all",
  });
  const [category, setCategory] = useQueryState("category", {
    defaultValue: "all",
  });

  const filteredRecipes = initialRecipes.filter((recipe) => {
    const matchesSearch = recipe.title
      ? recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
      : false;
    const matchesCuisine =
      cuisineType === "all" ||
      recipe.cuisineType?.toLowerCase() === cuisineType.toLowerCase();
    const matchesCookingTime =
      cookingTime === "all" ||
      (cookingTime === "15" &&
        recipe.cookingTime !== null &&
        recipe.cookingTime <= 15) ||
      (cookingTime === "30" &&
        recipe.cookingTime !== null &&
        recipe.cookingTime <= 30) ||
      (cookingTime === "60" &&
        recipe.cookingTime !== null &&
        recipe.cookingTime <= 60);
    const matchesDifficulty =
      difficulty === "all" ||
      recipe.difficulty?.toLowerCase() === difficulty.toLowerCase();

    const matchesCategory =
      category === "all" ||
      recipe.mealType?.toLowerCase() === category.toLowerCase();

    return (
      matchesSearch &&
      matchesCuisine &&
      matchesCookingTime &&
      matchesDifficulty &&
      matchesCategory
    );
  });

  const clearFilters = () => {
    setSearchTerm("");
    setCuisineType("all");
    setCookingTime("all");
    setDifficulty("all");
  };
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
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} />
        </div>

        {/* Filters */}
        <div className="text-main-paragraph-text border shadow-md flex flex-col md:flex-row gap-4 items-center justify-between bg-muted/50 p-4 rounded-2xl">
          <div className="flex flex-wrap gap-4 items-center bg-main-background">
            <Select value={cuisineType} onValueChange={setCuisineType}>
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
                  value="Italian"
                  className="hover:bg-second-background cursor-pointer"
                >
                  Italian
                </SelectItem>
                <SelectItem
                  value="Mexican"
                  className="hover:bg-second-background cursor-pointer"
                >
                  Mexican
                </SelectItem>
                <SelectItem
                  value="Indian"
                  className="hover:bg-second-background cursor-pointer"
                >
                  Indian
                </SelectItem>
                <SelectItem
                  value="Chinese"
                  className="hover:bg-second-background cursor-pointer"
                >
                  Chinese
                </SelectItem>
                <SelectItem
                  value="Croatian"
                  className="hover:bg-second-background cursor-pointer"
                >
                  Croatian
                </SelectItem>
                <SelectItem
                  value="American"
                  className="hover:bg-second-background cursor-pointer"
                >
                  American
                </SelectItem>
              </SelectContent>
            </Select>

            <Select value={cookingTime} onValueChange={setCookingTime}>
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

            <Select value={difficulty} onValueChange={setDifficulty}>
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
                  value="Easy"
                  className="hover:bg-second-background cursor-pointer"
                >
                  Easy
                </SelectItem>
                <SelectItem
                  value="Medium"
                  className="hover:bg-second-background cursor-pointer"
                >
                  Medium
                </SelectItem>
                <SelectItem
                  value="Hard"
                  className="hover:bg-second-background cursor-pointer"
                >
                  Hard
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            variant="outline"
            className="border border-second-btn focus:ring-0 focus:border-second-btn hover:bg-second-background"
            onClick={clearFilters}
          >
            Clear Filters
          </Button>
        </div>

        {/* Categories */}
        <ScrollArea className="text-main-paragraph-text w-full whitespace-nowrap rounded-lg flex ">
          <div className="flex space-x-4 justify-center p-4">
            {categories.map((cat) => (
              <Button
                key={cat.name}
                variant="ghost"
                className={`flex flex-col items-center gap-2 h-auto p-4 ${category === cat.name.toLowerCase()
                    ? "bg-second-background"
                    : "hover:bg-second-background"}`}
                onClick={() => setCategory((prevCategory) => prevCategory === cat.name.toLowerCase()
                  ? "all"
                  : cat.name.toLowerCase()
                )}
              >
                <div className="relative w-16 h-16 rounded-full overflow-hidden">
                  <Image
                    src={cat.image || "/placeholder.svg"}
                    alt={cat.name}
                    fill
                    className="object-cover" />
                </div>
                <span className="text-sm font-medium">{cat.name}</span>
              </Button>
            ))}
          </div>
          <ScrollBar
            orientation="horizontal"
            className="hover:cursor-pointer" />
        </ScrollArea>
      </div>

      {/* Recipe Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredRecipes.map((recipe, index) => (
          <Recipe key={index} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}

const categories = [
  { name: "Breakfast", image: "/images/meal-type/breakfast.jpg" },
  { name: "Lunch", image: "/images/meal-type/lunch.jpg" },
  { name: "Dinner", image: "/images/meal-type/dinner.jpg" },
  { name: "Vegetarian", image: "/images/meal-type/vegetarian.png" },
  { name: "Soup", image: "/images/meal-type/soup.jpg" },
  { name: "Salad", image: "/images/meal-type/salad.png" },
  { name: "Snack", image: "/images/meal-type/snack.png" },
  { name: "Beverage", image: "/images/meal-type/beverage.png" },
  { name: "Appetizer", image: "/images/meal-type/appetizer.png" },
  { name: "Dessert", image: "/images/meal-type/dessert.png" },
];

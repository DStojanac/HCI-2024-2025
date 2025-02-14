import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import {
  Clock,
  Heart,
  Settings,
  UtensilsCrossed,
  User,
  Mail,
  ChefHat,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { auth } from "@/auth";
import { db } from "@/db";
import { favorites } from "@/db/schema";
import { eq } from "drizzle-orm";
import { RECIPE_ID_QUERY, USER_RECIPES_QUERY } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { UserRound } from "lucide-react";

export default async function AccountPage() {
  const session = await auth();

  if (!session) {
    return;
  }

  const favoriteRecipesIds = await db
    .select({ id: favorites.recipeId })
    .from(favorites)
    .where(eq(favorites.userId, session?.user.id));
  const favoriteRecipes = await Promise.all(
    favoriteRecipesIds.map(async (favorite) => {
      const recipe = await client.fetch(RECIPE_ID_QUERY, { id: favorite.id });
      return recipe;
    })
  );

  const user_recipes = await client.fetch(USER_RECIPES_QUERY, {
    userId: session.user.id,
  });

  return (
    <div className="container mx-auto px-4 py-6 sm:py-10 bg-main-background mb-20">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Profile Summary - Fixed width */}
        <Card className="w-full lg:w-80 h-fit mb-6 lg:mb-0">
          <CardHeader className="text-center items-center">
            <div className="  flex w-28 h-28">
              <UserRound className="h-28 w-28 stroke-current justify-center items-center text-main-paragraph-text" />
            </div>
            <CardTitle className="text-2xl">{session.user.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-around text-center">
              <div>
                <p className="text-2xl font-bold">{user_recipes.length}</p>
                <p className="text-sm text-muted-foreground">Recipes</p>
              </div>
              <div>
                <p className="text-2xl font-bold">{favoriteRecipes.length}</p>
                <p className="text-sm text-muted-foreground">Favorites</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content - Flexible width */}
        <div className="flex-1">
          <Tabs defaultValue="recipes" className="w-full">
            <TabsList className="w-full justify-start  flex flex-wrap gap-2 sm:mb-6 mb-12">
              <TabsTrigger
                value="recipes"
                className="flex text-base sm:text-lg items-center gap-2 data-[state=active]:bg-second-background flex-1 sm:flex-initial"
              >
                <UtensilsCrossed className="h-4 w-4" />
                My Recipes
              </TabsTrigger>
              <TabsTrigger
                value="favorites"
                className="flex text-base sm:text-lg items-center gap-2 data-[state=active]:bg-second-background flex-1 sm:flex-initial"
              >
                <Heart className="h-4 w-4" />
                Favorites
              </TabsTrigger>
              <TabsTrigger
                value="account"
                className="flex text-base sm:text-lg items-center gap-2 data-[state=active]:bg-second-background flex-1 sm:flex-initial"
              >
                <Settings className="h-4 w-4" />
                Account
              </TabsTrigger>
            </TabsList>

            {/* My Recipes Tab */}
            <TabsContent value="recipes">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {user_recipes.map((recipe) => (
                  <Card key={recipe._id}>
                    <div className="relative aspect-video">
                      <Image
                        src={
                          recipe?.mainImage
                            ? urlFor(recipe.mainImage).url()
                            : "/placeholder.svg"
                        }
                        alt="Recipe thumbnail"
                        fill
                        className="object-cover rounded-t-lg"
                      />
                    </div>
                    <CardHeader>
                      <div className="flex justify-between items-center mb-2">
                        <CardTitle className="text-lg">
                          {recipe?.title}
                        </CardTitle>
                        <Badge className="bg-second-background rounded-full ml-2">
                          {recipe.mealType}
                        </Badge>
                      </div>
                      <CardDescription className="flex items-center gap-2 text-second-paragraph-text">
                        <Clock className="h-4 w-4" />
                        {recipe?.cookingTime + " mins"}
                        <ChefHat className="h-4 w-4 ml-2" />
                        {recipe?.difficulty}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Favorites Tab */}
            <TabsContent value="favorites">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {favoriteRecipes.map((favorite, index) => (
                  <Card key={index}>
                    <div className="relative aspect-video">
                      <Image
                        src={
                          favorite?.mainImage
                            ? urlFor(favorite.mainImage).url()
                            : "/placeholder.svg"
                        }
                        alt="Recipe thumbnail"
                        fill
                        className="object-cover rounded-t-lg"
                      />
                    </div>
                    <CardHeader>
                      <div className="flex justify-between items-center mb-2">
                        <CardTitle className="text-lg">
                          {favorite?.title}
                        </CardTitle>
                        <Badge className="bg-second-background rounded-full ml-2">
                          {favorite?.mealType}
                        </Badge>
                      </div>
                      <CardDescription className="flex items-center gap-2 text-second-paragraph-text">
                        <Clock className="h-4 w-4" />
                        {favorite?.cookingTime + " mins"}
                        <ChefHat className="h-4 w-4 ml-2" />
                        {favorite?.difficulty}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Account Details Tab */}
            <TabsContent value="account">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Account Details</CardTitle>
                  <CardDescription>Your account information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <User className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-base lg:text-lg font-medium">
                        Username
                      </p>
                      <p className="text-sm lg:text-base text-muted-foreground">
                        {session.user.name}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-base lg:text-lg font-medium">Email</p>
                      <p className="text-sm lg:text-base text-muted-foreground">
                        {session.user.email}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

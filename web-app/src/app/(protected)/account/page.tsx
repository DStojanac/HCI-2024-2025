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
import { auth } from "@/auth";
import { db } from "@/db";
import { favorites } from "@/db/schema";
import { eq } from "drizzle-orm";
import { RECIPE_ID_QUERY } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

export default async function AccountPage() {
  const session=await auth()

  if(!session){
    return
  }

  const favoriteRecipesIds = await db.select({id:favorites.recipeId}).from(favorites).where(eq(favorites.userId, session?.user.id))  
  const favoriteRecipes = await Promise.all(
    favoriteRecipesIds.map(async (favorite) => {
      const recipe = await client.fetch(RECIPE_ID_QUERY, { id: favorite.id });
      return recipe;
    })
  );
  
  return (
    <div className="container mx-auto px-4 py-6 sm:py-10 bg-main-background mb-20">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Profile Summary - Fixed width */}
        <Card className="w-full lg:w-80 h-fit mb-6 lg:mb-0">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 relative w-32 h-32">
              <Image
                src="/images/benefits.png"
                alt="Profile picture"
                className="rounded-full object-cover"
                fill
              />
            </div>
            <CardTitle className="text-2xl">{session.user.name}</CardTitle>
            {/* <CardDescription>Member since 2023</CardDescription> */}
          </CardHeader>
          <CardContent>
            <div className="flex justify-around text-center">
              <div>
                <p className="text-2xl font-bold">12</p>
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
                {[1, 2, 3].map((recipe) => (
                  <Card key={recipe}>
                    <div className="relative aspect-video">
                      <Image
                        src="/placeholder.svg"
                        alt="Recipe thumbnail"
                        fill
                        className="object-cover rounded-t-lg"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle className="text-lg">Homemade Pasta</CardTitle>
                      <CardDescription className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        30 mins
                      </CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Favorites Tab */}
            <TabsContent value="favorites">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {favoriteRecipes.map((favorite,index) => (
                  <Card key={index}>
                    <div className="relative aspect-video">
                      <Image
                        src={favorite?.mainImage ? urlFor(favorite.mainImage).url() : "/placeholder.svg"} 
                        alt="Recipe thumbnail"
                        fill
                        className="object-cover rounded-t-lg"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle className="text-lg">{favorite?.title}</CardTitle>
                      <CardDescription className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        {favorite?.cookingTime+" mins"}
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
                  {/* <Button variant="outline">Change Password</Button> */}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
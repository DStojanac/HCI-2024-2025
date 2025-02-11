"use client"
import { urlFor } from "@/sanity/lib/image"
import { Card, CardFooter, CardHeader } from "./ui/card"
import Image from "next/image"
import { Button } from "./ui/button"
import { ChefHat, Clock, Heart } from "lucide-react"
import { Badge } from "./ui/badge"
import Link from "next/link"
import { useCallback, useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import toast, { Toaster } from 'react-hot-toast';

type RECIPE = {
  mainImage: string | null
  title: string | null
  mealType: string | null
  cookingTime: number | null
  difficulty: string | null
  _id: string
}

export default function Recipe({ recipe }: { recipe: RECIPE }) {
  const [isFavorite, setIsFavorite] = useState(false)
  const { data: session } = useSession()

  const showToast = useCallback((message: string) => {
    toast.error(message, {
      style: {
        background: "#dbcdb5",
        maxWidth: "none",
        whiteSpace: "nowrap",
      },
      duration: 2000,
    })
  }, [])

  const checkFavoriteStatus = useCallback(async () => {
    try {
      const response = await fetch(`/api/favorites?recipeId=${recipe._id}`)
      if (response.ok) {
        const data = await response.json()
        setIsFavorite(data.isFavorite)
      } else {
        showToast(response.statusText)
      }
    } catch (error) {
      showToast(`Error checking favorite status: ${error}`)
    }
  }, [recipe._id, showToast])

  useEffect(() => {
    if (session?.user?.id) {
      checkFavoriteStatus()
    }
  }, [session, checkFavoriteStatus])

  const toggleFavorite = async () => {
    if (!session?.user?.id) {
      showToast("You must be logged in to favorite recipes")
      return
    }

    try {
      const response = await fetch(`/api/favorites?recipeId=${recipe._id}`, {
        method: "POST",
      })

      if (response.ok) {
        const data = await response.json()
        setIsFavorite(data.isFavorite)
      }
      else{
        showToast(response.statusText)
      }
    } catch (error) {
      showToast(`Error toggling favorite: ${error}`)
    }
  }    

  if (!recipe) {
    return null
  }

  return (
    <><Toaster
      position="top-center"
      reverseOrder={false} />
    <Card className="overflow-hidden">
        <div className="relative aspect-[4/3]">
          <Image
            src={recipe.mainImage ? urlFor(recipe.mainImage).url() : "/placeholder.svg"}
            alt={recipe.title || "Recipe Image"}
            fill
            className="object-cover" />
          <Button
            variant="ghost"
            onClick={toggleFavorite}
            size="icon"
            className="absolute top-2 right-2 bg-main-background rounded-full hover:bg-second-background"
          >
            <Heart className={`h-7 w-7 ${isFavorite ? "fill-current text-second-paragraph-text" : ""}`} />
          </Button>
        </div>
        <CardHeader className="space-y-1">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-lg line-clamp-1">{recipe.title}</h3>
            <Badge variant="secondary" className="bg-second-background rounded-full ml-2">
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
          <Link href={"/recipes/" + recipe._id} className="font-medium text-second-paragraph-text">
            <Button
              variant="ghost"
              size="sm"
              className="hover:bg-second-background font-medium text-second-paragraph-text"
            >
              View Recipe
            </Button>
          </Link>
        </CardFooter>
      </Card></>
  )
}


"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { toggleFavorite as toggleFavoriteAction } from "@/actions/favorites";
import { useSession } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";
import { useFavorites } from "@/contexts/favoritesContext";
import clsx from "clsx";

interface FavoriteButtonProps {
  recipeId: string;
  className?: string;
}

export function FavoriteButton({
  recipeId,
  className = "",
}: FavoriteButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();
  const { toast } = useToast();
  const { isFavorite, refreshFavorites } = useFavorites();

  const handleToggleFavorite = async () => {
    if (!session?.user?.id) {
      toast({
        title: "Error",
        description: "You must be logged in to favorite recipes",
      });
      return;
    }

    setIsLoading(true);
    try {
      await toggleFavoriteAction(recipeId);

      await refreshFavorites();
    } catch (error) {
      console.error("Error toggling favorite:", error);
      toast({
        title: "Error",
        description: "Failed to toggle favorite",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      onClick={handleToggleFavorite}
      size="icon"
      className={clsx(
        "bg-main-background rounded-full hover:bg-second-background",
        className
      )}
      disabled={isLoading}
    >
      <Heart
        className={`h-7 w-7 ${isFavorite(recipeId) ? "fill-current text-second-paragraph-text" : ""}`}
      />
    </Button>
  );
}

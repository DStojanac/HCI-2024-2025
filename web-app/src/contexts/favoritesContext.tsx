"use client";

import type React from "react";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { getFavoritedRecipes } from "@/actions/favorites";
import { useSession } from "next-auth/react";

type FavoritesContextType = {
  favoritedRecipes: string[];
  toggleFavorite: (recipeId: string) => void;
  isFavorite: (recipeId: string) => boolean;
  refreshFavorites: () => void;
  isLoading: boolean;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favoritedRecipes, setFavoritedRecipes] = useState<string[]>([]);
  const { status } = useSession();
  const [isLoading, setIsLoading] = useState(true);

  const refreshFavorites = useCallback(async () => {
    if (status !== "authenticated") {
      setFavoritedRecipes([]);
      return;
    }

    setIsLoading(true);

    try {
      const favorites = await getFavoritedRecipes();
      setFavoritedRecipes(favorites);
    } catch (error) {
      console.error("Error refreshing favorites:", error);
    } finally {
      setIsLoading(false);
    }
  }, [status]);

  useEffect(() => {
    if (status === "authenticated") {
      refreshFavorites();
    } else if (status === "unauthenticated") {
      setFavoritedRecipes([]);
      setIsLoading(false);
    }
  }, [status, refreshFavorites]);

  const toggleFavorite = useCallback((recipeId: string) => {
    setFavoritedRecipes((prev) =>
      prev.includes(recipeId)
        ? prev.filter((id) => id !== recipeId)
        : [...prev, recipeId]
    );
  }, []);

  const isFavorite = useCallback(
    (recipeId: string) => {
      return favoritedRecipes.includes(recipeId);
    },
    [favoritedRecipes]
  );

  return (
    <FavoritesContext.Provider
      value={{
        favoritedRecipes,
        toggleFavorite,
        isFavorite,
        refreshFavorites,
        isLoading,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
}

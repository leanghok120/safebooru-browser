"use client";

import { useEffect, useState } from "react";
import { ImageCard } from "./ImageCard";

interface FavoriteImage {
  imageUrl: string;
  tags: string;
}

export function FavoritesGrid() {
  const [favorites, setFavorites] = useState<FavoriteImage[]>([]);

  useEffect(() => {
    // Load favorites from localStorage
    const storedFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );
    setFavorites(storedFavorites);
  }, []);

  const removeFavorite = (imageUrl: string) => {
    const newFavorites = favorites.filter((fav) => fav.imageUrl !== imageUrl);
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
    setFavorites(newFavorites);
  };

  if (favorites.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No favorited images yet</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {favorites.map((favorite, index) => (
        <ImageCard
          key={`${favorite.imageUrl}-${index}`}
          imageUrl={favorite.imageUrl}
          tags={favorite.tags}
          onRemove={() => removeFavorite(favorite.imageUrl)}
        />
      ))}
    </div>
  );
}

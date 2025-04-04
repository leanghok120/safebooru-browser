"use client";

import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FavoriteButtonProps {
  imageUrl: string;
  tags: string;
  onRemove?: () => void;
}

export function FavoriteButton({
  imageUrl,
  tags,
  onRemove,
}: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // Load favorites from localStorage on mount
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setIsFavorite(favorites.some((fav: any) => fav.imageUrl === imageUrl));
  }, [imageUrl]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    const newFavorites = isFavorite
      ? favorites.filter((fav: any) => fav.imageUrl !== imageUrl)
      : [...favorites, { imageUrl, tags }];

    localStorage.setItem("favorites", JSON.stringify(newFavorites));
    setIsFavorite(!isFavorite);

    if (isFavorite && onRemove) {
      onRemove();
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleFavorite}
      className={cn(
        "absolute top-2 right-2 h-8 w-8 p-0",
        "bg-background/50 hover:bg-background/70",
        "transition-all duration-300 hover:scale-110"
      )}
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      <Heart
        className={cn(
          "h-4 w-4 transition-all duration-300",
          isFavorite
            ? "fill-primary text-primary"
            : "text-foreground group-hover:text-primary"
        )}
      />
    </Button>
  );
}

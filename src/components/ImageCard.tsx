"use client";

import Image from "next/image";
import { FavoriteButton } from "./FavoriteButton";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ImageCardProps {
  imageUrl: string;
  tags: string;
  onRemove?: () => void;
}

export function ImageCard({ imageUrl, tags, onRemove }: ImageCardProps) {
  return (
    <Card
      className={cn(
        "relative aspect-square overflow-hidden group",
        "transition-all duration-300 hover:shadow-lg"
      )}
    >
      <Image
        src={imageUrl}
        alt={tags}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-105"
        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <FavoriteButton imageUrl={imageUrl} tags={tags} onRemove={onRemove} />
    </Card>
  );
}

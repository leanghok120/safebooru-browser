"use client";

import { useEffect, useRef, useState } from "react";
import { searchImages } from "@/services/safebooru";
import { ImageCard } from "./ImageCard";

interface ImageGridProps {
  initialQuery: string;
  initialImages: Array<{ file_url: string; tags: string }>;
}

export function ImageGrid({ initialQuery, initialImages }: ImageGridProps) {
  const [images, setImages] = useState(initialImages);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerTarget = useRef<HTMLDivElement>(null);
  const currentQuery = useRef(initialQuery);

  // Reset state when query changes
  useEffect(() => {
    if (currentQuery.current !== initialQuery) {
      setImages(initialImages);
      setPage(1);
      setHasMore(true);
      currentQuery.current = initialQuery;
    }
  }, [initialQuery, initialImages]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      async (entries) => {
        if (entries[0].isIntersecting && !isLoading && hasMore) {
          setIsLoading(true);
          try {
            const nextPage = page + 1;
            const newImages = await searchImages(initialQuery, nextPage);

            if (newImages.length === 0) {
              setHasMore(false);
            } else {
              setImages((prev) => [...prev, ...newImages]);
              setPage(nextPage);
            }
          } catch (error) {
            console.error("Error loading more images:", error);
          } finally {
            setIsLoading(false);
          }
        }
      },
      { threshold: 1.0 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [page, isLoading, hasMore, initialQuery]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {images.map((image, index) => (
        <ImageCard
          key={`${image.file_url}-${index}`}
          imageUrl={image.file_url}
          tags={image.tags}
        />
      ))}
      {hasMore && (
        <div ref={observerTarget} className="col-span-full text-center py-8">
          {isLoading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 rounded-full bg-primary animate-bounce" />
              <div className="w-4 h-4 rounded-full bg-primary animate-bounce [animation-delay:0.2s]" />
              <div className="w-4 h-4 rounded-full bg-primary animate-bounce [animation-delay:0.4s]" />
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}

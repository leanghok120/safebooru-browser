import { Suspense } from "react";
import { searchImages } from "@/services/safebooru";
import { ImageGrid } from "@/components/ImageGrid";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Search } from "lucide-react";

interface SearchParams {
  query?: string;
}

export default async function Home({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const query = searchParams.query || "";
  const initialImages = await searchImages(query || "rating:safe");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Home</h1>
      </div>

      <Card className="p-6">
        <form className="flex gap-4">
          <Input
            type="text"
            name="query"
            placeholder="Search tags..."
            defaultValue={query}
            className="flex-1"
          />
          <Button type="submit">Search</Button>
        </form>
      </Card>

      <Suspense fallback={<div className="text-center">Loading...</div>}>
        {initialImages.length > 0 ? (
          <ImageGrid
            initialQuery={query || "rating:safe"}
            initialImages={initialImages}
          />
        ) : (
          <Alert className="bg-muted">
            <Search className="h-4 w-4" />
            <AlertTitle>No images found</AlertTitle>
            <AlertDescription>
              {query ? (
                <>
                  No images found for the tag "{query}". Try a different search
                  term.
                </>
              ) : (
                "No images found. Please try again later."
              )}
            </AlertDescription>
          </Alert>
        )}
      </Suspense>
    </div>
  );
}

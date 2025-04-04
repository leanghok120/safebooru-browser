import { Metadata } from "next";
import { FavoritesGrid } from "@/components/FavoritesGrid";

export const metadata: Metadata = {
  title: "Favorites - SafeBooru Browser",
  description: "View your favorited images",
};

export default function FavoritesPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Favorites</h1>
      <FavoritesGrid />
    </main>
  );
}

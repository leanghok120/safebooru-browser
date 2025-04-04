import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { PT_Sans } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

const ptSans = PT_Sans({
  variable: "--font-pt-sans",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "SafeBooru Browser",
  description: "Browse SafeBooru images safely through a proxy",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          nunito.variable,
          ptSans.variable
        )}
      >
        <div className="texture" />
        <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="max-w-4xl mx-auto px-4 flex h-14 items-center justify-between">
            <Link
              href="/"
              className="flex items-center space-x-2 text-lg font-bold"
            >
              SafeBooru Browser
            </Link>
            <Button variant="ghost" asChild className="flex items-center gap-2">
              <Link href="/favorites">
                <Heart className="h-5 w-5 fill-primary" />
                Favorites
              </Link>
            </Button>
          </div>
        </nav>
        <main className="max-w-4xl mx-auto px-4 py-6">{children}</main>
      </body>
    </html>
  );
}

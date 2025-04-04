"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push("/");
    router.refresh();
  };

  return (
    <nav className="border-b">
      <div className="flex h-16 items-center px-4">
        <div className="flex items-center space-x-4">
          <Link
            href="/"
            onClick={handleHomeClick}
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === "/" ? "text-primary" : "text-muted-foreground"
            )}
          >
            SafeBooru Browser
          </Link>
          <Link
            href="/favorites"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === "/favorites"
                ? "text-primary"
                : "text-muted-foreground"
            )}
          >
            Favorites
          </Link>
        </div>
      </div>
    </nav>
  );
}

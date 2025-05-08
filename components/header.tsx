"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const router = useRouter();

  const handleNavClick = (path: string) => {
    setIsMenuOpen(false);
    router.push(path);
  };

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-primary">Project M</Link>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-foreground/80 hover:text-foreground">Home</Link>
            <Link href="/achievements" className="text-foreground/80 hover:text-foreground">Achievements</Link>
            <Link href="/politicianupload" className="text-foreground/80 hover:text-foreground">Politicians</Link>
            <Link href="/admin/login" className="text-foreground/80 hover:text-foreground">Admin</Link>
          </nav>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-lg hover:bg-muted"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <button
              className="md:hidden p-2 rounded-lg hover:bg-muted"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        <motion.div
          initial={false}
          animate={{ height: isMenuOpen ? "auto" : 0 }}
          className="md:hidden overflow-hidden"
        >
          <nav className="py-4 space-y-4">
            <button onClick={() => handleNavClick("/")} className="block w-full text-left text-foreground/80 hover:text-foreground">Home</button>
            <button onClick={() => handleNavClick("/achievements")} className="block w-full text-left text-foreground/80 hover:text-foreground">Achievements</button>
            <button onClick={() => handleNavClick("/politicianupload")} className="block w-full text-left text-foreground/80 hover:text-foreground">Politicians</button>
            <button onClick={() => handleNavClick("/admin/login")} className="block w-full text-left text-foreground/80 hover:text-foreground">Admin</button>
          </nav>
        </motion.div>
      </div>
    </header>
  );
}
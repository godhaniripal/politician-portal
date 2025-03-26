"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-xl font-bold text-primary">Project M</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-foreground/80 hover:text-foreground">Home</a>
            <a href="#" className="text-foreground/80 hover:text-foreground">Politicians</a>
            <a href="#" className="text-foreground/80 hover:text-foreground">Constituencies</a>
            <a href="#" className="text-foreground/80 hover:text-foreground">About</a>
          </nav>

          {/* Theme Toggle and Mobile Menu Button */}
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

        {/* Mobile Navigation */}
        <motion.div
          initial={false}
          animate={{ height: isMenuOpen ? "auto" : 0 }}
          className="md:hidden overflow-hidden"
        >
          <nav className="py-4 space-y-4">
            <a href="#" className="block text-foreground/80 hover:text-foreground">Home</a>
            <a href="#" className="block text-foreground/80 hover:text-foreground">Politicians</a>
            <a href="#" className="block text-foreground/80 hover:text-foreground">Constituencies</a>
            <a href="#" className="block text-foreground/80 hover:text-foreground">About</a>
          </nav>
        </motion.div>
      </div>
    </header>
  );
}
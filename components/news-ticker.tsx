"use client";

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const news = [
  "New transparency initiative launched in Maharashtra",
  "Digital voting system successfully tested in 5 states",
  "Parliament passes key electoral reforms bill",
  "Record voter turnout in recent state elections",
];

export function NewsTicker() {
  const [currentNews, setCurrentNews] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentNews((prev) => (prev + 1) % news.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-primary/10 py-4">
      <div className="container mx-auto px-4">
        <div className="flex items-center">
          <span className="bg-primary text-white px-4 py-1 rounded-full text-sm font-semibold mr-4">
            Latest Updates
          </span>
          <div className="overflow-hidden h-6 flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentNews}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="text-foreground"
              >
                {news[currentNews]}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
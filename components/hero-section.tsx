"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import { HandIcon as GandhiIcon } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center indian-border-pattern">
      <div className="absolute inset-0 bg-gradient-to-b from-orange-500/10 via-white/50 to-green-500/10" />
      <div className="container mx-auto px-4 z-10">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <GandhiIcon className="w-24 h-24 mx-auto mb-6 text-primary" />
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-orange-500 via-blue-600 to-green-500">
              Indian Political Transparency Portal
            </h1>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8"
          >
            Empowering citizens with transparency, accountability, and truth in Indian politics
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <button className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors">
              Explore Data
            </button>
            <button className="bg-secondary text-white px-8 py-3 rounded-lg hover:bg-secondary/90 transition-colors">
              View Achievements
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
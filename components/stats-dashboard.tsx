"use client";

import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  Users,
  Building2,
  FileCheck,
  TrendingUp,
} from "lucide-react";

const stats = [
  {
    title: "Active Politicians",
    value: "543",
    icon: Users,
    description: "Lok Sabha Members",
  },
  {
    title: "Constituencies",
    value: "543",
    icon: Building2,
    description: "Parliamentary Constituencies",
  },
  {
    title: "Verified Achievements",
    value: "12,458",
    icon: FileCheck,
    description: "Verified Records",
  },
  {
    title: "Public Engagement",
    value: "1.2M",
    icon: TrendingUp,
    description: "Citizen Interactions",
  },
];

export function StatsDashboard() {
  return (
    <section className="py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Real-Time Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className="flex justify-center mb-4">
                  <stat.icon className="w-12 h-12 text-primary" />
                </div>
                <h3 className="text-4xl font-bold mb-2">{stat.value}</h3>
                <p className="text-lg font-semibold mb-2">{stat.title}</p>
                <p className="text-sm text-muted-foreground">{stat.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
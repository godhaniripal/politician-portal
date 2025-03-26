"use client";

import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Award, Calendar, MapPin } from "lucide-react";

const achievements = [
  {
    title: "Digital Infrastructure Development",
    politician: "Rajesh Kumar",
    constituency: "Mumbai South",
    date: "2024-03-15",
    description: "Successfully implemented digital governance system reaching 100,000 citizens",
  },
  {
    title: "Green Energy Initiative",
    politician: "Priya Sharma",
    constituency: "Bangalore North",
    date: "2024-03-14",
    description: "Launched solar power project powering 50,000 households",
  },
  {
    title: "Education Reform",
    politician: "Amit Patel",
    constituency: "Delhi East",
    date: "2024-03-13",
    description: "Modernized 100 government schools with digital classrooms",
  },
];

export function LatestAchievements() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Latest Verified Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <Award className="w-6 h-6 text-primary mr-2" />
                  <h3 className="text-xl font-semibold">{achievement.title}</h3>
                </div>
                <p className="text-muted-foreground mb-4">{achievement.description}</p>
                <div className="flex items-center text-sm text-muted-foreground mb-2">
                  <Calendar className="w-4 h-4 mr-2" />
                  {achievement.date}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 mr-2" />
                  {achievement.constituency}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
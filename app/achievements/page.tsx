'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Award, Calendar, MapPin, User } from 'lucide-react';


interface Achievement {
  _id: string;
  title: string;
  description: string;
  location: string;
  completionDate: string;
  category: string;
  photoUrl: string;
  politicianName: string;
  constituency: string;
}

export default function AchievementsPage() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const response = await fetch('/api/achievements');
        if (!response.ok) throw new Error('Failed to fetch achievements');
        const data = await response.json();
        setAchievements(data);
      } catch (error) {
        console.error('Error fetching achievements:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchAchievements();
  }, []);

  // Get unique categories from achievements
  const categories = ['all', ...Array.from(new Set(achievements.map(a => a.category)))];
  
  // Filter achievements by selected category
  const filteredAchievements = selectedCategory === 'all'
    ? achievements
    : achievements.filter(a => a.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50">

      
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Verified Politician Achievements</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Browse through verified and approved achievements of politicians across different constituencies
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
          </div>
        ) : filteredAchievements.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAchievements.map((achievement) => (
              <div
                key={achievement._id}
                className="bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="h-56 relative">
                  <img
                    src={achievement.photoUrl}
                    alt={achievement.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-blue-700">
                    {achievement.category}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{achievement.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{achievement.description}</p>

                  <div className="flex items-center text-gray-500 mb-3">
                    <User className="w-4 h-4 mr-2" />
                    <span className="font-medium">{achievement.politicianName}</span>
                  </div>

                  <div className="flex items-center text-gray-500 mb-3">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{achievement.constituency}, {achievement.location}</span>
                  </div>

                  <div className="flex items-center text-gray-500">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>Completed on {new Date(achievement.completionDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <Award className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-2xl font-medium text-gray-900 mb-2">No achievements found</h3>
            <p className="text-gray-600">
              {selectedCategory === 'all'
                ? 'There are no approved achievements to display yet.'
                : `There are no approved achievements in the "${selectedCategory}" category.`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
import { HeroSection } from '@/components/hero-section';
import { StatsDashboard } from '@/components/stats-dashboard';
import { NewsTicker } from '@/components/news-ticker';
import { LatestAchievements } from '@/components/latest-achievements';

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <StatsDashboard />
      <NewsTicker />
      <LatestAchievements />
    </div>
  );
}
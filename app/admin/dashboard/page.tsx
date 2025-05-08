'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Award, CheckCircle, LogOut, XCircle } from 'lucide-react';

interface Work {
  _id: string;
  title: string;
  description: string;
  location: string;
  completionDate: string;
  inaugurationDate?: string;
  category: string;
  photoUrl: string;
  politicianName: string;
  constituency: string;
  isApproved: boolean;
  createdAt: string;
}

export default function AdminDashboard() {
  const [works, setWorks] = useState<Work[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('pending');
  const router = useRouter();
  
  useEffect(() => {
    fetchWorks();
  }, []);
  
  const fetchWorks = async () => {
    try {
      const response = await fetch('/api/admin/works');
      if (!response.ok) throw new Error('Failed to fetch works');
      const data = await response.json();
      setWorks(data);
    } catch (error) {
      console.error('Error fetching works:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/approve-work`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, adminUsername: 'admin' }),
      });

      if (!response.ok) throw new Error('Failed to approve work');
      
      // Update local state
      setWorks(works.map(work => 
        work._id === id ? { ...work, isApproved: true } : work
      ));
    } catch (error) {
      console.error('Error approving work:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuthenticated');
    router.push('/admin/login');
  };

  const pendingWorks = works.filter(work => !work.isApproved);
  const approvedWorks = works.filter(work => work.isApproved);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2">
            <LogOut size={16} />
            Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2 mx-auto mb-8">
            <TabsTrigger value="pending" className="flex items-center gap-2">
              <XCircle size={16} />
              Pending ({pendingWorks.length})
            </TabsTrigger>
            <TabsTrigger value="approved" className="flex items-center gap-2">
              <CheckCircle size={16} />
              Approved ({approvedWorks.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending">
            {loading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
              </div>
            ) : pendingWorks.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pendingWorks.map((work) => (
                  <Card key={work._id} className="overflow-hidden">
                    <img 
                      src={work.photoUrl} 
                      alt={work.title} 
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-5">
                      <div className="flex justify-between items-start">
                        <h3 className="text-lg font-medium mb-1">{work.title}</h3>
                        <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full">
                          {work.category}
                        </span>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{work.description}</p>
                      
                      <div className="text-sm text-gray-500 space-y-1 mb-4">
                        <p><span className="font-medium">Politician:</span> {work.politicianName}</p>
                        <p><span className="font-medium">Constituency:</span> {work.constituency}</p>
                        <p><span className="font-medium">Location:</span> {work.location}</p>
                        <p><span className="font-medium">Completed:</span> {new Date(work.completionDate).toLocaleDateString()}</p>
                      </div>
                      
                      <Button 
                        className="w-full flex items-center justify-center gap-2"
                        onClick={() => handleApprove(work._id)}
                      >
                        <Award size={16} />
                        Approve Achievement
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg shadow">
                <CheckCircle size={48} className="mx-auto text-green-500 mb-4" />
                <h3 className="text-xl font-medium text-gray-900 mb-2">All caught up!</h3>
                <p className="text-gray-600">No pending achievements to review.</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="approved">
            {loading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
              </div>
            ) : approvedWorks.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {approvedWorks.map((work) => (
                  <Card key={work._id} className="overflow-hidden">
                    <img 
                      src={work.photoUrl} 
                      alt={work.title} 
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-5">
                      <div className="flex justify-between items-start">
                        <h3 className="text-lg font-medium mb-1">{work.title}</h3>
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                          {work.category}
                        </span>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{work.description}</p>
                      
                      <div className="text-sm text-gray-500 space-y-1">
                        <p><span className="font-medium">Politician:</span> {work.politicianName}</p>
                        <p><span className="font-medium">Constituency:</span> {work.constituency}</p>
                        <p><span className="font-medium">Location:</span> {work.location}</p>
                        <p><span className="font-medium">Completed:</span> {new Date(work.completionDate).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg shadow">
                <XCircle size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-medium text-gray-900 mb-2">No approved achievements</h3>
                <p className="text-gray-600">Start by approving some pending achievements.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Users, BookOpen, TrendingUp, Award } from 'lucide-react';

interface DashboardStats {
  totalUsers: number;
  totalFormations: number;
  activeEnrollments: number;
  completedCourses: number;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalFormations: 0,
    activeEnrollments: 0,
    completedCourses: 0
  });
  const [loading, setLoading] = useState(true);
  const router = useRouter(); // Initialize useRouter

  useEffect(() => {
    fetchStats();
    
    // PRODUCTION: Check authentication and role
    const token = localStorage.getItem('academy_token');
    const userData = localStorage.getItem('academy_user');
    
    if (!token || !userData) {
      router.push('/fr/academy/login');
      return;
    }
    
    try {
      const user = JSON.parse(userData);
      
      // Only ADMIN users can access this page
      if (user.role !== 'ADMIN') {
        console.log('🔒 Non-ADMIN user detected - redirecting to dashboard');
        router.push('/fr/academy/dashboard');
        return;
      }
      
      console.log('✅ ADMIN user - allowing admin access');
    } catch {
      router.push('/fr/academy/login');
    }
  }, [router]);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('academy_token');
      console.log('Fetching stats from API...');
      
      const response = await fetch('/api/admin/stats', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      console.log('Stats API response status:', response.status);

      if (response.ok) {
        const data = await response.json();
        console.log('Stats data received:', data);
        setStats(data);
      } else {
        const error = await response.text();
        console.error('Stats API error:', response.status, error);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Utilisateurs totaux',
      value: stats.totalUsers,
      icon: Users,
      color: 'bg-blue-500',
      link: '/fr/academy/admin/users'
    },
    {
      title: 'Formations',
      value: stats.totalFormations,
      icon: BookOpen,
      color: 'bg-[#50b1aa]',
      link: '/fr/academy/admin/formations'
    },
    {
      title: 'Inscriptions actives',
      value: stats.activeEnrollments,
      icon: TrendingUp,
      color: 'bg-purple-500'
    },
    {
      title: 'Cours complétés',
      value: stats.completedCourses,
      icon: Award,
      color: 'bg-orange-500'
    }
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Tableau de bord</h1>

      {/* Stats Grid - Clean Uniform Design */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          const content = (
            <div className="h-full bg-white rounded-xl border-2 border-gray-100 p-6 hover:border-[#50b1aa] hover:shadow-lg transition-all duration-300 flex flex-col justify-between min-h-[160px]">
              {/* Top Section */}
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center shadow-md`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                {stat.link && (
                  <svg className="w-5 h-5 text-gray-300 group-hover:text-[#50b1aa] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                )}
              </div>
              
              {/* Bottom Section */}
              <div>
                <p className="text-gray-500 text-sm font-medium mb-2">{stat.title}</p>
                {loading ? (
                  <div className="h-9 w-20 bg-gray-200 animate-pulse rounded"></div>
                ) : (
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                )}
              </div>
            </div>
          );

          return stat.link ? (
            <Link key={index} href={stat.link} className="group">
              {content}
            </Link>
          ) : (
            <div key={index} className="group">{content}</div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl! font-bold text-gray-900 mb-4">Actions rapides</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/fr/academy/admin/formations/new"
            className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-[#50b1aa] hover:bg-gray-50 transition-all"
          >
            <BookOpen className="w-5 h-5 text-[#50b1aa]" />
            <span className="font-medium text-gray-900">Créer une formation</span>
          </Link>
          
          <Link
            href="/fr/academy/admin/users"
            className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-[#50b1aa] hover:bg-gray-50 transition-all"
          >
            <Users className="w-5 h-5 text-[#50b1aa]" />
            <span className="font-medium text-gray-900">Gérer les utilisateurs</span>
          </Link>

          <Link
            href="/fr/academy/admin/formations"
            className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-[#50b1aa] hover:bg-gray-50 transition-all"
          >
            <TrendingUp className="w-5 h-5 text-[#50b1aa]" />
            <span className="font-medium text-gray-900">Voir les formations</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

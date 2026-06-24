'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, Award, BookOpen, TrendingUp, Users } from 'lucide-react';

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
      iconBg: 'bg-[#151f2b]',
      accent: 'border-t-[#151f2b]',
      link: '/fr/academy/admin/users'
    },
    {
      title: 'Parcours publiés',
      value: stats.totalFormations,
      icon: BookOpen,
      iconBg: 'bg-[#50b1aa]',
      accent: 'border-t-[#50b1aa]',
      link: '/fr/academy/admin/formations'
    },
    {
      title: 'Inscriptions actives',
      value: stats.activeEnrollments,
      icon: TrendingUp,
      iconBg: 'bg-[#c9b8a8]',
      accent: 'border-t-[#c9b8a8]'
    },
    {
      title: 'Certificats prêts',
      value: stats.completedCourses,
      icon: Award,
      iconBg: 'bg-[#8f7b68]',
      accent: 'border-t-[#8f7b68]'
    }
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[#8f7b68]">Academy RESET CLUB</p>
          <h1 className="mt-2 text-3xl font-semibold text-[#151f2b]">Tableau de bord</h1>
          <p className="mt-2 max-w-2xl text-sm text-[#5d6672]">
            Pilote les parcours clients et employés avec une lecture rapide des accès, modules et certificats.
          </p>
        </div>

        <Link
          href="/fr/academy/admin/formations/new"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#151f2b] px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[#253243]"
        >
          <BookOpen className="w-4 h-4" />
          Créer un parcours
        </Link>
      </div>

      {/* Stats Grid - Clean Uniform Design */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          const content = (
            <div className={`h-full bg-white rounded-lg border border-[#e7dfd6] border-t-4 ${stat.accent} p-5 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between min-h-[158px]`}>
              {/* Top Section */}
              <div className="flex items-center justify-between mb-5">
                <div className={`${stat.iconBg} w-11 h-11 rounded-lg flex items-center justify-center shadow-sm`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                {stat.link && (
                  <ArrowRight className="w-5 h-5 text-[#c9b8a8] group-hover:text-[#50b1aa] transition-colors" />
                )}
              </div>
              
              {/* Bottom Section */}
              <div>
                <p className="text-[#5d6672] text-sm font-medium mb-2">{stat.title}</p>
                {loading ? (
                  <div className="h-9 w-20 bg-[#eee7df] animate-pulse rounded"></div>
                ) : (
                  <p className="text-3xl font-semibold text-[#151f2b]">{stat.value}</p>
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
      <div className="bg-white rounded-lg border border-[#e7dfd6] p-6 shadow-sm">
        <div className="mb-5">
          <p className="text-xs uppercase tracking-[0.18em] text-[#8f7b68]">Raccourcis</p>
          <h2 className="mt-1 text-xl! font-semibold text-[#151f2b]">Actions rapides</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/fr/academy/admin/formations/new"
            className="flex items-center gap-3 p-4 border border-[#e7dfd6] rounded-lg hover:border-[#50b1aa] hover:bg-[#f7fbfa] transition-all"
          >
            <BookOpen className="w-5 h-5 text-[#50b1aa]" />
            <span className="font-medium text-[#151f2b]">Créer un parcours</span>
          </Link>
          
          <Link
            href="/fr/academy/admin/users"
            className="flex items-center gap-3 p-4 border border-[#e7dfd6] rounded-lg hover:border-[#50b1aa] hover:bg-[#f7fbfa] transition-all"
          >
            <Users className="w-5 h-5 text-[#50b1aa]" />
            <span className="font-medium text-[#151f2b]">Gérer les utilisateurs</span>
          </Link>

          <Link
            href="/fr/academy/admin/formations"
            className="flex items-center gap-3 p-4 border border-[#e7dfd6] rounded-lg hover:border-[#50b1aa] hover:bg-[#f7fbfa] transition-all"
          >
            <TrendingUp className="w-5 h-5 text-[#50b1aa]" />
            <span className="font-medium text-[#151f2b]">Voir les parcours</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

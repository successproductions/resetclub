'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import { 
  BookOpen, 
  Trophy, 
  Clock, 
  TrendingUp,
  LogOut,
  User,
  PlayCircle,
  CheckCircle,
  Lock
} from 'lucide-react';
import Image from 'next/image';

interface UserData {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  role: string;
  avatarUrl: string | null;
}

export default function AcademyDashboard() {
  const router = useRouter();
  const headerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('academy_token');
    const userData = localStorage.getItem('academy_user');

    if (!token || !userData) {
      router.push('/academy/login');
      return;
    }

    setUser(JSON.parse(userData));
    setIsLoading(false);

    // Animations
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      if (headerRef.current) {
        tl.fromTo(
          headerRef.current,
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 0.6 }
        );
      }

      if (statsRef.current) {
        tl.fromTo(
          statsRef.current.children,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 },
          '-=0.3'
        );
      }
    });

    return () => ctx.revert();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('academy_token');
    localStorage.removeItem('academy_user');
    router.push('/academy/login');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-[#51b1aa] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black font-graphik">
      {/* Header */}
      <div ref={headerRef} className="bg-gradient-to-r from-gray-900/80 to-gray-800/80 border-b border-gray-700 sticky top-0 z-50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="relative w-32 h-10">
                <Image
                  src="/images/master/MASTERCLASSLOGO2.png"
                  alt="RESET Club Academy"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-[#51b1aa] font-semibold text-sm hidden md:block">
                Academy 360™
              </span>
            </div>

            {/* User Menu */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push('/academy/profile')}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-all duration-300 border border-gray-700"
              >
                <User className="w-5 h-5 text-[#51b1aa]" />
                <span className="text-white text-sm hidden md:block">
                  {user?.firstName || user?.email}
                </span>
              </button>
              <button
                onClick={handleLogout}
                className="p-2 rounded-lg bg-gray-800/50 hover:bg-red-500/20 transition-all duration-300 border border-gray-700 hover:border-red-500"
                title="Déconnexion"
              >
                <LogOut className="w-5 h-5 text-gray-400 hover:text-red-400" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Bienvenue, <span className="text-[#51b1aa]">{user?.firstName || 'Membre'}</span> 👋
          </h1>
          <p className="text-gray-400">
            Continue ta transformation avec RESET 360™
          </p>
        </div>

        {/* Stats Cards */}
        <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {/* Formations Enrolled */}
          <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 rounded-2xl p-6 border border-[#51b1aa]/30 hover:border-[#51b1aa]/60 transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <BookOpen className="w-8 h-8 text-[#51b1aa]" />
              <span className="text-3xl font-bold text-white">0</span>
            </div>
            <p className="text-gray-400 text-sm">Formations</p>
          </div>

          {/* Completed */}
          <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 rounded-2xl p-6 border border-green-500/30 hover:border-green-500/60 transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <Trophy className="w-8 h-8 text-green-500" />
              <span className="text-3xl font-bold text-white">0</span>
            </div>
            <p className="text-gray-400 text-sm">Terminées</p>
          </div>

          {/* Hours Learning */}
          <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 rounded-2xl p-6 border border-blue-500/30 hover:border-blue-500/60 transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <Clock className="w-8 h-8 text-blue-500" />
              <span className="text-3xl font-bold text-white">0h</span>
            </div>
            <p className="text-gray-400 text-sm">Temps d'étude</p>
          </div>

          {/* Progress */}
          <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 rounded-2xl p-6 border border-purple-500/30 hover:border-purple-500/60 transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <TrendingUp className="w-8 h-8 text-purple-500" />
              <span className="text-3xl font-bold text-white">0%</span>
            </div>
            <p className="text-gray-400 text-sm">Progression</p>
          </div>
        </div>

        {/* Enrolled Formations Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Mes Formations</h2>
            <button
              onClick={() => router.push('/academy/formations')}
              className="px-4 py-2 bg-gradient-to-r from-[#51b1aa] to-[#91dbd3] hover:from-[#91dbd3] hover:to-[#51b1aa] text-white rounded-lg transition-all duration-300 hover:scale-105 text-sm font-medium"
            >
              Parcourir le catalogue
            </button>
          </div>

          {/* Empty State */}
          <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 rounded-3xl p-12 border-2 border-gray-700/50 text-center">
            <div className="flex justify-center mb-6">
              <div className="p-6 bg-[#51b1aa]/10 rounded-full">
                <BookOpen className="w-16 h-16 text-[#51b1aa]" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">
              Commence ton apprentissage
            </h3>
            <p className="text-gray-400 mb-6 max-w-md mx-auto">
              Tu n'es inscrit à aucune formation pour le moment. Explore notre catalogue et commence ta transformation !
            </p>
            <button
              onClick={() => router.push('/academy/formations')}
              className="px-6 py-3 bg-gradient-to-r from-[#51b1aa] to-[#91dbd3] hover:from-[#91dbd3] hover:to-[#51b1aa] text-white rounded-lg transition-all duration-300 hover:scale-105 font-medium inline-flex items-center gap-2"
            >
              <PlayCircle className="w-5 h-5" />
              Explorer les formations
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => router.push('/academy/profile')}
            className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 rounded-2xl p-6 border border-gray-700 hover:border-[#51b1aa] transition-all duration-300 text-left group"
          >
            <User className="w-8 h-8 text-[#51b1aa] mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="text-white font-semibold text-lg mb-1">Mon Profil</h3>
            <p className="text-gray-400 text-sm">Modifier mes informations</p>
          </button>

          <button
            onClick={() => router.push('/academy/certificates')}
            className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 rounded-2xl p-6 border border-gray-700 hover:border-yellow-500 transition-all duration-300 text-left group"
          >
            <Trophy className="w-8 h-8 text-yellow-500 mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="text-white font-semibold text-lg mb-1">Certificats</h3>
            <p className="text-gray-400 text-sm">Voir mes certificats</p>
          </button>

          <button
            onClick={() => router.push('/academy/formations')}
            className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 rounded-2xl p-6 border border-gray-700 hover:border-[#51b1aa] transition-all duration-300 text-left group"
          >
            <BookOpen className="w-8 h-8 text-[#51b1aa] mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="text-white font-semibold text-lg mb-1">Catalogue</h3>
            <p className="text-gray-400 text-sm">Découvrir les formations</p>
          </button>
        </div>
      </div>
    </div>
  );
}

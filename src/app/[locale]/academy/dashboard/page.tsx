'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  BookOpen, 
  Trophy, 
  User,
  LogOut,
  Home,
  Library,
  Award,
  Globe
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
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activePage, setActivePage] = useState('home');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('academy_token');
    const userData = localStorage.getItem('academy_user');

    // DEV MODE: Bypass authentication in development
    if (process.env.NODE_ENV === 'development' && !token) {
      console.log('🔧 DEV MODE: Bypassing authentication');
      const devUser = {
        id: 'dev-user',
        email: 'dev@resetclub.ma',
        firstName: 'Dev',
        lastName: 'User',
        role: 'CLIENT',
        avatarUrl: null
      };
      setUser(devUser);
      setIsLoading(false);
      return;
    }

    if (!token || !userData) {
      router.push('/academy/login');
      return;
    }

    setUser(JSON.parse(userData));
    setIsLoading(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('academy_token');
    localStorage.removeItem('academy_user');
    router.push('/academy/login');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#51b1aa] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-graphik">
      {/* Top Navigation Bar */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="h-14 flex items-center justify-between px-4">
          {/* Logo */}
          <div className="relative w-24 h-8">
            <Image
              src="/images/master/MASTERCLASSLOGO2.png"
              alt="RESET Club Academy"
              fill
              className="object-contain"
            />
          </div>

          {/* Right Side - Language & Profile (no gap) */}
          <div className="flex items-center">
            {/* Language Toggle */}
            <button className="flex items-center gap-1 px-3 py-2 hover:bg-gray-100 transition-colors">
              <Globe className="w-4 h-4 text-gray-600" />
              <span className="text-sm text-gray-700 font-medium">FR</span>
            </button>

            {/* Profile - No spacing */}
            <div className="flex items-center gap-2 border-l border-gray-200 pl-3">
              <div className="w-8 h-8 bg-[#51b1aa] rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-semibold">
                  {user?.firstName?.[0] || user?.email[0].toUpperCase()}
                </span>
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-medium text-gray-900">
                  {user?.firstName || 'Utilisateur'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Layout - Sidebar + Content */}
      <div className="flex">
        {/* Left Sidebar Navigation - LinkedIn Style */}
        <aside className={`${isSidebarCollapsed ? 'w-16' : 'w-56'} bg-white border-r border-gray-200 h-[calc(100vh-3.5rem)] fixed left-0 top-14 transition-all duration-300`}>
          <nav className="py-2 h-full flex flex-col">
            {/* Toggle Button */}
            <button
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center' : 'justify-start pl-4'} py-3 text-gray-600 hover:bg-gray-100 transition-colors mb-2`}
              title={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Top Navigation Items */}
            <div>
              <button
                onClick={() => setActivePage('home')}
                className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center' : 'gap-3'} px-4 py-3 text-sm font-medium transition-colors border-l-4 ${
                  activePage === 'home'
                    ? 'border-[#51b1aa] bg-gray-50 text-gray-900'
                    : 'border-transparent text-gray-700 hover:bg-gray-50'
                }`}
                title="Accueil"
              >
                <Home className="w-5 h-5" />
                {!isSidebarCollapsed && <span>Accueil</span>}
              </button>

              <button
                onClick={() => setActivePage('library')}
                className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center' : 'gap-3'} px-4 py-3 text-sm font-medium transition-colors border-l-4 ${
                  activePage === 'library'
                    ? 'border-[#51b1aa] bg-gray-50 text-gray-900'
                    : 'border-transparent text-gray-700 hover:bg-gray-50'
                }`}
                title="Mes Formations"
              >
                <Library className="w-5 h-5" />
                {!isSidebarCollapsed && <span>Mes Formations</span>}
              </button>

              <button
                onClick={() => setActivePage('certificates')}
                className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center' : 'gap-3'} px-4 py-3 text-sm font-medium transition-colors border-l-4 ${
                  activePage === 'certificates'
                    ? 'border-[#51b1aa] bg-gray-50 text-gray-900'
                    : 'border-transparent text-gray-700 hover:bg-gray-50'
                }`}
                title="Certificats"
              >
                <Award className="w-5 h-5" />
                {!isSidebarCollapsed && <span>Certificats</span>}
              </button>
            </div>

            {/* Spacer to push bottom items down */}
            <div className="flex-1"></div>

            {/* Bottom Navigation Items */}
            <div className="border-t border-gray-200">
              <button
                onClick={() => router.push('/academy/profile')}
                className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center' : 'gap-3'} px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors border-l-4 border-transparent`}
                title="Profil"
              >
                <User className="w-5 h-5" />
                {!isSidebarCollapsed && <span>Profil</span>}
              </button>

              <button
                onClick={handleLogout}
                className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center' : 'gap-3'} px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors border-l-4 border-transparent`}
                title="Déconnexion"
              >
                <LogOut className="w-5 h-5" />
                {!isSidebarCollapsed && <span>Déconnexion</span>}
              </button>
            </div>
          </nav>
        </aside>

        {/* Main Content Area - With left margin for sidebar */}
        <main className={`flex-1 ${isSidebarCollapsed ? 'ml-16' : 'ml-56'} p-6 transition-all duration-300`}>
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-normal text-gray-900 mb-2">
              Bonjour, {user?.firstName || 'Membre'} 👋
            </h1>
            <p className="text-gray-600">
              Continue ta transformation avec RESET 360™
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {/* Formations Card */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <BookOpen className="w-8 h-8 text-[#51b1aa]" />
                <span className="text-3xl font-semibold text-gray-900">0</span>
              </div>
              <p className="text-gray-600 text-sm">Formations inscrites</p>
            </div>

            {/* Completed Card */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <Trophy className="w-8 h-8 text-green-600" />
                <span className="text-3xl font-semibold text-gray-900">0</span>
              </div>
              <p className="text-gray-600 text-sm">Formations terminées</p>
            </div>

            {/* Certificates Card */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <Award className="w-8 h-8 text-blue-600" />
                <span className="text-3xl font-semibold text-gray-900">0</span>
              </div>
              <p className="text-gray-600 text-sm">Certificats obtenus</p>
            </div>
          </div>

          {/* Empty State */}
          <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                <BookOpen className="w-10 h-10 text-gray-400" />
              </div>
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-3">
              Commence ton apprentissage
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Tu n&apos;es inscrit à aucune formation pour le moment. Explore notre catalogue et commence ta transformation !
            </p>
            <button
              onClick={() => router.push('/academy/formations')}
              className="inline-flex items-center px-6 py-3 bg-[#51b1aa] hover:bg-[#449990] text-white font-medium rounded transition-colors"
            >
              Explorer les formations
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}

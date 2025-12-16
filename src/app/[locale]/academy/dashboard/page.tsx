'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
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
          <div className="relative w-24 h-14">
            <Image
              src="/images/logogras.png"
              alt="RESET Club Academy"
              fill
              className="object-contain h-44 w-44"
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

          {/* Formation Card Slider */}
          <div className="relative">
            {/* Left Arrow */}
            <button className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 bg-white rounded-full shadow-md border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Formation Card */}
            <Link href="/fr/academy/formations/1" className="block">
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex flex-col md:flex-row md:items-center">
                {/* Left Content */}
                <div className="flex-1 px-4 py-2 md:p-6">
                  {/* Badges */}
                  <div className="flex gap-2 mb-1 md:mb-3">
                    <span className="px-2.5 py-1 bg-gray-700 text-white text-xs font-medium rounded">New</span>
                    
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-semibold text-gray-900 md:mb-3 leading-snug">
                    Commencer votre transformation avec RESETCLUB Academy
                  </h3>

                  {/* Instructor */}
                  {/* <div className="flex items-center gap-2 md:mb-4">
                    <div className="w-5 h-5 bg-gray-300 rounded-full flex items-center justify-center">
                      <span className="text-gray-700 text-[10px] font-semibold">HH</span>
                    </div>
                    <p className="text-xs text-gray-700 font-medium">Hartt Himanshu</p>
                    <p className="text-xs text-gray-500">Cofounder and CTO at BetterMenu</p>
                  </div> */}

                  {/* Progress Bar - Hidden on mobile, shown on desktop */}
                  <div className="mb-3 hidden md:block">
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-xs text-gray-600">Progression</span>
                      <span className="text-xs font-semibold text-[#51b1aa]">15%</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-[#51b1aa] to-[#91dbd3] rounded-full transition-all" 
                        style={{ width: '15%' }}
                      />
                    </div>
                  </div>

                  {/* Stats - Hidden on mobile, shown on desktop */}
                  <div className="flex items-center gap-4 text-xs text-gray-600 hidden md:flex">
                    <span className="flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5" />
                      12 leçons
                    </span>
                    <span className="flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      2h 30min
                    </span>
                  </div>
                </div>

                {/* Right Image with margin */}
                <div className="w-full md:w-1/3 md:min-w-[200px] md:self-stretch flex-shrink-0 relative p-[10px]">
                  <img 
                    src="/images/IN2.png" 
                    alt="Course" 
                    className="w-full h-[200px] md:h-[300px] object-cover rounded-lg"
                  />
                </div>
              </div>

              {/* Progress Bar and Stats - Shown on mobile only */}
              <div className="px-6 pb-6 md:hidden">
                {/* Progress Bar */}
                <div className="mb-3">
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-xs text-gray-600">Progression</span>
                    <span className="text-xs font-semibold text-[#51b1aa]">15%</span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-[#51b1aa] to-[#91dbd3] rounded-full transition-all" 
                      style={{ width: '15%' }}
                    />
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-4 text-xs text-gray-600">
                  <span className="flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" />
                    12 leçons
                  </span>
                  <span className="flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    2h 30min
                  </span>
                </div>
              </div>
              </div>
            </Link>

            {/* Right Arrow */}
            <button className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 bg-white rounded-full shadow-md border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}

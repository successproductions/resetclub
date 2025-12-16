'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  BookOpen, 
  Users, 
  LogOut,
  Home
} from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [user, setUser] = useState<{firstName?: string; lastName?: string; email?: string; role?: string} | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // DEVELOPMENT: Skip authentication check
    // TODO: Re-enable authentication in production
    
    // Set a mock user for development
    setUser({
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@resetclub.ma',
      role: 'ADMIN'
    });
    setLoading(false);
    
    /* PRODUCTION CODE - Uncomment for production:
    const checkAdminAccess = async () => {
      const token = localStorage.getItem('academy_token');
      
      if (!token) {
        router.push('/fr/academy/login');
        return;
      }

      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        
        if (payload.role !== 'ADMIN') {
          alert('Accès refusé. Vous devez être administrateur.');
          router.push('/fr/academy/dashboard');
          return;
        }

        setUser(payload);
        setLoading(false);
      } catch (error) {
        console.error('Error checking admin access:', error);
        router.push('/fr/academy/login');
      }
    };

    checkAdminAccess();
    */
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('academy_token');
    router.push('/fr/academy/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#50b1aa] mx-auto mb-4"></div>
          <p className="text-gray-600">Vérification des accès...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200">
        <div className="p-6">
          <h1 className="text-xl font-bold text-gray-900">Reset Club</h1>
          <p className="text-sm text-gray-500">Admin Dashboard</p>
        </div>

        <nav className="mt-6">
          <Link
            href="/fr/academy/admin"
            className="flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Home className="w-5 h-5" />
            <span>Tableau de bord</span>
          </Link>

          <Link
            href="/fr/academy/admin/formations"
            className="flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <BookOpen className="w-5 h-5" />
            <span>Formations</span>
          </Link>

          <Link
            href="/fr/academy/admin/users"
            className="flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Users className="w-5 h-5" />
            <span>Utilisateurs</span>
          </Link>
        </nav>

        <div className="absolute bottom-0 w-64 p-6 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-xs text-gray-500">{user?.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
              title="Déconnexion"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto p-8">
          {children}
        </div>
      </div>
    </div>
  );
}

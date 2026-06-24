'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
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
  const pathname = usePathname();
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
      <div className="min-h-screen flex items-center justify-center bg-[#f7f5f2]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#50b1aa] mx-auto mb-4"></div>
          <p className="text-[#2f3640]">Vérification des accès...</p>
        </div>
      </div>
    );
  }

  const navItems = [
    {
      href: '/fr/academy/admin',
      label: 'Tableau de bord',
      icon: Home,
    },
    {
      href: '/fr/academy/admin/formations',
      label: 'Formations',
      icon: BookOpen,
    },
    {
      href: '/fr/academy/admin/users',
      label: 'Utilisateurs',
      icon: Users,
    },
  ];

  return (
    <div className="min-h-screen bg-[#f7f5f2] flex text-[#222833]">
      {/* Sidebar */}
      <div className="w-64 bg-[#151f2b] text-white border-r border-[#151f2b] fixed inset-y-0 left-0">
        <div className="p-6 border-b border-white/10">
          <p className="text-xs uppercase tracking-[0.18em] text-[#c9b8a8]">RESET CLUB</p>
          <h1 className="mt-2 text-xl font-semibold text-white">Academy Admin</h1>
          <p className="text-sm text-white/60">Gestion des parcours</p>
        </div>

        <nav className="mt-5 px-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href ||
              (item.href !== '/fr/academy/admin' && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-3 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? 'bg-[#50b1aa] text-white'
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 w-64 p-5 border-t border-white/10 bg-[#121b25]">
          <div className="flex items-center justify-between">
            <div className="min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-xs text-white/50 truncate">{user?.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 text-white/55 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              title="Déconnexion"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto ml-64">
        <div className="max-w-7xl mx-auto p-8">
          {children}
        </div>
      </div>
    </div>
  );
}

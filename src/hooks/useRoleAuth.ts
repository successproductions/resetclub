import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

/**
 * Hook to protect admin pages - only ADMIN role can access
 * Redirects non-admin users to dashboard
 */
export function useAdminAuth() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('academy_token');
    const userData = localStorage.getItem('academy_user');

    if (!token || !userData) {
      router.push('/fr/academy/login');
      return;
    }

    try {
      const user = JSON.parse(userData);

      // Only ADMIN users can access admin pages
      if (user.role !== 'ADMIN') {
        router.push('/fr/academy/dashboard');
        return;
      }
    } catch {
      router.push('/fr/academy/login');
    }
  }, [router]);
}

/**
 * Hook to protect student pages - only CLIENT role can access
 * Redirects admin users to admin panel
 */
export function useStudentAuth() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('academy_token');
    const userData = localStorage.getItem('academy_user');

    // DEV MODE: Allow bypass in development
    if (process.env.NODE_ENV === 'development' && !token) {
      return;
    }

    if (!token || !userData) {
      router.push('/fr/academy/login');
      return;
    }

    try {
      const user = JSON.parse(userData);

      // Admin users should use admin panel
      if (user.role === 'ADMIN') {
        router.push('/fr/academy/admin');
        return;
      }
    } catch {
      router.push('/fr/academy/login');
    }
  }, [router]);
}

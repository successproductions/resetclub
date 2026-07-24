'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, Award, BookOpen, CheckCircle2, Clock3, TrendingUp, Users, XCircle } from 'lucide-react';

interface DashboardStats {
  totalUsers: number;
  totalFormations: number;
  activeEnrollments: number;
  completedCourses: number;
}

type PhaseValidationStatus = 'PENDING' | 'VALIDATED' | 'NOT_VALIDATED';

interface PhaseValidationItem {
  userId: string;
  employeeName: string;
  employeeEmail: string;
  moduleId: string;
  moduleTitle: string;
  formationTitle: string;
  status: PhaseValidationStatus;
  reviewedAt: string | null;
  reviewerName: string | null;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalFormations: 0,
    activeEnrollments: 0,
    completedCourses: 0
  });
  const [phaseValidations, setPhaseValidations] = useState<PhaseValidationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [validationsLoading, setValidationsLoading] = useState(true);
  const [updatingValidationKey, setUpdatingValidationKey] = useState<string | null>(null);
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
      fetchPhaseValidations();
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

  const fetchPhaseValidations = async () => {
    try {
      const token = localStorage.getItem('academy_token');
      const response = await fetch('/api/admin/phase-validations', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setPhaseValidations(data.validations || []);
      } else {
        const error = await response.text();
        console.error('Phase validations API error:', response.status, error);
      }
    } catch (error) {
      console.error('Error fetching phase validations:', error);
    } finally {
      setValidationsLoading(false);
    }
  };

  const updatePhaseValidation = async (
    validation: PhaseValidationItem,
    status: PhaseValidationStatus
  ) => {
    const key = `${validation.userId}:${validation.moduleId}`;
    setUpdatingValidationKey(key);

    try {
      const token = localStorage.getItem('academy_token');
      const response = await fetch('/api/admin/phase-validations', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          userId: validation.userId,
          moduleId: validation.moduleId,
          status
        })
      });

      if (response.ok) {
        await fetchPhaseValidations();
      } else {
        const error = await response.json();
        alert(error.error || 'Erreur lors de la mise à jour');
      }
    } catch (error) {
      console.error('Error updating phase validation:', error);
      alert('Erreur lors de la mise à jour');
    } finally {
      setUpdatingValidationKey(null);
    }
  };

  const getValidationBadge = (status: PhaseValidationStatus) => {
    if (status === 'VALIDATED') {
      return 'border-emerald-200 bg-emerald-50 text-emerald-700';
    }

    if (status === 'NOT_VALIDATED') {
      return 'border-red-200 bg-red-50 text-red-700';
    }

    return 'border-amber-200 bg-amber-50 text-amber-700';
  };

  const getValidationLabel = (status: PhaseValidationStatus) => {
    if (status === 'VALIDATED') return 'Validé';
    if (status === 'NOT_VALIDATED') return 'Non validé';
    return 'En attente';
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

      <div className="bg-white rounded-lg border border-[#e7dfd6] p-6 shadow-sm">
        <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-[#8f7b68]">Validation terrain</p>
            <h2 className="mt-1 text-xl! font-semibold text-[#151f2b]">Phase 7 · Validation</h2>
            <p className="mt-1 text-sm text-[#5d6672]">
              Valide la prise en charge de clientes réelles avant de débloquer le certificat.
            </p>
          </div>
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-medium text-amber-700">
            <Clock3 className="h-3.5 w-3.5" />
            {phaseValidations.filter((item) => item.status === 'PENDING').length} en attente
          </div>
        </div>

        {validationsLoading ? (
          <div className="space-y-3">
            {[0, 1].map((item) => (
              <div key={item} className="h-20 rounded-lg bg-[#f3eee8] animate-pulse" />
            ))}
          </div>
        ) : phaseValidations.length === 0 ? (
          <div className="rounded-lg border border-dashed border-[#e7dfd6] p-6 text-sm text-[#5d6672]">
            Aucune Phase 7 à valider pour le moment.
          </div>
        ) : (
          <div className="space-y-3">
            {phaseValidations.map((validation) => {
              const key = `${validation.userId}:${validation.moduleId}`;
              const isUpdating = updatingValidationKey === key;

              return (
                <div
                  key={key}
                  className="flex flex-col gap-4 rounded-lg border border-[#e7dfd6] p-4 md:flex-row md:items-center md:justify-between"
                >
                  <div className="min-w-0">
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <p className="font-medium text-[#151f2b]">{validation.employeeName}</p>
                      <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium ${getValidationBadge(validation.status)}`}>
                        {validation.status === 'VALIDATED' ? (
                          <CheckCircle2 className="h-3 w-3" />
                        ) : validation.status === 'NOT_VALIDATED' ? (
                          <XCircle className="h-3 w-3" />
                        ) : (
                          <Clock3 className="h-3 w-3" />
                        )}
                        {getValidationLabel(validation.status)}
                      </span>
                    </div>
                    <p className="truncate text-sm text-[#5d6672]">{validation.employeeEmail}</p>
                    <p className="mt-1 text-xs text-[#8f7b68]">{validation.moduleTitle}</p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => updatePhaseValidation(validation, 'PENDING')}
                      disabled={isUpdating}
                      className="rounded-lg border border-[#e7dfd6] px-3 py-2 text-xs font-medium text-[#5d6672] transition-colors hover:border-amber-300 hover:bg-amber-50 disabled:opacity-50"
                    >
                      En attente
                    </button>
                    <button
                      onClick={() => updatePhaseValidation(validation, 'VALIDATED')}
                      disabled={isUpdating}
                      className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-700 transition-colors hover:bg-emerald-100 disabled:opacity-50"
                    >
                      Valider
                    </button>
                    <button
                      onClick={() => updatePhaseValidation(validation, 'NOT_VALIDATED')}
                      disabled={isUpdating}
                      className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-medium text-red-700 transition-colors hover:bg-red-100 disabled:opacity-50"
                    >
                      Non valide
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
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

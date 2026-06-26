'use client';

import { useCallback, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock,
  Trophy,
  User,
  LogOut,
  Home,
  Library,
  Award,
  Globe,
  PlayCircle
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

interface Formation {
  id: string;
  title: string;
  description: string | null;
  thumbnailUrl: string | null;
  durationHours: number | null;
  targetRole: string;
  modules: Array<{
    id: string;
    title: string;
    description: string | null;
    durationMinutes: number | null;
    lessons: Array<{ id: string }>;
    quizzes?: Array<{ id: string }>;
  }>;
}

interface FormationProgress {
  progressPercentage: number;
  completedLessonIds: string[];
  completedQuizIds: string[];
}

interface Certificate {
  id: string;
  formationId: string;
  certificateNumber: string;
  issuedDate: string;
  formation: { title: string; thumbnailUrl: string | null };
}

export default function AcademyDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activePage, setActivePage] = useState('home');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [formations, setFormations] = useState<Formation[]>([]);
  const [formationProgress, setFormationProgress] = useState<Record<string, FormationProgress>>({});
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [downloadingCert, setDownloadingCert] = useState<string | null>(null);

  const fetchFormationProgress = useCallback(async (formationIds: string[], token: string) => {
    if (!formationIds.length) {
      setFormationProgress({});
      return;
    }

    try {
      const progressEntries = await Promise.all(
        formationIds.map(async (formationId) => {
          const response = await fetch(`/api/progress/formation/${formationId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          if (!response.ok) {
            return null;
          }

          const progress = await response.json();
          return [
            formationId,
            {
              progressPercentage: progress.progressPercentage || 0,
              completedLessonIds: progress.completedLessonIds || [],
              completedQuizIds: progress.completedQuizIds || [],
            },
          ] as const;
        })
      );

      setFormationProgress(
        Object.fromEntries(progressEntries.filter((entry): entry is NonNullable<typeof entry> => Boolean(entry)))
      );
    } catch (error) {
      console.error('Error fetching formation progress:', error);
    }
  }, []);

  const fetchFormations = useCallback(async (role?: string, token?: string) => {
    try {
      const response = await fetch('/api/formations');
      if (response.ok) {
        const { formations: formationsList } = await response.json();
        const visibleFormations = role
          ? formationsList.filter((formation: Formation) =>
            formation.targetRole === role || formation.targetRole === 'BOTH'
          )
          : formationsList;
        setFormations(visibleFormations);

        if (token) {
          await fetchFormationProgress(
            visibleFormations.map((formation: Formation) => formation.id),
            token
          );
        } else {
          setFormationProgress({});
        }
      }
    } catch (error) {
      console.error('Error fetching formations:', error);
    }
  }, [fetchFormationProgress]);

  const fetchCertificates = useCallback(async (token: string) => {
    try {
      const response = await fetch('/api/certificate/user', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const { certificates: certs } = await response.json();
        setCertificates(certs || []);
      }
    } catch (error) {
      console.error('Error fetching certificates:', error);
    }
  }, []);

  const downloadCertificate = async (formationId: string) => {
    setDownloadingCert(formationId);
    try {
      const token = localStorage.getItem('academy_token');
      const response = await fetch(`/api/certificate/${formationId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Certificat_ResetClub.pdf';
        a.click();
        URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error('Error downloading certificate:', error);
    } finally {
      setDownloadingCert(null);
    }
  };

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('academy_token');
    const userData = localStorage.getItem('academy_user');

    if (!token || !userData) {
      // DEV MODE: Create temp user only if no login
      if (process.env.NODE_ENV === 'development') {
        console.log('🔧 DEV MODE: Creating temp CLIENT user');
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
        fetchFormations(devUser.role);
        fetchCertificates('dev-token');
        return;
      }

      router.push('/fr/academy/login');
      return;
    }

    try {
      const parsedUser = JSON.parse(userData);

      // Check if user is ADMIN - redirect to admin panel
      if (parsedUser.role === 'ADMIN') {
        console.log('🔒 ADMIN user detected - redirecting to admin panel');
        router.push('/fr/academy/admin');
        return;
      }

      console.log('✅ CLIENT user - allowing dashboard access');
      setUser(parsedUser);
      setIsLoading(false);
      fetchFormations(parsedUser.role, token);
      fetchCertificates(token);
    } catch {
      // Invalid token or user data
      router.push('/fr/academy/login');
    }
  }, [fetchCertificates, fetchFormations, router]);

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

  const assignedModulesCount = formations.reduce(
    (total, formation) => total + formation.modules.length,
    0
  );
  const isModuleComplete = (module: Formation['modules'][number], progress?: FormationProgress) => {
    const completedLessonIds = progress?.completedLessonIds || [];
    const completedQuizIds = progress?.completedQuizIds || [];
    const lessonIds = module.lessons.map((lesson) => lesson.id);
    const quizIds = module.quizzes?.map((quiz) => quiz.id) || [];
    const hasCompletionTarget = lessonIds.length > 0 || quizIds.length > 0;

    if (!hasCompletionTarget) {
      return false;
    }

    return (
      lessonIds.every((lessonId) => completedLessonIds.includes(lessonId)) &&
      quizIds.every((quizId) => completedQuizIds.includes(quizId))
    );
  };
  const getFormationStats = (formation: Formation) => {
    const progress = formationProgress[formation.id];
    const totalLessons = formation.modules.reduce((acc, module) => acc + module.lessons.length, 0);
    const totalQuizzes = formation.modules.reduce((acc, module) => acc + (module.quizzes?.length || 0), 0);
    const completedLessons = progress?.completedLessonIds.length || 0;
    const completedQuizzes = progress?.completedQuizIds.length || 0;
    const completedModules = formation.modules.filter((module) => isModuleComplete(module, progress)).length;
    const progressPercentage = Math.round(progress?.progressPercentage || 0);
    const durationHours = formation.durationHours || 0;
    const hours = Math.floor(durationHours);
    const minutes = Math.round((durationHours - hours) * 60);
    const durationText = hours > 0 ? `${hours}h ${minutes}min` : `${minutes}min`;

    return {
      totalLessons,
      totalQuizzes,
      completedLessons,
      completedQuizzes,
      completedModules,
      progressPercentage,
      durationText,
    };
  };
  const completedModulesCount = formations.reduce((total, formation) => {
    const completedModuleCount = formation.modules.filter((module) =>
      isModuleComplete(module, formationProgress[formation.id])
    ).length;

    return total + completedModuleCount;
  }, 0);

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
                className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center' : 'gap-3'} px-4 py-3 text-sm font-medium transition-colors border-l-4 ${activePage === 'home'
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
                className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center' : 'gap-3'} px-4 py-3 text-sm font-medium transition-colors border-l-4 ${activePage === 'library'
                  ? 'border-[#51b1aa] bg-gray-50 text-gray-900'
                  : 'border-transparent text-gray-700 hover:bg-gray-50'
                  }`}
                title="Mon parcours"
              >
                <Library className="w-5 h-5" />
                {!isSidebarCollapsed && <span>Mon parcours</span>}
              </button>

              <button
                onClick={() => setActivePage('certificates')}
                className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center' : 'gap-3'} px-4 py-3 text-sm font-medium transition-colors border-l-4 ${activePage === 'certificates'
                  ? 'border-[#51b1aa] bg-gray-50 text-gray-900'
                  : 'border-transparent text-gray-700 hover:bg-gray-50'
                  }`}
                title="Certificats"
              >
                <Award className="w-5 h-5" />
                {!isSidebarCollapsed && <span>Mon Certificat</span>}
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
              Bonjour {user?.firstName || 'Membre'} 👋
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
                <span className="text-3xl font-semibold text-gray-900">{assignedModulesCount}</span>
              </div>
              <p className="text-gray-600 text-sm">Modules inscrits</p>
            </div>

            {/* Completed Card */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <Trophy className="w-8 h-8 text-green-600" />
                <span className="text-3xl font-semibold text-gray-900">{completedModulesCount}</span>
              </div>
              <p className="text-gray-600 text-sm">Modules terminés</p>
            </div>

            {/* Certificates Card */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <Award className="w-8 h-8 text-blue-600" />
                <span className="text-3xl font-semibold text-gray-900">{certificates.length}</span>
              </div>
              <p className="text-gray-600 text-sm">Certificats obtenus</p>
            </div>
          </div>

          {/* Certificates Page */}
          {activePage === 'certificates' && (
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Mes Certificats</h2>
              {certificates.length === 0 ? (
                <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                  <Award className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Aucun certificat encore</h3>
                  <p className="text-gray-500 mb-4">Complétez toutes les leçons et tous les quiz de votre parcours pour obtenir votre certificat.</p>
                  <button
                    onClick={() => setActivePage('library')}
                    className="px-5 py-2 bg-[#51b1aa] text-white rounded-lg hover:bg-[#449990] transition-colors text-sm"
                  >
                    Voir mon parcours
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {certificates.map((cert) => (
                    <div key={cert.id} className="bg-white rounded-lg border border-gray-200 p-6 flex items-start gap-4">
                      <div className="w-14 h-14 rounded-full bg-amber-50 flex items-center justify-center flex-shrink-0">
                        <Award className="w-7 h-7 text-amber-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 truncate">{cert.formation.title}</h3>
                        <p className="text-xs text-gray-500 mt-1">
                          Obtenu le {new Date(cert.issuedDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </p>
                        <p className="text-xs text-gray-400 mt-0.5">N° {cert.certificateNumber}</p>
                      </div>
                      <button
                        onClick={() => downloadCertificate(cert.formationId)}
                        disabled={downloadingCert === cert.formationId}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white text-xs font-medium rounded-lg transition-colors disabled:opacity-60 flex-shrink-0"
                      >
                        <Award className="w-3.5 h-3.5" />
                        {downloadingCert === cert.formationId ? '...' : 'Télécharger'}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Learning Path Page */}
          {activePage === 'library' && (
            <div>
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-6">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900">Mon parcours</h2>
                  <p className="text-sm text-gray-600 mt-1">
                    Retrouvez vos modules, votre progression et la prochaine étape à suivre.
                  </p>
                </div>
              </div>

              {formations.length === 0 ? (
                <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                  <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Aucun parcours disponible</h3>
                  <p className="text-gray-600">Votre parcours sera disponible dès son activation.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {formations.map((formation) => {
                    const stats = getFormationStats(formation);
                    const progress = formationProgress[formation.id];

                    return (
                      <div key={formation.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px]">
                          <div className="p-6">
                            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-5">
                              <div>
                                <span className="inline-flex items-center rounded bg-[#51b1aa]/10 px-2.5 py-1 text-xs font-medium text-[#2f817b] mb-3">
                                  Parcours actif
                                </span>
                                <h3 className="text-xl font-semibold text-gray-900">{formation.title}</h3>
                                {formation.description && (
                                  <p className="text-sm text-gray-600 mt-2 max-w-3xl">{formation.description}</p>
                                )}
                              </div>

                              <Link
                                href={`/fr/academy/formations/${formation.id}`}
                                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#51b1aa] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#449990] md:flex-shrink-0"
                              >
                                Continuer
                                <ArrowRight className="w-4 h-4" />
                              </Link>
                            </div>

                            <div className="mb-5">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-gray-700">Progression globale</span>
                                <span className="text-sm font-semibold text-[#51b1aa]">{stats.progressPercentage}%</span>
                              </div>
                              <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                                <div
                                  className="h-full rounded-full bg-gradient-to-r from-[#51b1aa] to-[#91dbd3] transition-all"
                                  style={{ width: `${stats.progressPercentage}%` }}
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                              <div className="rounded-lg border border-gray-200 p-4">
                                <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
                                  <Trophy className="w-4 h-4 text-green-600" />
                                  Modules
                                </div>
                                <p className="text-sm text-gray-600 mt-1">
                                  {stats.completedModules}/{formation.modules.length} terminés
                                </p>
                              </div>
                              <div className="rounded-lg border border-gray-200 p-4">
                                <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
                                  <PlayCircle className="w-4 h-4 text-[#51b1aa]" />
                                  Leçons
                                </div>
                                <p className="text-sm text-gray-600 mt-1">
                                  {stats.completedLessons}/{stats.totalLessons} suivies
                                </p>
                              </div>
                              <div className="rounded-lg border border-gray-200 p-4">
                                <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
                                  <CheckCircle2 className="w-4 h-4 text-blue-600" />
                                  Quiz
                                </div>
                                <p className="text-sm text-gray-600 mt-1">
                                  {stats.completedQuizzes}/{stats.totalQuizzes} validés
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="relative min-h-[220px] lg:min-h-full">
                            <Image
                              src={formation.thumbnailUrl || '/images/OUT.jpg'}
                              alt={formation.title}
                              fill
                              className="object-cover"
                              sizes="(min-width: 1024px) 320px, 100vw"
                            />
                          </div>
                        </div>

                        <div className="border-t border-gray-200 bg-gray-50 p-4 md:p-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                            {formation.modules.map((module, moduleIndex) => {
                              const moduleComplete = isModuleComplete(module, progress);
                              const lessonCount = module.lessons.length;
                              const quizCount = module.quizzes?.length || 0;

                              return (
                                <Link
                                  key={module.id}
                                  href={`/fr/academy/formations/${formation.id}`}
                                  className="rounded-lg border border-gray-200 bg-white p-4 transition-colors hover:border-[#51b1aa] hover:bg-[#f5fbfa]"
                                >
                                  <div className="flex items-start gap-3">
                                    <div className={`mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full ${moduleComplete ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-500'
                                      }`}>
                                      {moduleComplete ? (
                                        <CheckCircle2 className="w-4 h-4" />
                                      ) : (
                                        <span className="text-xs font-semibold">{moduleIndex + 1}</span>
                                      )}
                                    </div>
                                    <div className="min-w-0">
                                      <h4 className="text-sm! font-semibold text-gray-900">{module.title}</h4>
                                      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500">
                                        <span className="inline-flex items-center gap-1">
                                          <BookOpen className="w-3.5 h-3.5" />
                                          {lessonCount} leçon{lessonCount > 1 ? 's' : ''}
                                        </span>
                                        {quizCount > 0 && (
                                          <span className="inline-flex items-center gap-1">
                                            <CheckCircle2 className="w-3.5 h-3.5" />
                                            {quizCount} quiz
                                          </span>
                                        )}
                                        {module.durationMinutes && (
                                          <span className="inline-flex items-center gap-1">
                                            <Clock className="w-3.5 h-3.5" />
                                            {module.durationMinutes} min
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* Formation Card Slider (home page content) */}
          {activePage === 'home' && (
            <div className="relative">
              {/* Left Arrow */}
              <button className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 bg-white rounded-full shadow-md border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Formation Cards */}
              {formations.length === 0 ? (
                <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                  <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Aucune formation disponible</h3>
                  <p className="text-gray-600">Les formations seront bientôt disponibles</p>
                </div>
              ) : (
                formations.map((formation) => {
                  const totalLessons = formation.modules.reduce((acc, mod) => acc + mod.lessons.length, 0);
                  const progressPercentage = formationProgress[formation.id]?.progressPercentage || 0;
                  const durationHours = formation.durationHours || 0;
                  const hours = Math.floor(durationHours);
                  const minutes = Math.round((durationHours - hours) * 60);
                  const durationText = hours > 0 ? `${hours}h ${minutes}min` : `${minutes}min`;

                  return (
                    <Link key={formation.id} href={`/fr/academy/formations/${formation.id}`} className="block mb-6">
                      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
                        <div className="flex flex-col md:flex-row md:items-center">
                          {/* Left Content */}
                          <div className="flex-1 px-4 py-2 md:p-6">
                            {/* Badges */}
                            <div className="flex gap-2 mb-1 md:mb-3">
                              <span className="px-2.5 py-1 bg-gray-700 text-white text-xs font-medium rounded">Nouveau</span>
                            </div>

                            {/* Title */}
                            <h3 className="text-base font-semibold text-gray-900 md:mb-3 leading-snug">
                              {formation.title}
                            </h3>

                            {/* Progress Bar - Hidden on mobile, shown on desktop */}
                            <div className="mb-3 hidden md:block">
                              <div className="flex justify-between items-center mb-1.5">
                                <span className="text-xs text-gray-600">Progression</span>
                                <span className="text-xs font-semibold text-[#51b1aa]">{progressPercentage}%</span>
                              </div>
                              <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-gradient-to-r from-[#51b1aa] to-[#91dbd3] rounded-full transition-all"
                                  style={{ width: `${progressPercentage}%` }}
                                />
                              </div>
                            </div>

                            {/* Stats - Hidden on mobile, shown on desktop */}
                            <div className="flex items-center gap-4 text-xs text-gray-600 hidden md:flex">
                              <span className="flex items-center gap-1.5">
                                <BookOpen className="w-3.5 h-3.5" />
                                {totalLessons} leçon{totalLessons > 1 ? 's' : ''}
                              </span>
                              {durationHours > 0 && (
                                <span className="flex items-center gap-1.5">
                                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                  {durationText}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Right Image with margin */}
                          <div className="w-full md:w-1/3 md:min-w-[200px] md:self-stretch flex-shrink-0 p-[10px]">
                            <div className="relative h-[200px] md:h-[300px] overflow-hidden rounded-lg">
                              <Image
                                src={formation.thumbnailUrl || '/images/OUT.jpg'}
                                alt={formation.title}
                                fill
                                className="object-cover"
                                sizes="(min-width: 768px) 33vw, 100vw"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Progress Bar and Stats - Shown on mobile only */}
                        <div className="px-6 pb-6 md:hidden">
                          {/* Progress Bar */}
                          <div className="mb-3">
                            <div className="flex justify-between items-center mb-1.5">
                              <span className="text-xs text-gray-600">Progression</span>
                              <span className="text-xs font-semibold text-[#51b1aa]">{progressPercentage}%</span>
                            </div>
                            <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-[#51b1aa] to-[#91dbd3] rounded-full transition-all"
                                style={{ width: `${progressPercentage}%` }}
                              />
                            </div>
                          </div>

                          {/* Stats */}
                          <div className="flex items-center gap-4 text-xs text-gray-600">
                            <span className="flex items-center gap-1.5">
                              <BookOpen className="w-3.5 h-3.5" />
                              {totalLessons} leçon{totalLessons > 1 ? 's' : ''}
                            </span>
                            {durationHours > 0 && (
                              <span className="flex items-center gap-1.5">
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {durationText}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })
              )}

              {/* Right Arrow */}
              <button className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 bg-white rounded-full shadow-md border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

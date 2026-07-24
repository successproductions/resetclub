'use client';

import { useCallback, useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  ChevronLeft,
  ChevronDown,
  ChevronRight,
  CheckCircle2,
  Circle,
  Menu,
  FileQuestion,
  Award,
  ClipboardCheck,
  Clock3,
  XCircle
} from 'lucide-react';

interface Lesson {
  id: string;
  title: string;
  videoUrl: string | null;
  vimeoVideoId: string | null;
  resourcesUrl?: string | null;
  durationSeconds: number | null;
  orderIndex: number;
}

interface QuizQuestion {
  id: string;
  questionText: string;
  questionType: 'MULTIPLE_CHOICE' | 'TRUE_FALSE';
  points: number;
  explanation: string | null;
  options: {
    id: string;
    optionText: string;
    isCorrect: boolean;
    orderIndex: number;
  }[];
}

interface Quiz {
  id: string;
  title: string;
  description: string | null;
  passingScore: number;
  _count?: {
    questions: number;
  };
}

interface Module {
  id: string;
  title: string;
  description: string | null;
  lessons: Lesson[];
  quizzes?: Quiz[];
}

interface Formation {
  id: string;
  title: string;
  description: string | null;
  modules: Module[];
}

type PhaseValidationStatus = 'PENDING' | 'VALIDATED' | 'NOT_VALIDATED';

interface PhaseValidation {
  moduleId: string;
  moduleTitle: string;
  status: PhaseValidationStatus;
  reviewedAt: string | null;
  updatedAt: string | null;
}

export default function CoursePage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expandedModules, setExpandedModules] = useState<number[]>([0]);
  const [formation, setFormation] = useState<Formation | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [currentQuiz, setCurrentQuiz] = useState<{ moduleId: string; quiz: Quiz } | null>(null);
  const [currentValidationModule, setCurrentValidationModule] = useState<Module | null>(null);
  const [viewMode, setViewMode] = useState<'lesson' | 'quiz' | 'validation'>('lesson');
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>([]);
  const [completedQuizIds, setCompletedQuizIds] = useState<string[]>([]);
  const [isFormationComplete, setIsFormationComplete] = useState(false);
  const [downloadingCert, setDownloadingCert] = useState(false);
  const [downloadingPhaseCertId, setDownloadingPhaseCertId] = useState<string | null>(null);
  const [downloadingValidationCertId, setDownloadingValidationCertId] = useState<string | null>(null);
  const [phaseValidations, setPhaseValidations] = useState<Record<string, PhaseValidation>>({});
  // useRef to avoid stale closure in markLessonComplete
  const formationIdRef = useRef<string>('');

  const handleExpiredSession = useCallback(() => {
    localStorage.removeItem('academy_token');
    localStorage.removeItem('academy_user');
    router.push('/fr/academy/login');
  }, [router]);

  useEffect(() => {
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  }, []);

  const fetchFormation = useCallback(async (id: string) => {
    try {
      const response = await fetch(`/api/formations/${id}`);
      if (response.ok) {
        const { formation } = await response.json();
        setFormation(formation);
        if (formation.modules.length > 0 && formation.modules[0].lessons.length > 0) {
          setCurrentLesson(formation.modules[0].lessons[0]);
        }
      }
    } catch (error) {
      console.error('Error fetching formation:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchProgress = useCallback(async (id: string) => {
    try {
      const token = localStorage.getItem('academy_token');
      if (!token) return;
      const response = await fetch(`/api/progress/formation/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 401) {
        handleExpiredSession();
        return;
      }

      if (response.ok) {
        const data = await response.json();
        setCompletedLessonIds(data.completedLessonIds || []);
        setCompletedQuizIds(data.completedQuizIds || []);
        setIsFormationComplete(data.isComplete || false);
      }
    } catch (error) {
      console.error('Error fetching progress:', error);
    }
  }, [handleExpiredSession]);

  const fetchPhaseValidations = useCallback(async (id: string) => {
    try {
      const token = localStorage.getItem('academy_token');
      if (!token) return;

      const response = await fetch(`/api/phase-validations?formationId=${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 401) {
        handleExpiredSession();
        return;
      }

      if (response.ok) {
        const data = await response.json();
        const validations = (data.validations || []) as PhaseValidation[];
        setPhaseValidations(
          Object.fromEntries(validations.map((validation) => [validation.moduleId, validation]))
        );
      }
    } catch (error) {
      console.error('Error fetching phase validations:', error);
    }
  }, [handleExpiredSession]);

  useEffect(() => {
    const loadData = async () => {
      const resolvedParams = await params;
      formationIdRef.current = resolvedParams.id;
      await fetchFormation(resolvedParams.id);
      await fetchProgress(resolvedParams.id);
      await fetchPhaseValidations(resolvedParams.id);
    };
    loadData();
  }, [fetchFormation, fetchPhaseValidations, fetchProgress, params]);

  const markLessonComplete = async (lessonId: string) => {
    const fId = formationIdRef.current;
    if (!fId || completedLessonIds.includes(lessonId)) return;
    try {
      const token = localStorage.getItem('academy_token');
      if (!token) return;
      const response = await fetch('/api/progress/lesson', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ lessonId, formationId: fId }),
      });
      if (response.status === 401) {
        handleExpiredSession();
        return;
      }

      if (response.ok) {
        const data = await response.json();
        setCompletedLessonIds(data.completedLessonIds || []);
        setCompletedQuizIds(data.completedQuizIds || []);
        setIsFormationComplete(data.isComplete || false);
      }
    } catch (error) {
      console.error('Error marking lesson complete:', error);
    }
  };

  const markQuizComplete = async () => {
    if (!currentQuiz || completedQuizIds.includes(currentQuiz.quiz.id)) return;

    try {
      const token = localStorage.getItem('academy_token');
      if (!token) return;

      const score = calculateScore();
      const response = await fetch('/api/progress/quiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          quizId: currentQuiz.quiz.id,
          formationId: formationIdRef.current,
          score: score.percentage,
          answers: userAnswers,
        }),
      });

      if (response.status === 401) {
        handleExpiredSession();
        return;
      }

      if (response.ok) {
        const data = await response.json();
        setCompletedLessonIds(data.completedLessonIds || []);
        setCompletedQuizIds(data.completedQuizIds || []);
        setIsFormationComplete(data.isComplete || false);
      }
    } catch (error) {
      console.error('Error marking quiz complete:', error);
    }
  };

  const downloadCertificate = async () => {
    setDownloadingCert(true);
    try {
      const token = localStorage.getItem('academy_token');
      const response = await fetch(`/api/certificate/${formationIdRef.current}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 401) {
        handleExpiredSession();
        return;
      }

      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Certificat_ResetClub.pdf`;
        a.click();
        URL.revokeObjectURL(url);
      } else {
        alert('Certificat non disponible');
      }
    } catch (error) {
      console.error('Error downloading certificate:', error);
    } finally {
      setDownloadingCert(false);
    }
  };

  const downloadPhaseCertificate = async (quizId: string) => {
    setDownloadingPhaseCertId(quizId);
    try {
      const token = localStorage.getItem('academy_token');
      const response = await fetch(`/api/certificate/phase/${quizId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 401) {
        handleExpiredSession();
        return;
      }

      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Certificat_Phase_ResetClub.pdf';
        a.click();
        URL.revokeObjectURL(url);
      } else {
        const error = await response.json();
        alert(error.error || 'Certificat non disponible');
      }
    } catch (error) {
      console.error('Error downloading phase certificate:', error);
      alert('Erreur lors du téléchargement du certificat');
    } finally {
      setDownloadingPhaseCertId(null);
    }
  };

  const downloadValidationCertificate = async (moduleId: string) => {
    setDownloadingValidationCertId(moduleId);
    try {
      const token = localStorage.getItem('academy_token');
      const response = await fetch(`/api/certificate/validation/${moduleId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 401) {
        handleExpiredSession();
        return;
      }

      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Certificat_Validation_ResetClub.pdf';
        a.click();
        URL.revokeObjectURL(url);
      } else {
        const error = await response.json();
        alert(error.error || 'Certificat non disponible');
      }
    } catch (error) {
      console.error('Error downloading validation certificate:', error);
      alert('Erreur lors du téléchargement du certificat');
    } finally {
      setDownloadingValidationCertId(null);
    }
  };

  const toggleModule = (index: number) => {
    setExpandedModules(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const closeSidebarOnMobile = () => {
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  const selectLesson = (lesson: Lesson) => {
    setCurrentLesson(lesson);
    setViewMode('lesson');
    setCurrentQuiz(null);
    setCurrentValidationModule(null);
    closeSidebarOnMobile();
    void markLessonComplete(lesson.id);
  };

  const selectQuiz = (moduleId: string, quiz: Quiz) => {
    setCurrentQuiz({ moduleId, quiz });
    setViewMode('quiz');
    setCurrentLesson(null);
    setCurrentValidationModule(null);
    setQuizStarted(false);
    closeSidebarOnMobile();
  };

  const selectValidation = (module: Module) => {
    setCurrentValidationModule(module);
    setViewMode('validation');
    setCurrentLesson(null);
    setCurrentQuiz(null);
    setQuizStarted(false);
    closeSidebarOnMobile();
  };

  const startQuiz = async () => {
    if (!currentQuiz) return;
    
    // Fetch quiz questions
    try {
      const response = await fetch(`/api/quizzes/${currentQuiz.quiz.id}/questions`);
      if (response.ok) {
        const { questions } = await response.json();
        setQuizQuestions(questions);
        setQuizStarted(true);
        setCurrentQuestionIndex(0);
        setUserAnswers({});
        setQuizCompleted(false);
      }
    } catch (error) {
      console.error('Error fetching quiz questions:', error);
      alert('Erreur lors du chargement du quiz');
    }
  };

  const handleAnswerSelect = (optionId: string) => {
    if (showFeedback) return; // Don't allow changing answer after selection
    setSelectedAnswer(optionId);
    setShowFeedback(true);
    
    // Save answer
    const questionId = quizQuestions[currentQuestionIndex].id;
    setUserAnswers(prev => ({ ...prev, [questionId]: optionId }));
  };

  const handleNextQuestion = () => {
    setShowFeedback(false);
    setSelectedAnswer(null);
    
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Quiz completed
      setQuizCompleted(true);
      void markQuizComplete();
    }
  };

  const calculateScore = () => {
    let correct = 0;
    let total = 0;
    
    quizQuestions.forEach(question => {
      const userAnswer = userAnswers[question.id];
      const correctOption = question.options.find(opt => opt.isCorrect);
      
      if (userAnswer === correctOption?.id) {
        correct++;
      }
      total++;
    });
    
    return { correct, total, percentage: total > 0 ? Math.round((correct / total) * 100) : 0 };
  };

  const formatDuration = (seconds: number | null) => {
    if (!seconds) return '0m';
    const mins = Math.floor(seconds / 60);
    return `${mins}m`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#50b1aa]"></div>
      </div>
    );
  }

  if (!formation) {
    return <div className="flex items-center justify-center min-h-screen">Formation non trouvée</div>;
  }

  const allLessons = formation.modules.flatMap((module) => module.lessons);
  const currentLessonIndex = allLessons.findIndex((lesson) => lesson.id === currentLesson?.id);
  const isLastLesson = currentLessonIndex === allLessons.length - 1;
  const currentLessonCompleted = currentLesson
    ? completedLessonIds.includes(currentLesson.id)
    : false;
  const currentQuizCompleted = currentQuiz
    ? completedQuizIds.includes(currentQuiz.quiz.id)
    : false;
  const isValidationModule = (module: Module) => module.title.startsWith('PHASE 7');
  const getValidationStatus = (module: Module): PhaseValidationStatus =>
    phaseValidations[module.id]?.status || 'PENDING';
  const isValidationApproved = (module: Module) => getValidationStatus(module) === 'VALIDATED';
  const getValidationLabel = (status: PhaseValidationStatus) => {
    if (status === 'VALIDATED') return 'Validé';
    if (status === 'NOT_VALIDATED') return 'Non validé';
    return 'En attente';
  };
  const getValidationStyles = (status: PhaseValidationStatus) => {
    if (status === 'VALIDATED') return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    if (status === 'NOT_VALIDATED') return 'bg-red-50 text-red-700 border-red-200';
    return 'bg-amber-50 text-amber-700 border-amber-200';
  };
  const currentModule = formation.modules.find((module) => {
    if (currentValidationModule) {
      return module.id === currentValidationModule.id;
    }

    if (currentQuiz) {
      return module.id === currentQuiz.moduleId;
    }

    return currentLesson
      ? module.lessons.some((lesson) => lesson.id === currentLesson.id)
      : false;
  });
  const getQuizBadgeUrl = (quiz?: Quiz) => {
    const match = quiz?.description?.match(/(?:^|\n)Badge:\s*([^\n]+)/);
    return match?.[1]?.trim() || null;
  };
  const getQuizCertificateUrl = (quiz?: Quiz) => {
    const match = quiz?.description?.match(/(?:^|\n)Certificat:\s*([^\n]+)/);
    return match?.[1]?.trim() || null;
  };
  const getFallbackPhaseCertificateUrl = (moduleTitle: string) => {
    if (moduleTitle.startsWith('PHASE 3')) {
      return '/pdf/PHASE-3/CERTIFICATION%20FORMATION%20PRESENTIELLE%20%20THERAPEUTE%20RESET%20CLUB.pdf';
    }
    if (moduleTitle.startsWith('PHASE 4')) {
      return '/pdf/PHASE-4/CERTIFICAT%20FORMATION%20MACHINE%20RESET%20CLUB.pdf';
    }
    if (moduleTitle.startsWith('PHASE 5')) {
      return '/pdf/PHASE-5/CERTIFICAT%20GLOBAL%20THERAPEUTE%20RESET%20CLUB%20.pdf';
    }

    return null;
  };
  const getModuleBadgeUrl = (module: Module) =>
    module.lessons.find((lesson) => lesson.resourcesUrl)?.resourcesUrl ||
    getQuizBadgeUrl(module.quizzes?.[0]);
  const getModuleCertificateUrl = (module: Module) =>
    getQuizCertificateUrl(module.quizzes?.[0]) || getFallbackPhaseCertificateUrl(module.title);
  const isModuleComplete = (module: Module) =>
    (isValidationModule(module) ? isValidationApproved(module) : true) &&
    module.lessons.every((lesson) => completedLessonIds.includes(lesson.id)) &&
    (module.quizzes || []).every((quiz) => completedQuizIds.includes(quiz.id));
  const isModuleQuizComplete = (module: Module) =>
    (module.quizzes || []).length > 0 &&
    (module.quizzes || []).every((quiz) => completedQuizIds.includes(quiz.id));
  const currentBadgeUrl = currentModule ? getModuleBadgeUrl(currentModule) : null;
  const currentCertificateUrl = currentModule ? getModuleCertificateUrl(currentModule) : null;
  const currentModuleComplete = currentModule ? isModuleComplete(currentModule) : false;
  const currentModuleQuizComplete = currentModule ? isModuleQuizComplete(currentModule) : false;
  const isCurrentValidationModule = currentModule ? isValidationModule(currentModule) : false;
  const currentValidationStatus = currentValidationModule
    ? getValidationStatus(currentValidationModule)
    : 'PENDING';

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile Menu Button */}
      {!sidebarOpen && (
        <button
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden fixed top-4 left-4 z-50 flex h-11 w-11 items-center justify-center rounded-xl bg-[#50b1aa] text-white shadow-lg shadow-black/15 ring-1 ring-white/20"
          aria-label="Ouvrir le menu du cours"
        >
          <Menu className="w-5 h-5" />
        </button>
      )}

      {/* Sidebar */}
      <div className={`
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 fixed lg:relative z-40 
        w-80 h-full bg-[#50b1aa] text-white overflow-y-auto transition-transform duration-300
      `}>
        <div className="p-4 border-b border-white/20">
          <div className="mb-4 flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setSidebarOpen(false)}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-white/15 px-3 py-2.5 text-sm font-medium text-white ring-1 ring-white/20 transition-colors hover:bg-white/20"
              aria-label="Masquer le menu du cours"
            >
              <Menu className="w-4 h-4" />
              Masquer
            </button>
            <button
              onClick={() => router.push('/fr/academy/dashboard')}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-white px-3 py-2.5 text-sm font-semibold text-[#2d6d68] shadow-sm transition-colors hover:bg-white/90"
            >
              <ChevronLeft className="w-4 h-4" />
              Accueil
            </button>
          </div>

          <button
            onClick={() => router.push('/fr/academy/dashboard')}
            className="mb-4 hidden items-center gap-2 text-gray-300 hover:text-white transition-colors lg:flex"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
            <span className="text-sm text-gray-100">Retour au tableau de bord</span>
          </button>

          {/* Course Title */}
          <h2 className="text-sm! text-gray-50 font-normal mb-1">{formation.title}</h2>
          <p className="text-xs text-gray-100">{formation.description || 'Formation Reset Club'}</p>
        </div>

        {/* Course Modules */}
        <div className="py-2">
          {formation.modules.map((module, moduleIndex) => {
            const moduleBadgeUrl = getModuleBadgeUrl(module);
            const moduleCertificateUrl = getModuleCertificateUrl(module);
            const moduleComplete = isModuleComplete(module);
            const moduleQuizComplete = isModuleQuizComplete(module);
            const validationModule = isValidationModule(module);
            const validationStatus = getValidationStatus(module);
            const validationApproved = validationStatus === 'VALIDATED';

            return (
              <div key={module.id} className="border-b border-white/10">
                {/* Module Header */}
                <button
                  onClick={() => {
                    toggleModule(moduleIndex);
                    if (validationModule) {
                      selectValidation(module);
                    }
                  }}
                  className="w-full px-4 py-3 flex items-center justify-between hover:bg-[#449990] transition-colors"
                >
                  <div className="flex items-center gap-2 flex-1">
                    {expandedModules.includes(moduleIndex) ? (
                      <ChevronDown className="w-4 h-4 text-gray-100" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-white" />
                    )}
                    <span className="text-sm font-medium text-left">{module.title}</span>
                  </div>
                  {validationModule && (
                    <span className="ml-2 rounded-full bg-white/15 px-2 py-1 text-[10px] font-medium text-white">
                      {getValidationLabel(validationStatus)}
                    </span>
                  )}
                </button>

                {/* Lessons */}
                {expandedModules.includes(moduleIndex) && (
                  <div className="bg-[#3d8a85]">
                    {validationModule && (
                      <button
                        onClick={() => selectValidation(module)}
                        className="w-full px-4 py-3 pl-10 flex items-center gap-3 hover:bg-[#2d6d68] transition-colors text-left"
                      >
                        {validationApproved ? (
                          <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
                        ) : validationStatus === 'NOT_VALIDATED' ? (
                          <XCircle className="w-4 h-4 text-red-300 flex-shrink-0" />
                        ) : (
                          <Clock3 className="w-4 h-4 text-amber-200 flex-shrink-0" />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-100">Validation admin</p>
                          <p className="text-xs text-gray-200">{getValidationLabel(validationStatus)}</p>
                        </div>
                      </button>
                    )}

                    {module.lessons.map((lesson) => (
                      <button
                        key={lesson.id}
                        onClick={() => selectLesson(lesson)}
                        className="w-full px-4 py-2.5 pl-10 flex items-center gap-3 hover:bg-[#2d6d68] transition-colors text-left"
                      >
                        {completedLessonIds.includes(lesson.id) ? (
                          <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
                        ) : currentLesson?.id === lesson.id ? (
                          <Circle className="w-4 h-4 text-white flex-shrink-0" />
                        ) : (
                          <Circle className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-100 truncate">{lesson.title}</p>
                          <p className="text-xs text-gray-200">{formatDuration(lesson.durationSeconds)}</p>
                        </div>
                      </button>
                    ))}

                    {/* Quiz Button */}
                    {module.quizzes && module.quizzes.length > 0 && (
                      <button
                        onClick={() => selectQuiz(module.id, module.quizzes![0])}
                        className="w-full px-4 py-2.5 pl-10 flex items-center gap-3 bg-[#50b1aa] hover:bg-[#449990] transition-colors text-left border-t border-[#3d8a85]"
                      >
                        {completedQuizIds.includes(module.quizzes[0].id) ? (
                          <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
                        ) : (
                          <FileQuestion className="w-4 h-4 text-yellow-300 flex-shrink-0" />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-white font-normal">Quiz du module</p>
                          <p className="text-xs text-gray-200">
                            {completedQuizIds.includes(module.quizzes[0].id)
                              ? 'Réussi'
                              : `${module.quizzes[0]._count?.questions || 0} question${(module.quizzes[0]._count?.questions || 0) > 1 ? 's' : ''}`}
                          </p>
                        </div>
                      </button>
                    )}

                    {moduleBadgeUrl && (
                      moduleComplete ? (
                        <a
                          href={moduleBadgeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mx-10 my-2 inline-flex items-center gap-2 rounded-full bg-white/95 px-3 py-1.5 text-xs font-medium text-[#2d6d68] transition-colors hover:bg-white"
                        >
                          <Award className="w-3.5 h-3.5 flex-shrink-0 text-[#2d6d68]" />
                          Badge disponible
                        </a>
                      ) : (
                        <div className="mx-10 my-2 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-white/75">
                          <Award className="w-3.5 h-3.5 flex-shrink-0 text-white/55" />
                          Badge après validation
                        </div>
                      )
                    )}

                    {moduleCertificateUrl && (
                      moduleQuizComplete ? (
                        <button
                          onClick={() => downloadPhaseCertificate(module.quizzes![0].id)}
                          disabled={downloadingPhaseCertId === module.quizzes![0].id}
                          className="mx-10 mb-2 inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1.5 text-xs font-medium text-amber-800 transition-colors hover:bg-white"
                        >
                          <Award className="w-3.5 h-3.5 flex-shrink-0 text-amber-700" />
                          {downloadingPhaseCertId === module.quizzes![0].id ? 'Génération...' : 'Certificat disponible'}
                        </button>
                      ) : (
                        <div className="mx-10 mb-2 inline-flex items-center gap-2 rounded-full bg-amber-50/10 px-3 py-1.5 text-xs font-medium text-white/75">
                          <Award className="w-3.5 h-3.5 flex-shrink-0 text-white/55" />
                          Certificat après quiz
                        </div>
                      )
                    )}

                    {validationModule && (
                      validationApproved ? (
                        <button
                          onClick={() => downloadValidationCertificate(module.id)}
                          disabled={downloadingValidationCertId === module.id}
                          className="mx-10 mb-2 inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1.5 text-xs font-medium text-amber-800 transition-colors hover:bg-white"
                        >
                          <Award className="w-3.5 h-3.5 flex-shrink-0 text-amber-700" />
                          {downloadingValidationCertId === module.id ? 'Génération...' : 'Certificat disponible'}
                        </button>
                      ) : (
                        <div className="mx-10 mb-2 inline-flex items-center gap-2 rounded-full bg-amber-50/10 px-3 py-1.5 text-xs font-medium text-white/75">
                          <Award className="w-3.5 h-3.5 flex-shrink-0 text-white/55" />
                          Certificat après validation
                        </div>
                      )
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Video Player or Quiz */}
        <div className="flex-1 bg-gray-50 flex items-center justify-center">
          {viewMode === 'lesson' ? (
            <div className="w-full h-full max-w-7xl">
              {currentLesson?.videoUrl ? (
                <video
                  key={currentLesson.id}
                  className="w-full h-full bg-black"
                  controls
                  playsInline
                  preload="metadata"
                >
                  <source src={currentLesson.videoUrl} type="video/mp4" />
                  Votre navigateur ne supporte pas la lecture vidéo.
                </video>
              ) : currentLesson?.vimeoVideoId ? (
                <iframe
                  src={`https://player.vimeo.com/video/${currentLesson.vimeoVideoId.includes('?') ? currentLesson.vimeoVideoId : currentLesson.vimeoVideoId + '?h=0'}&title=0&byline=0&portrait=0`}
                  className="w-full h-full"
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <video 
                  className="w-full h-full"
                  controls
                  poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='450'%3E%3Crect fill='%23000' width='800' height='450'/%3E%3Ctext fill='%23fff' font-size='24' font-family='Arial' x='50%25' y='50%25' text-anchor='middle' dy='.3em'%3EChargement de la formation...%3C/text%3E%3C/svg%3E"
                >
                  <source src="/videos/sample-course.mp4" type="video/mp4" />
                  Votre navigateur ne supporte pas la lecture vidéo.
                </video>
              )}
            </div>
          ) : viewMode === 'validation' ? (
            <div className="w-full h-full max-w-7xl p-6 md:p-10 overflow-y-auto bg-gray-50">
              <div className="max-w-3xl mx-auto">
                <div className="text-center mb-8 pt-8">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#50b1aa]/10 mb-6">
                    <ClipboardCheck className="w-10 h-10 text-[#50b1aa]" />
                  </div>
                  <h1 className="text-3xl font-normal text-gray-900 mb-3">
                    {currentValidationModule?.title || 'PHASE 7 · Validation'}
                  </h1>
                  <span className={`inline-flex rounded-full border px-4 py-1.5 text-sm font-medium ${getValidationStyles(currentValidationStatus)}`}>
                    {getValidationLabel(currentValidationStatus)}
                  </span>
                </div>

                <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-200">
                  {(() => {
                    const lines = (currentValidationModule?.description || '')
                      .split('\n')
                      .map((line) => line.trim())
                      .filter(Boolean);
                    const [title, minimumLabel, ...requirements] = lines;

                    return (
                      <div className="space-y-6">
                        <div>
                          <p className="text-xs uppercase tracking-[0.18em] text-[#8f7b68]">
                            Validation terrain
                          </p>
                          <h2 className="mt-2 text-2xl! font-semibold text-[#151f2b]">
                            {title || 'PRISE EN CHARGE CLIENTES RÉELLES'}
                          </h2>
                        </div>

                        <div className="rounded-xl border border-[#e7dfd6] bg-[#fbfaf8] p-5">
                          <p className="mb-4 text-sm font-semibold text-[#151f2b]">
                            {minimumLabel || 'Minimum :'}
                          </p>
                          <ul className="space-y-3">
                            {requirements.map((requirement) => (
                              <li key={requirement} className="flex items-start gap-3 text-sm text-[#394452]">
                                <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#50b1aa]" />
                                <span>{requirement}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {currentValidationStatus === 'VALIDATED' ? (
                          <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700">
                            La validation admin est confirmée. Le certificat est disponible.
                          </div>
                        ) : currentValidationStatus === 'NOT_VALIDATED' ? (
                          <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                            La validation admin n’est pas validée pour le moment.
                          </div>
                        ) : (
                          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-700">
                            En attente de validation par un admin.
                          </div>
                        )}
                      </div>
                    );
                  })()}
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full h-full max-w-7xl p-8 overflow-y-auto bg-gray-50">
              <div className="max-w-3xl mx-auto">
                {!quizStarted ? (
                  // Quiz Start Screen
                  <>
                    <div className="text-center mb-8 pt-8">
                      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#50b1aa]/10 mb-6">
                        <FileQuestion className="w-10 h-10 text-[#50b1aa]" />
                      </div>
                      <h1 className="text-3xl font-normal text-gray-900 mb-2">Quiz du Module</h1>
                      <p className="text-gray-500">Testez vos connaissances</p>
                    </div>
                    
                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
                      <div className="text-center">
                        <h2 className="text-xl! md:text-3xl! font-normal text-gray-900 mb-2">{currentQuiz?.quiz.title}</h2>
                        <p className="text-gray-500 mb-8">
                          {currentQuiz?.quiz._count?.questions || 0} questions
                        </p>
                        <button 
                          onClick={startQuiz}
                          className="px-10 py-4 bg-[#50b1aa] text-white rounded-xl hover:bg-[#449990] transition-all font-normal text-lg shadow-sm"
                        >
                          Commencer le Quiz
                        </button>
                      </div>
                    </div>
                  </>
                ) : quizCompleted ? (
                  // Quiz Results Screen
                  <>
                    <div className="text-center pt-8">
                      <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-[#50b1aa]/10 mb-6">
                        <span className="text-5xl">🎯</span>
                      </div>
                      <h1 className="text-3xl font-normal text-gray-900 mb-2">Quiz Terminé</h1>
                      <p className="text-gray-500 mb-8">Voici vos résultats</p>
                    </div>
                    
                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 text-center">
                      <div className="mb-8">
                        <div className="text-6xl font-normal text-gray-900 mb-2">
                          {calculateScore().percentage}%
                        </div>
                        <p className="text-gray-500 text-lg">
                          {calculateScore().correct} sur {calculateScore().total} bonnes réponses
                        </p>
                      </div>
                      
                      {calculateScore().percentage >= (currentQuiz?.quiz.passingScore || 70) ? (
                        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 mb-8">
                          <p className="text-emerald-700 font-medium">🎉 Félicitations! Vous avez réussi le quiz!</p>
                        </div>
                      ) : (
                        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8">
                          <p className="text-amber-700 font-medium">
                            Score minimum: {currentQuiz?.quiz.passingScore || 70}%. Continuez à apprendre et réessayez!
                          </p>
                        </div>
                      )}
                      
                      <button
                        onClick={() => {
                          setQuizStarted(false);
                          setQuizCompleted(false);
                          setCurrentQuestionIndex(0);
                          setUserAnswers({});
                        }}
                        className="px-10 py-4 bg-[#50b1aa] text-white rounded-xl hover:bg-[#449990] transition-all font-normal shadow-sm"
                      >
                        Recommencer
                      </button>
                    </div>
                  </>
                ) : quizQuestions.length > 0 ? (
                  // Quiz Question Screen (Clean Minimalist Style)
                  <>
                    {(() => {
                      const currentQuestion = quizQuestions[currentQuestionIndex];
                      
                      return (
                        <>
                          {/* Progress Header */}
                          <div className="mb-8 pt-4">
                            <div className="flex items-center justify-between mb-4">
                              <span className="text-sm font-medium text-gray-500">
                                Question {currentQuestionIndex + 1} / {quizQuestions.length}
                              </span>
                              <span className="text-sm text-gray-400">
                                {Math.round(((currentQuestionIndex + 1) / quizQuestions.length) * 100)}% complété
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-1">
                              <div 
                                className="bg-[#50b1aa] h-1 rounded-full transition-all duration-500"
                                style={{ width: `${((currentQuestionIndex + 1) / quizQuestions.length) * 100}%` }}
                              />
                            </div>
                          </div>
                          
                          {/* Question Card */}
                          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 mb-6">
                            <h2 className="text-xl! md:text-3xl! font-normal text-gray-900 leading-relaxed">
                              {currentQuestion.questionText}
                            </h2>
                          </div>
                          
                          {/* Answer Options - Clean Style */}
                          <div className="space-y-3 mb-6">
                            {currentQuestion.options.map((option) => {
                              const isSelected = selectedAnswer === option.id;
                              const isCorrect = option.isCorrect;
                              const showResult = showFeedback;
                              
                              let cardStyles = 'bg-white border-2 border-gray-200 hover:border-[#50b1aa] hover:bg-gray-50';
                              let checkStyles = 'border-2 border-gray-300';
                              
                              if (isSelected && !showResult) {
                                cardStyles = 'bg-[#50b1aa]/5 border-2 border-[#50b1aa]';
                                checkStyles = 'bg-[#50b1aa] border-[#50b1aa]';
                              }
                              
                              if (showResult) {
                                if (isSelected && isCorrect) {
                                  cardStyles = 'bg-emerald-50 border-2 border-emerald-500';
                                  checkStyles = 'bg-emerald-500 border-emerald-500';
                                } else if (isSelected && !isCorrect) {
                                  cardStyles = 'bg-red-50 border-2 border-red-400';
                                  checkStyles = 'bg-red-500 border-red-500';
                                } else if (isCorrect) {
                                  cardStyles = 'bg-emerald-50 border-2 border-emerald-500';
                                  checkStyles = 'bg-emerald-500 border-emerald-500';
                                } else {
                                  cardStyles = 'bg-gray-50 border-2 border-gray-200 opacity-50';
                                }
                              }
                              
                              return (
                                <button
                                  key={option.id}
                                  onClick={() => handleAnswerSelect(option.id)}
                                  disabled={showFeedback}
                                  className={`${cardStyles} w-full p-4 rounded-xl flex items-center gap-4 transition-all duration-200 disabled:cursor-not-allowed`}
                                >
                                  <span className={`${checkStyles} w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-all`}>
                                    {(isSelected || (showResult && isCorrect)) && (
                                      <span className="text-white text-sm">✓</span>
                                    )}
                                  </span>
                                  <span className="text-gray-700 text-left text-base flex-1">
                                    {option.optionText}
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                          
                          {/* Feedback & Next Button */}
                          {showFeedback && (
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                              {selectedAnswer && currentQuestion.options.find(o => o.id === selectedAnswer)?.isCorrect ? (
                                <div className="flex items-center gap-3 mb-4">
                                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                                    <span className="text-emerald-600 font-normal">✓</span>
                                  </div>
                                  <div>
                                    <p className="font-normal text-emerald-600">Bonne réponse!</p>
                                    {currentQuestion.explanation && (
                                      <p className="text-gray-500 text-sm">{currentQuestion.explanation}</p>
                                    )}
                                  </div>
                                </div>
                              ) : (
                                <div className="flex items-center gap-3 mb-4">
                                  <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                                    <span className="text-red-600 font-normal">✗</span>
                                  </div>
                                  <div>
                                    <p className="font-normal text-red-600">Mauvaise réponse</p>
                                    {currentQuestion.explanation && (
                                      <p className="text-gray-500 text-sm">{currentQuestion.explanation}</p>
                                    )}
                                  </div>
                                </div>
                              )}
                              
                              <button
                                onClick={handleNextQuestion}
                                className="w-full px-6 py-3 bg-[#50b1aa] text-white rounded-xl hover:bg-[#449990] transition-all font-medium"
                              >
                                {currentQuestionIndex < quizQuestions.length - 1 ? 'Suivant →' : 'Voir les résultats'}
                              </button>
                            </div>
                          )}
                        </>
                      );
                    })()}
                  </>
                ) : (
                  <div className="text-center text-white">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
                    <p className="mt-4">Chargement du quiz...</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Video Info Bar */}
        <div className="bg-white border-t border-gray-200 p-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-lg font-normal text-gray-900 mb-1">
              {viewMode === 'validation'
                ? currentValidationModule?.title || 'PHASE 7 · Validation'
                : viewMode === 'quiz'
                ? currentQuiz?.quiz.title || 'Quiz du module'
                : currentLesson?.title || 'Sélectionnez une leçon'}
            </h1>
            <p className="text-sm text-gray-600">
              {viewMode === 'validation'
                ? `Statut: ${getValidationLabel(currentValidationStatus)}`
                : viewMode === 'quiz'
                ? currentQuizCompleted
                  ? 'Quiz réussi'
                  : `Score minimum: ${currentQuiz?.quiz.passingScore || 70}%`
                : currentLesson &&
                  `Module ${formation.modules.findIndex(m => m.lessons.some(l => l.id === currentLesson.id)) + 1} • ${currentLessonCompleted ? 'Regardée' : formatDuration(currentLesson.durationSeconds)}`}
            </p>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="bg-gray-50 border-t border-gray-200 p-4">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <button
              onClick={() => {
                if (currentLessonIndex > 0) {
                  selectLesson(allLessons[currentLessonIndex - 1]);
                }
              }}
              disabled={!currentLesson || currentLessonIndex === 0}
              className="px-4 py-2 text-sm text-gray-400 disabled:cursor-not-allowed enabled:text-gray-700 enabled:hover:text-gray-900"
            >
              ← Leçon précédente
            </button>

            <div className="flex items-center gap-3">
              {viewMode === 'lesson' && currentLesson && !currentLessonCompleted && (
                <button
                  onClick={() => markLessonComplete(currentLesson.id)}
                  className="px-4 py-2 border border-[#50b1aa] text-[#2d6d68] text-sm font-medium rounded hover:bg-[#50b1aa]/10 transition-colors"
                >
                  Marquer comme regardée
                </button>
              )}

              {isFormationComplete && !isCurrentValidationModule && !(currentCertificateUrl && currentModuleQuizComplete) && (
                <button
                  onClick={downloadCertificate}
                  disabled={downloadingCert}
                  className="flex items-center gap-2 px-5 py-2 bg-amber-500 hover:bg-amber-600 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-60"
                >
                  <Award className="w-4 h-4" />
                  {downloadingCert ? 'Génération...' : 'Télécharger mon certificat'}
                </button>
              )}

              {currentBadgeUrl && currentModuleComplete && (
                <a
                  href={currentBadgeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2 bg-[#151f2b] hover:bg-[#263447] text-white text-sm font-medium rounded-lg transition-colors"
                >
                  <Award className="w-4 h-4" />
                  Badge du module
                </a>
              )}

              {isCurrentValidationModule && currentValidationModule && (
                <button
                  onClick={() => downloadValidationCertificate(currentValidationModule.id)}
                  disabled={
                    currentValidationStatus !== 'VALIDATED' ||
                    downloadingValidationCertId === currentValidationModule.id
                  }
                  className="flex items-center gap-2 px-5 py-2 bg-amber-500 hover:bg-amber-600 text-white text-sm font-medium rounded-lg transition-colors disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Award className="w-4 h-4" />
                  {downloadingValidationCertId === currentValidationModule.id
                    ? 'Génération...'
                    : currentValidationStatus === 'VALIDATED'
                      ? 'Télécharger mon certificat'
                      : 'Certificat verrouillé'}
                </button>
              )}

              {currentCertificateUrl && currentModuleQuizComplete && currentModule?.quizzes?.[0] && (
                <button
                  onClick={() => downloadPhaseCertificate(currentModule.quizzes![0].id)}
                  disabled={downloadingPhaseCertId === currentModule.quizzes[0].id}
                  className="flex items-center gap-2 px-5 py-2 bg-amber-500 hover:bg-amber-600 text-white text-sm font-medium rounded-lg transition-colors"
                >
                  <Award className="w-4 h-4" />
                  {downloadingPhaseCertId === currentModule.quizzes[0].id ? 'Génération...' : 'Certificat de phase'}
                </button>
              )}
            </div>

            <button
              onClick={() => {
                if (currentLesson) markLessonComplete(currentLesson.id);
                if (currentLessonIndex < allLessons.length - 1) {
                  selectLesson(allLessons[currentLessonIndex + 1]);
                }
              }}
              disabled={!currentLesson}
              className="px-4 py-2 bg-[#51b1aa] hover:bg-[#449990] text-white text-sm font-medium rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLastLesson ? 'Terminer la leçon' : 'Leçon suivante →'}
            </button>
          </div>
        </div>
      </div>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}

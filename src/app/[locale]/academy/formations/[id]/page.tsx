'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ChevronLeft,
  ChevronDown,
  ChevronRight,
  CheckCircle2,
  Circle,
  Menu,
  X,
  FileQuestion
} from 'lucide-react';

interface Lesson {
  id: string;
  title: string;
  vimeoVideoId: string | null;
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
  _count?: {
    questions: number;
  };
}

interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
  quizzes?: Quiz[];
}

interface Formation {
  id: string;
  title: string;
  description: string | null;
  modules: Module[];
}

export default function CoursePage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expandedModules, setExpandedModules] = useState<number[]>([0]);
  const [formation, setFormation] = useState<Formation | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [currentQuiz, setCurrentQuiz] = useState<{ moduleId: string; quiz: Quiz } | null>(null);
  const [viewMode, setViewMode] = useState<'lesson' | 'quiz'>('lesson');
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [quizCompleted, setQuizCompleted] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      const resolvedParams = await params;
      await fetchFormation(resolvedParams.id);
    };
    loadData();
  }, []);

  const fetchFormation = async (id: string) => {
    try {
      const response = await fetch(`/api/formations/${id}`);
      if (response.ok) {
        const { formation } = await response.json();
        setFormation(formation);
        
        // Select first lesson by default
        if (formation.modules.length > 0 && formation.modules[0].lessons.length > 0) {
          setCurrentLesson(formation.modules[0].lessons[0]);
        }
      }
    } catch (error) {
      console.error('Error fetching formation:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleModule = (index: number) => {
    setExpandedModules(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const selectLesson = (lesson: Lesson) => {
    setCurrentLesson(lesson);
    setViewMode('lesson');
    setCurrentQuiz(null);
  };

  const selectQuiz = (moduleId: string, quiz: Quiz) => {
    setCurrentQuiz({ moduleId, quiz });
    setViewMode('quiz');
    setCurrentLesson(null);
    setQuizStarted(false);
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
    
    return { correct, total, percentage: Math.round((correct / total) * 100) };
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

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-gray-800 text-white rounded-lg"
      >
        {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Sidebar */}
      <div className={`
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 fixed lg:relative z-40 
        w-80 h-full bg-[#50b1aa] text-white overflow-y-auto transition-transform duration-300
      `}>
        {/* Back Button */}
        <div className="p-4 border-b border-white/20">
          <button
            onClick={() => router.push('/fr/academy/dashboard')}
            className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
            <span className="text-sm text-gray-100">Retour au tableau de bord</span>
          </button>
        </div>

        {/* Course Title */}
        <div className="p-4 border-b border-white/20">
          <h2 className="text-sm! text-gray-50 font-normal mb-1">{formation.title}</h2>
          <p className="text-xs text-gray-100">{formation.description || 'Formation Reset Club'}</p>
        </div>

        {/* Course Modules */}
        <div className="py-2">
          {formation.modules.map((module, moduleIndex) => (
            <div key={module.id} className="border-b border-white/10">
              {/* Module Header */}
              <button
                onClick={() => toggleModule(moduleIndex)}
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
              </button>

              {/* Lessons */}
              {expandedModules.includes(moduleIndex) && (
                <div className="bg-[#3d8a85]">
                  {module.lessons.map((lesson) => (
                    <button
                      key={lesson.id}
                      onClick={() => selectLesson(lesson)}
                      className="w-full px-4 py-2.5 pl-10 flex items-center gap-3 hover:bg-[#2d6d68] transition-colors text-left"
                    >
                      {currentLesson?.id === lesson.id ? (
                        <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                      ) : (
                        <Circle className="w-4 h-4 text-gray-600 flex-shrink-0" />
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
                      <FileQuestion className="w-4 h-4 text-yellow-300 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-white font-normal">Quiz du module</p>
                        <p className="text-xs text-gray-200">
                          {module.quizzes[0]._count?.questions || 0} question{(module.quizzes[0]._count?.questions || 0) > 1 ? 's' : ''}
                        </p>
                      </div>
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Video Player or Quiz */}
        <div className="flex-1 bg-gray-50 flex items-center justify-center">
          {viewMode === 'lesson' ? (
            <div className="w-full h-full max-w-7xl">
              {currentLesson?.vimeoVideoId ? (
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
                      
                      {calculateScore().percentage >= 70 ? (
                        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 mb-8">
                          <p className="text-emerald-700 font-medium">🎉 Félicitations! Vous avez réussi le quiz!</p>
                        </div>
                      ) : (
                        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8">
                          <p className="text-amber-700 font-medium">Continuez à apprendre et réessayez!</p>
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
                            {currentQuestion.options.map((option, index) => {
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
              {currentLesson?.title || 'Sélectionnez une leçon'}
            </h1>
            <p className="text-sm text-gray-600">
              {currentLesson && `Module ${formation.modules.findIndex(m => m.lessons.some(l => l.id === currentLesson.id)) + 1} • ${formatDuration(currentLesson.durationSeconds)}`}
            </p>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="bg-gray-50 border-t border-gray-200 p-4">
          <div className="max-w-7xl mx-auto flex justify-between">
            <button 
              onClick={() => {
                const allLessons = formation.modules.flatMap(m => m.lessons);
                const currentIndex = allLessons.findIndex(l => l.id === currentLesson?.id);
                if (currentIndex > 0) {
                  setCurrentLesson(allLessons[currentIndex - 1]);
                }
              }}
              disabled={!currentLesson || formation.modules.flatMap(m => m.lessons).findIndex(l => l.id === currentLesson?.id) === 0}
              className="px-4 py-2 text-sm text-gray-400 disabled:cursor-not-allowed enabled:text-gray-700 enabled:hover:text-gray-900"
            >
              ← Leçon précédente
            </button>
            <button 
              onClick={() => {
                const allLessons = formation.modules.flatMap(m => m.lessons);
                const currentIndex = allLessons.findIndex(l => l.id === currentLesson?.id);
                if (currentIndex < allLessons.length - 1) {
                  setCurrentLesson(allLessons[currentIndex + 1]);
                }
              }}
              disabled={!currentLesson || formation.modules.flatMap(m => m.lessons).findIndex(l => l.id === currentLesson?.id) === formation.modules.flatMap(m => m.lessons).length - 1}
              className="px-4 py-2 bg-[#51b1aa] hover:bg-[#449990] text-white text-sm font-medium rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Leçon suivante →
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

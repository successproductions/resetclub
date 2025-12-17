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
  X
} from 'lucide-react';

interface Lesson {
  id: string;
  title: string;
  vimeoVideoId: string | null;
  durationSeconds: number | null;
  orderIndex: number;
}

interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
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
          <h2 className="text-sm! text-gray-50 font-semibold mb-1">{formation.title}</h2>
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
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Video Player */}
        <div className="flex-1 bg-black flex items-center justify-center">
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
        </div>

        {/* Video Info Bar */}
        <div className="bg-white border-t border-gray-200 p-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-lg font-semibold text-gray-900 mb-1">
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

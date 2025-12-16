'use client';

import { useState } from 'react';
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

export default function CoursePage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expandedModules, setExpandedModules] = useState<number[]>([0]);

  // Mock course data
  const courseData = {
    title: "Transformation Reset: Votre Parcours Complet",
    instructor: "Reset Club Team",
    modules: [
      {
        title: "Bienvenue dans le Reset Club",
        lessons: [
          { id: 1, title: "Commencer votre transformation", duration: "8m", completed: true },
          { id: 2, title: "Fixer vos objectifs de perte de poids", duration: "6m", completed: false },
          { id: 3, title: "Comprendre le programme Reset", duration: "5m", completed: false }
        ]
      },
      {
        title: "Nutrition & Alimentation",
        lessons: [
          { id: 4, title: "Les bases de la nutrition saine", duration: "12m", completed: false },
          { id: 5, title: "Créer votre plan de repas", duration: "15m", completed: false },
          { id: 6, title: "Recettes & préparation des repas", duration: "18m", completed: false },
          { id: 7, title: "Gérer les envies alimentaires", duration: "7m", completed: false }
        ]
      },
      {
        title: "Exercice & Mouvement",
        lessons: [
          { id: 8, title: "Programme d'entraînement débutant", duration: "10m", completed: false },
          { id: 9, title: "Exercices à domicile", duration: "14m", completed: false },
          { id: 10, title: "Cardio pour la perte de poids", duration: "12m", completed: false }
        ]
      },
      {
        title: "Mindset & Habitudes",
        lessons: [
          { id: 11, title: "Développer un mental de champion", duration: "9m", completed: false },
          { id: 12, title: "Créer des habitudes durables", duration: "11m", completed: false },
          { id: 13, title: "Surmonter les obstacles", duration: "8m", completed: false }
        ]
      }
    ]
  };

  const toggleModule = (index: number) => {
    setExpandedModules(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

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
          <h2 className="text-sm! text-gray-50 font-semibold mb-1">{courseData.title}</h2>
          <p className="text-xs text-gray-100">Par {courseData.instructor}</p>
        </div>

        {/* Course Modules */}
        <div className="py-2">
          {courseData.modules.map((module, moduleIndex) => (
            <div key={moduleIndex} className="border-b border-white/10">
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
                      className="w-full px-4 py-2.5 pl-10 flex items-center gap-3 hover:bg-[#2d6d68]  transition-colors text-left"
                    >
                      {lesson.completed ? (
                        <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                      ) : (
                        <Circle className="w-4 h-4 text-gray-600 flex-shrink-0" />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-100 truncate">{lesson.title}</p>
                        <p className="text-xs text-gray-200">{lesson.duration}</p>
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
            <video 
              className="w-full h-full"
              controls
              poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='450'%3E%3Crect fill='%23000' width='800' height='450'/%3E%3Ctext fill='%23fff' font-size='24' font-family='Arial' x='50%25' y='50%25' text-anchor='middle' dy='.3em'%3EChargement de la formation...%3C/text%3E%3C/svg%3E"
            >
              <source src="/videos/sample-course.mp4" type="video/mp4" />
              Votre navigateur ne supporte pas la lecture vidéo.
            </video>
          </div>
        </div>

        {/* Video Info Bar */}
        <div className="bg-white border-t border-gray-200 p-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-lg font-semibold text-gray-900 mb-1">
              Commencer votre transformation
            </h1>
            <p className="text-sm text-gray-600">
              Module 1: Bienvenue dans le Reset Club • 8m 15s
            </p>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="bg-gray-50 border-t border-gray-200 p-4">
          <div className="max-w-7xl mx-auto flex justify-between">
            <button className="px-4 py-2 text-sm text-gray-400 cursor-not-allowed">
              ← Leçon précédente
            </button>
            <button className="px-4 py-2 bg-[#51b1aa] hover:bg-[#449990] text-white text-sm font-medium rounded transition-colors">
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

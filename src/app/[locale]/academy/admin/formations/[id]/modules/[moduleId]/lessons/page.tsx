'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Plus, Edit, Trash2, GripVertical, Video, Eye } from 'lucide-react';
import Swal from 'sweetalert2';

interface Lesson {
  id: string;
  title: string;
  description: string | null;
  vimeoVideoId: string | null;
  durationSeconds: number | null;
  orderIndex: number;
  isPreview: boolean;
}

export default function LessonsManagementPage({ 
  params 
}: { 
  params: Promise<{ id: string; moduleId: string }> 
}) {
  const router = useRouter();
  const [formationId, setFormationId] = useState<string>('');
  const [moduleId, setModuleId] = useState<string>('');
  const [moduleTitle, setModuleTitle] = useState<string>('');
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    vimeoVideoId: '',
    durationSeconds: '',
    isPreview: false
  });

  useEffect(() => {
    const loadData = async () => {
      const resolvedParams = await params;
      setFormationId(resolvedParams.id);
      setModuleId(resolvedParams.moduleId);
      await Promise.all([
        fetchModule(resolvedParams.moduleId),
        fetchLessons(resolvedParams.moduleId)
      ]);
    };
    loadData();
  }, [params]);

  const fetchModule = async (id: string) => {
    try {
      const token = localStorage.getItem('academy_token');
      const response = await fetch(`/api/admin/modules/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const { module } = await response.json();
        setModuleTitle(module.title);
      }
    } catch (error) {
      console.error('Error fetching module:', error);
    }
  };

  const fetchLessons = async (id: string) => {
    try {
      const token = localStorage.getItem('academy_token');
      const response = await fetch(`/api/admin/modules/${id}/lessons`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const { lessons } = await response.json();
        setLessons(lessons);
      }
    } catch (error) {
      console.error('Error fetching lessons:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (lesson?: Lesson) => {
    if (lesson) {
      setEditingLesson(lesson);
      setFormData({
        title: lesson.title,
        description: lesson.description || '',
        vimeoVideoId: lesson.vimeoVideoId || '',
        durationSeconds: lesson.durationSeconds?.toString() || '',
        isPreview: lesson.isPreview
      });
    } else {
      setEditingLesson(null);
      setFormData({
        title: '',
        description: '',
        vimeoVideoId: '',
        durationSeconds: '',
        isPreview: false
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingLesson(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('academy_token');
      const url = editingLesson
        ? `/api/admin/lessons/${editingLesson.id}`
        : `/api/admin/modules/${moduleId}/lessons`;

      const response = await fetch(url, {
        method: editingLesson ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...formData,
          durationSeconds: formData.durationSeconds ? parseInt(formData.durationSeconds) : null
        })
      });

      if (response.ok) {
        await Swal.fire({
          icon: 'success',
          title: editingLesson ? 'Leçon modifiée!' : 'Leçon créée!',
          text: editingLesson ? 'La leçon a été modifiée avec succès' : 'La leçon a été créée avec succès',
          confirmButtonColor: '#50b1aa',
          timer: 2000
        });
        handleCloseModal();
        fetchLessons(moduleId);
      } else {
        const error = await response.json();
        await Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: error.error || 'Une erreur est survenue',
          confirmButtonColor: '#50b1aa'
        });
      }
    } catch (error) {
      console.error('Error saving lesson:', error);
      await Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Une erreur est survenue',
        confirmButtonColor: '#50b1aa'
      });
    }
  };

  const handleDelete = async (lessonId: string, title: string) => {
    const result = await Swal.fire({
      title: 'Êtes-vous sûr?',
      text: `Supprimer "${title}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler'
    });

    if (!result.isConfirmed) return;

    try {
      const token = localStorage.getItem('academy_token');
      const response = await fetch(`/api/admin/lessons/${lessonId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        await Swal.fire({
          icon: 'success',
          title: 'Supprimée!',
          text: 'La leçon a été supprimée avec succès',
          confirmButtonColor: '#50b1aa',
          timer: 2000
        });
        fetchLessons(moduleId);
      } else {
        const error = await response.json();
        await Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: error.error || 'Une erreur est survenue',
          confirmButtonColor: '#50b1aa'
        });
      }
    } catch (error) {
      console.error('Error deleting lesson:', error);
      await Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Une erreur est survenue',
        confirmButtonColor: '#50b1aa'
      });
    }
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#50b1aa]"></div>
      </div>
    );
  }

  return (
    <div>
      <Link
        href={`/fr/academy/admin/formations/${formationId}/modules`}
        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Retour aux modules</span>
      </Link>

      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Leçons</h1>
          <p className="text-gray-600 mt-1">Module: {moduleTitle}</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-4 py-2 bg-[#50b1aa] text-white rounded-lg hover:bg-[#449990] transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Nouvelle leçon</span>
        </button>
      </div>

      {lessons.length === 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <Video className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Aucune leçon</h3>
          <p className="text-gray-600 mb-6">Commencez par créer votre première leçon</p>
          <button
            onClick={() => handleOpenModal()}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#50b1aa] text-white rounded-lg hover:bg-[#449990] transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>Créer une leçon</span>
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {lessons.map((lesson, index) => (
            <div
              key={lesson.id}
              className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="flex items-center gap-2 text-gray-400">
                  <GripVertical className="w-5 h-5" />
                  <span className="text-lg font-semibold">#{index + 1}</span>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{lesson.title}</h3>
                    {lesson.isPreview && (
                      <span className="px-2 py-1 text-xs font-medium rounded bg-blue-100 text-blue-800 flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        Aperçu
                      </span>
                    )}
                  </div>
                  {lesson.description && (
                    <p className="text-sm text-gray-600 mb-3">{lesson.description}</p>
                  )}
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    {lesson.vimeoVideoId && (
                      <span className="flex items-center gap-1">
                        <Video className="w-4 h-4" />
                        Vimeo: {lesson.vimeoVideoId}
                      </span>
                    )}
                    {lesson.durationSeconds && (
                      <span>{formatDuration(lesson.durationSeconds)}</span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenModal(lesson)}
                    className="p-2 text-gray-400 hover:text-[#50b1aa] transition-colors"
                    title="Modifier"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(lesson.id, lesson.title)}
                    className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                    title="Supprimer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 border-2 border-gray-200 shadow-xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-3xl! font-bold text-gray-900 mb-6">
              {editingLesson ? 'Modifier la leçon' : 'Nouvelle leçon'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Titre *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#50b1aa] focus:border-transparent text-gray-900"
                  placeholder="Introduction à l'interface"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#50b1aa] focus:border-transparent text-gray-900"
                  placeholder="Description de la leçon..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Vimeo Video ID
                </label>
                <input
                  type="text"
                  value={formData.vimeoVideoId}
                  onChange={(e) => setFormData({ ...formData, vimeoVideoId: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#50b1aa] focus:border-transparent text-gray-900"
                  placeholder="123456789"
                />
                <p className="text-xs text-gray-500 mt-1">
                  L&apos;ID de la vidéo Vimeo (ex: vimeo.com/123456789)
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Durée (secondes)
                </label>
                <input
                  type="number"
                  value={formData.durationSeconds}
                  onChange={(e) => setFormData({ ...formData, durationSeconds: e.target.value })}
                  min="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#50b1aa] focus:border-transparent text-gray-900"
                  placeholder="300"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isPreview"
                  checked={formData.isPreview}
                  onChange={(e) => setFormData({ ...formData, isPreview: e.target.checked })}
                  className="w-4 h-4 text-[#50b1aa] border-gray-300 rounded focus:ring-[#50b1aa]"
                />
                <label htmlFor="isPreview" className="text-sm font-medium text-gray-700">
                  Aperçu gratuit (visible sans inscription)
                </label>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-[#50b1aa] text-white py-2 px-4 rounded-lg hover:bg-[#449990] transition-colors font-medium"
                >
                  {editingLesson ? 'Enregistrer' : 'Créer'}
                </button>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Plus, Edit, Trash2, GripVertical, BookOpen, FileQuestion } from 'lucide-react';
import Swal from 'sweetalert2';

interface Module {
  id: string;
  title: string;
  description: string | null;
  orderIndex: number;
  durationMinutes: number | null;
  _count?: {
    lessons: number;
  };
}

export default function ModulesManagementPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [formationId, setFormationId] = useState<string>('');
  const [formationTitle, setFormationTitle] = useState<string>('');
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingModule, setEditingModule] = useState<Module | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    durationMinutes: ''
  });

  useEffect(() => {
    const loadData = async () => {
      const resolvedParams = await params;
      setFormationId(resolvedParams.id);
      await Promise.all([
        fetchFormation(resolvedParams.id),
        fetchModules(resolvedParams.id)
      ]);
    };
    loadData();
  }, [params]);

  const fetchFormation = async (id: string) => {
    try {
      const token = localStorage.getItem('academy_token');
      const response = await fetch(`/api/admin/formations/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const { formation } = await response.json();
        setFormationTitle(formation.title);
      }
    } catch (error) {
      console.error('Error fetching formation:', error);
    }
  };

  const fetchModules = async (id: string) => {
    try {
      const token = localStorage.getItem('academy_token');
      const response = await fetch(`/api/admin/formations/${id}/modules`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const { modules } = await response.json();
        setModules(modules);
      }
    } catch (error) {
      console.error('Error fetching modules:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (module?: Module) => {
    if (module) {
      setEditingModule(module);
      setFormData({
        title: module.title,
        description: module.description || '',
        durationMinutes: module.durationMinutes?.toString() || ''
      });
    } else {
      setEditingModule(null);
      setFormData({
        title: '',
        description: '',
        durationMinutes: ''
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingModule(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('academy_token');
      const url = editingModule
        ? `/api/admin/modules/${editingModule.id}`
        : `/api/admin/formations/${formationId}/modules`;

      const response = await fetch(url, {
        method: editingModule ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...formData,
          durationMinutes: formData.durationMinutes ? parseInt(formData.durationMinutes) : null
        })
      });

      if (response.ok) {
        await Swal.fire({
          icon: 'success',
          title: editingModule ? 'Module modifié!' : 'Module créé!',
          text: editingModule ? 'Le module a été modifié avec succès' : 'Le module a été créé avec succès',
          confirmButtonColor: '#50b1aa',
          timer: 2000
        });
        handleCloseModal();
        fetchModules(formationId);
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
      console.error('Error saving module:', error);
      await Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Une erreur est survenue',
        confirmButtonColor: '#50b1aa'
      });
    }
  };

  const handleDelete = async (moduleId: string, title: string) => {
    const result = await Swal.fire({
      title: 'Êtes-vous sûr?',
      text: `Supprimer "${title}" et toutes ses leçons?`,
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
      const response = await fetch(`/api/admin/modules/${moduleId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        await Swal.fire({
          icon: 'success',
          title: 'Supprimé!',
          text: 'Le module a été supprimé avec succès',
          confirmButtonColor: '#50b1aa',
          timer: 2000
        });
        fetchModules(formationId);
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
      console.error('Error deleting module:', error);
      await Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Une erreur est survenue',
        confirmButtonColor: '#50b1aa'
      });
    }
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
        href="/fr/academy/admin/formations"
        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Retour aux formations</span>
      </Link>

      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Modules</h1>
          <p className="text-gray-600 mt-1">Formation: {formationTitle}</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-4 py-2 bg-[#50b1aa] text-white rounded-lg hover:bg-[#449990] transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Nouveau module</span>
        </button>
      </div>

      {modules.length === 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Aucun module</h3>
          <p className="text-gray-600 mb-6">Commencez par créer votre premier module</p>
          <button
            onClick={() => handleOpenModal()}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#50b1aa] text-white rounded-lg hover:bg-[#449990] transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>Créer un module</span>
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {modules.map((module, index) => (
            <div
              key={module.id}
              className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="flex items-center gap-2 text-gray-400">
                  <GripVertical className="w-5 h-5" />
                  <span className="text-lg font-semibold">#{index + 1}</span>
                </div>
                
                <div className="flex-1">
                  <h3 className="text-xl! font-semibold text-gray-900 mb-1">{module.title}</h3>
                  {module.description && (
                    <p className="text-sm text-gray-600 mb-3">{module.description}</p>
                  )}
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>{module._count?.lessons || 0} leçon(s)</span>
                    {module.durationMinutes && (
                      <span>{module.durationMinutes} minutes</span>
                    )}
                  </div>
                </div>


                <div className="flex items-center gap-2">
                  <Link
                    href={`/fr/academy/admin/formations/${formationId}/modules/${module.id}/lessons`}
                    className="px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Gérer les leçons
                  </Link>
                  <Link
                    href={`/fr/academy/admin/formations/${formationId}/modules/${module.id}/quiz`}
                    className="px-3 py-2 text-sm bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors flex items-center gap-1"
                  >
                    <FileQuestion className="w-4 h-4" />
                    Gérer le quiz
                  </Link>
                  <button
                    onClick={() => handleOpenModal(module)}
                    className="p-2 text-gray-400 hover:text-[#50b1aa] transition-colors"
                    title="Modifier"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(module.id, module.title)}
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
          <div className="bg-white rounded-xl max-w-md w-full p-6 border-2 border-gray-200 shadow-xl">
            <h2 className="text-2xl! font-bold text-gray-900 mb-6">
              {editingModule ? 'Modifier le module' : 'Nouveau module'}
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
                  placeholder="Introduction à la plateforme"
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
                  placeholder="Description du module..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Durée estimée (minutes)
                </label>
                <input
                  type="number"
                  value={formData.durationMinutes}
                  onChange={(e) => setFormData({ ...formData, durationMinutes: e.target.value })}
                  min="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#50b1aa] focus:border-transparent text-gray-900"
                  placeholder="30"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-[#50b1aa] text-white py-2 px-4 rounded-lg hover:bg-[#449990] transition-colors font-medium"
                >
                  {editingModule ? 'Enregistrer' : 'Créer'}
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

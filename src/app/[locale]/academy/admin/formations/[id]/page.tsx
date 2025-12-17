'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save } from 'lucide-react';
import Swal from 'sweetalert2';

export default function EditFormationPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formationId, setFormationId] = useState<string>('');
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    difficultyLevel: 'BEGINNER',
    targetRole: 'CLIENT',
    isPublished: false,
    durationHours: '',
    price: '',
    currency: 'MAD',
    thumbnailUrl: '/images/OUT.jpg'
  });

  useEffect(() => {
    const loadFormation = async () => {
      const resolvedParams = await params;
      setFormationId(resolvedParams.id);
      await fetchFormation(resolvedParams.id);
    };
    loadFormation();
  }, [params]);

  const fetchFormation = async (id: string) => {
    try {
      const token = localStorage.getItem('academy_token');
      const response = await fetch(`/api/admin/formations/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const { formation } = await response.json();
        setFormData({
          title: formation.title,
          slug: formation.slug,
          description: formation.description || '',
          difficultyLevel: formation.difficultyLevel,
          targetRole: formation.targetRole,
          isPublished: formation.isPublished,
          durationHours: formation.durationHours?.toString() || '',
          price: formation.price?.toString() || '',
          currency: formation.currency || 'MAD',
          thumbnailUrl: formation.thumbnailUrl || '/images/OUT.jpg'
        });
      } else {
        await Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Formation non trouvée',
          confirmButtonColor: '#50b1aa'
        });
        router.push('/fr/academy/admin/formations');
      }
    } catch (error) {
      console.error('Error fetching formation:', error);
      await Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Erreur lors du chargement',
        confirmButtonColor: '#50b1aa'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));

    // Auto-generate slug from title
    if (name === 'title') {
      const slug = value
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
      
      setFormData(prev => ({ ...prev, slug }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const token = localStorage.getItem('academy_token');
      const response = await fetch(`/api/admin/formations/${formationId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        await Swal.fire({
          icon: 'success',
          title: 'Formation modifiée!',
          text: 'La formation a été modifiée avec succès',
          confirmButtonColor: '#50b1aa',
          timer: 2000
        });
        router.push('/fr/academy/admin/formations');
      } else {
        const error = await response.json();
        await Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: error.error || 'Erreur lors de la modification',
          confirmButtonColor: '#50b1aa'
        });
      }
    } catch (error) {
      console.error('Error updating formation:', error);
      await Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Erreur lors de la modification',
        confirmButtonColor: '#50b1aa'
      });
    } finally {
      setSaving(false);
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

      <h1 className="text-3xl font-bold text-gray-900 mb-8">Modifier la formation</h1>

      {/* Content Management */}
      <div className="mb-6 p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
        <h2 className="text-lg! font-semibold text-gray-900 mb-3">Gestion du contenu</h2>
        <Link
          href={`/fr/academy/admin/formations/${formationId}/modules`}
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#50b1aa] text-white rounded-lg hover:bg-[#449990] transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <span>Gérer les modules et leçons</span>
        </Link>
        <p className="text-sm text-gray-600 mt-2">Ajoutez des modules, leçons vidéo Vimeo et quiz</p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-3xl">
        <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Titre *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#50b1aa] focus:border-transparent text-gray-900"
              placeholder="Ex: Academy Client"
            />
          </div>

          {/* Slug */}
          <div>
            <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-2">
              Slug *
            </label>
            <input
              type="text"
              id="slug"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#50b1aa] focus:border-transparent text-gray-900"
              placeholder="academy-client"
            />
            <p className="text-xs text-gray-500 mt-1">
              URL unique (généré automatiquement depuis le titre)
            </p>
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#50b1aa] focus:border-transparent text-gray-900"
              placeholder="Description de la formation..."
            />
          </div>

          {/* Target Role */}
          <div>
            <label htmlFor="targetRole" className="block text-sm font-medium text-gray-700 mb-2">
              Public cible *
            </label>
            <select
              id="targetRole"
              name="targetRole"
              value={formData.targetRole}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#50b1aa] focus:border-transparent text-gray-900"
            >
              <option value="CLIENT">Client</option>
              <option value="EMPLOYEE">Employé</option>
              <option value="BOTH">Les deux</option>
            </select>
          </div>

          {/* Difficulty Level */}
          <div>
            <label htmlFor="difficultyLevel" className="block text-sm font-medium text-gray-700 mb-2">
              Niveau de difficulté *
            </label>
            <select
              id="difficultyLevel"
              name="difficultyLevel"
              value={formData.difficultyLevel}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#50b1aa] focus:border-transparent text-gray-900"
            >
              <option value="BEGINNER">Débutant</option>
              <option value="INTERMEDIATE">Intermédiaire</option>
              <option value="ADVANCED">Avancé</option>
            </select>
          </div>

          {/* Duration */}
          <div>
            <label htmlFor="durationHours" className="block text-sm font-medium text-gray-700 mb-2">
              Durée (heures)
            </label>
            <input
              type="number"
              id="durationHours"
              name="durationHours"
              value={formData.durationHours}
              onChange={handleChange}
              step="0.5"
              min="0"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#50b1aa] focus:border-transparent text-gray-900"
              placeholder="10"
            />
          </div>

          {/* Price */}
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
              Prix
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                step="0.01"
                min="0"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#50b1aa] focus:border-transparent text-gray-900"
                placeholder="0"
              />
              <select
                name="currency"
                value={formData.currency}
                onChange={handleChange}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#50b1aa] focus:border-transparent text-gray-900"
              >
                <option value="MAD">MAD</option>
                <option value="EUR">EUR</option>
                <option value="USD">USD</option>
              </select>
            </div>
          </div>

          {/* Published */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isPublished"
              name="isPublished"
              checked={formData.isPublished}
              onChange={handleChange}
              className="w-4 h-4 text-[#50b1aa] border-gray-300 rounded focus:ring-[#50b1aa]"
            />
            <label htmlFor="isPublished" className="text-sm font-medium text-gray-700">
              Publier
            </label>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex gap-4">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-6 py-3 bg-[#50b1aa] text-white rounded-lg hover:bg-[#449990] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="w-5 h-5" />
            <span>{saving ? 'Enregistrement...' : 'Enregistrer'}</span>
          </button>
          <Link
            href="/fr/academy/admin/formations"
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Annuler
          </Link>
        </div>
      </form>
    </div>
  );
}

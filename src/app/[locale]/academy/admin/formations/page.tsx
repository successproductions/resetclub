'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Eye, BookOpen } from 'lucide-react';
import Swal from 'sweetalert2';

interface Formation {
  id: string;
  title: string;
  slug: string;
  targetRole: string;
  isPublished: boolean;
  _count?: {
    modules: number;
  };
}

export default function FormationsListPage() {
  const [formations, setFormations] = useState<Formation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFormations();
  }, []);

  const fetchFormations = async () => {
    try {
      const token = localStorage.getItem('academy_token');
      const response = await fetch('/api/admin/formations', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setFormations(data.formations || []);
      }
    } catch (error) {
      console.error('Error fetching formations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    const result = await Swal.fire({
      title: 'Êtes-vous sûr?',
      text: `Supprimer "${title}" ? Cette action est irréversible!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler'
    });

    if (!result.isConfirmed) {
      return;
    }

    try {
      const token = localStorage.getItem('academy_token');
      const response = await fetch(`/api/admin/formations/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        setFormations(formations.filter(f => f.id !== id));
        await Swal.fire({
          icon: 'success',
          title: 'Supprimée!',
          text: 'La formation a été supprimée avec succès',
          confirmButtonColor: '#50b1aa',
          timer: 2000
        });
      } else {
        await Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Erreur lors de la suppression',
          confirmButtonColor: '#50b1aa'
        });
      }
    } catch (error) {
      console.error('Error deleting formation:', error);
      await Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Erreur lors de la suppression',
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
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Formations</h1>
          <p className="text-gray-600 mt-1">Gérez vos formations Academy Client et Academy Terapot</p>
        </div>
        <Link
          href="/fr/academy/admin/formations/new"
          className="flex items-center gap-2 px-4 py-2 bg-[#50b1aa] text-white rounded-lg hover:bg-[#449990] transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Nouvelle formation</span>
        </Link>
      </div>

      {formations.length === 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Aucune formation</h3>
          <p className="text-gray-600 mb-6">Commencez par créer votre première formation</p>
          <Link
            href="/fr/academy/admin/formations/new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#50b1aa] text-white rounded-lg hover:bg-[#449990] transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>Créer une formation</span>
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Formation
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cible
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Modules
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {formations.map((formation) => (
                <tr key={formation.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-gray-900">{formation.title}</div>
                      <div className="text-sm text-gray-500">{formation.slug}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded ${
                      formation.targetRole === 'CLIENT' 
                        ? 'bg-blue-100 text-blue-800'
                        : formation.targetRole === 'EMPLOYEE'
                        ? 'bg-purple-100 text-purple-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {formation.targetRole}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {formation._count?.modules || 0} module(s)
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded ${
                      formation.isPublished 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {formation.isPublished ? 'Publié' : 'Brouillon'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/fr/academy/formations/${formation.id}`}
                        className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                        title="Voir"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <Link
                        href={`/fr/academy/admin/formations/${formation.id}`}
                        className="p-2 text-gray-400 hover:text-[#50b1aa] transition-colors"
                        title="Modifier"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(formation.id, formation.title)}
                        className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                        title="Supprimer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

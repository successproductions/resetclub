'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  User,
  Mail,
  Lock,
  Save,
  Home,
  Library,
  Award,
  LogOut,
  Globe,
  Eye,
  EyeOff,
  Camera,
  Shield
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

export default function AcademyProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('academy_token');
    const userData = localStorage.getItem('academy_user');

    if (process.env.NODE_ENV === 'development' && !token) {
      const devUser = {
        id: 'dev-user',
        email: 'dev@resetclub.ma',
        firstName: 'Dev',
        lastName: 'User',
        role: 'CLIENT',
        avatarUrl: null
      };
      setUser(devUser);
      setFirstName(devUser.firstName || '');
      setLastName(devUser.lastName || '');
      setEmail(devUser.email);
      setIsLoading(false);
      return;
    }

    if (!token || !userData) {
      router.push('/academy/login');
      return;
    }

    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);
    setFirstName(parsedUser.firstName || '');
    setLastName(parsedUser.lastName || '');
    setEmail(parsedUser.email);
    setIsLoading(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('academy_token');
    localStorage.removeItem('academy_user');
    router.push('/academy/login');
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    console.log('Starting avatar upload...', file.name);
    
    const formData = new FormData();
    formData.append('avatar', file);

    try {
      const token = localStorage.getItem('academy_token');
      console.log('Token:', token ? 'exists' : 'missing');
      
      const response = await fetch('/api/auth/upload-avatar', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      const data = await response.json();
      console.log('Upload response:', response.status, data);

      if (!response.ok) {
        setError(data.error || 'Erreur lors du téléchargement');
        console.error('Upload failed:', data);
        return;
      }

      console.log('Upload successful! Avatar URL:', data.avatarUrl);
      console.log('Updated user:', data.user);
      
      setMessage('Photo de profil mise à jour !');
      setUser(data.user);
      setImageError(false); // Reset error state
      localStorage.setItem('academy_user', JSON.stringify(data.user));
      
      // Force re-render
      setTimeout(() => {
        setMessage('');
        console.log('Current user state:', data.user);
      }, 3000);
    } catch (err) {
      console.error('Upload error:', err);
      setError('Erreur de connexion');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setIsSaving(true);

    try {
      const token = localStorage.getItem('academy_token');

      // Update profile info (name, email)
      const profileResponse = await fetch('/api/auth/update-profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ firstName, lastName, email })
      });

      const profileData = await profileResponse.json();

      if (!profileResponse.ok) {
        setError(profileData.error || 'Erreur lors de la mise à jour');
        setIsSaving(false);
        return;
      }

      // Update local storage with new user data
      setUser(profileData.user);
      localStorage.setItem('academy_user', JSON.stringify(profileData.user));

      // Change password if provided
      if (currentPassword && newPassword) {
        const passwordResponse = await fetch('/api/auth/change-password', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ currentPassword, newPassword })
        });

        const passwordData = await passwordResponse.json();

        if (!passwordResponse.ok) {
          setError(passwordData.error || 'Erreur lors du changement de mot de passe');
          setIsSaving(false);
          return;
        }

        // Clear password fields
        setCurrentPassword('');
        setNewPassword('');
      }

      setMessage('Profil mis à jour avec succès !');
      setIsSaving(false);
      setTimeout(() => setMessage(''), 3000);

    } catch {
      setError('Erreur de connexion. Veuillez réessayer.');
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#51b1aa] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-graphik">
      {/* Top Navigation Bar */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="h-14 flex items-center justify-between px-4">
          <div className="relative w-24 h-8">
            <Image
              src="/images/master/MASTERCLASSLOGO2.png"
              alt="RESET Club Academy"
              fill
              className="object-contain"
            />
          </div>

          <div className="flex items-center">
            <button className="flex items-center gap-1 px-3 py-2 hover:bg-gray-100 transition-colors">
              <Globe className="w-4 h-4 text-gray-600" />
              <span className="text-sm text-gray-700 font-medium">FR</span>
            </button>

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

      {/* Main Layout */}
      <div className="flex">
        {/* Sidebar */}
        <aside className={`${isSidebarCollapsed ? 'w-16' : 'w-56'} bg-white border-r border-gray-200 h-[calc(100vh-3.5rem)] fixed left-0 top-14 transition-all duration-300`}>
          <nav className="py-2 h-full flex flex-col">
            <button
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center' : 'justify-start pl-4'} py-3 text-gray-600 hover:bg-gray-100 transition-colors mb-2`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            <div>
              <button
                onClick={() => router.push('/academy/dashboard')}
                className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center' : 'gap-3'} px-4 py-3 text-sm font-medium transition-colors border-l-4 border-transparent text-gray-700 hover:bg-gray-50`}
                title="Accueil"
              >
                <Home className="w-5 h-5" />
                {!isSidebarCollapsed && <span>Accueil</span>}
              </button>

              <button
                onClick={() => router.push('/academy/formations')}
                className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center' : 'gap-3'} px-4 py-3 text-sm font-medium transition-colors border-l-4 border-transparent text-gray-700 hover:bg-gray-50`}
                title="Mes Formations"
              >
                <Library className="w-5 h-5" />
                {!isSidebarCollapsed && <span>Mes Formations</span>}
              </button>

              <button
                onClick={() => router.push('/academy/certificates')}
                className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center' : 'gap-3'} px-4 py-3 text-sm font-medium transition-colors border-l-4 border-transparent text-gray-700 hover:bg-gray-50`}
                title="Certificats"
              >
                <Award className="w-5 h-5" />
                {!isSidebarCollapsed && <span>Certificats</span>}
              </button>
            </div>

            <div className="flex-1"></div>

            <div className="border-t border-gray-200">
              <button
                className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center' : 'gap-3'} px-4 py-3 text-sm font-medium border-l-4 border-[#51b1aa] bg-gray-50 text-gray-900`}
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

        {/* Main Content */}
        <main className={`flex-1 ${isSidebarCollapsed ? 'ml-16' : 'ml-56'} p-6 transition-all duration-300`}>
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Paramètres du compte</h1>
              <p className="text-gray-600">Gère tes informations personnelles et la sécurité de ton compte</p>
            </div>

            {/* Messages */}
            {message && (
              <div className="mb-6 bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 rounded-r-lg p-4 shadow-sm">
                <p className="text-green-700 font-medium flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {message}
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Profile Card */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-24">
                  <div className="text-center">
                    <div className="relative inline-block mb-4">
                      <div className="w-24 h-24 bg-gradient-to-br from-[#51b1aa] to-[#91dbd3] rounded-full flex items-center justify-center shadow-lg overflow-hidden relative">
                        {user?.avatarUrl && !imageError ? (
                          <img
                            src={user.avatarUrl}
                            alt="Profile"
                            className="w-full h-full object-cover"
                            onError={() => {
                              console.error('Failed to load avatar:', user.avatarUrl);
                              setImageError(true);
                            }}
                          />
                        ) : (
                          <span className="text-white text-3xl font-bold">
                            {user?.firstName?.[0] || user?.email[0].toUpperCase()}
                          </span>
                        )}
                      </div>
                      <input
                        type="file"
                        id="avatar-upload"
                        accept="image/jpeg,image/jpg,image/png,image/webp"
                        onChange={handleAvatarUpload}
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => document.getElementById('avatar-upload')?.click()}
                        className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg border-2 border-gray-200 hover:border-[#51b1aa] transition-colors"
                      >
                        <Camera className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">
                      {firstName && lastName ? `${firstName} ${lastName}` : 'Utilisateur'}
                    </h2>
                    <p className="text-gray-500 text-sm mb-4">{email}</p>
                    <div className="inline-flex items-center gap-1 px-3 py-1 bg-[#51b1aa]/10 text-[#51b1aa] rounded-full text-sm font-medium">
                      <Shield className="w-4 h-4" />
                      Compte {user?.role === 'ADMIN' ? 'Admin' : 'Standard'}
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Formations inscrites</span>
                        <span className="font-semibold text-gray-900">0</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Certificats obtenus</span>
                        <span className="font-semibold text-gray-900">0</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Membre depuis</span>
                        <span className="font-semibold text-gray-900">2025</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Forms */}
              <div className="lg:col-span-2 space-y-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Info */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 bg-[#51b1aa]/10 rounded-lg flex items-center justify-center">
                        <User className="w-5 h-5 text-[#51b1aa]" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">Informations personnelles</h3>
                        <p className="text-sm text-gray-500">Mets à jour ton nom et prénom</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Prénom</label>
                        <input
                          type="text"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#51b1aa] focus:border-transparent transition-all"
                          placeholder="Ton prénom"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Nom</label>
                        <input
                          type="text"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#51b1aa] focus:border-transparent transition-all"
                          placeholder="Ton nom"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                        <Mail className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">Adresse email</h3>
                        <p className="text-sm text-gray-500">Utilisée pour la connexion et les notifications</p>
                      </div>
                    </div>

                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="ton.email@example.com"
                    />
                  </div>

                  {/* Password */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                        <Lock className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">Sécurité</h3>
                        <p className="text-sm text-gray-500">Change ton mot de passe</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Mot de passe actuel</label>
                        <div className="relative">
                          <input
                            type={showCurrentPassword ? 'text' : 'password'}
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            className="w-full px-4 py-2.5 pr-12 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                            placeholder="••••••••"
                          />
                          <button
                            type="button"
                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Nouveau mot de passe</label>
                        <div className="relative">
                          <input
                            type={showNewPassword ? 'text' : 'password'}
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full px-4 py-2.5 pr-12 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                            placeholder="••••••••"
                          />
                          <button
                            type="button"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Save Button */}
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={isSaving}
                      className="bg-gradient-to-r from-[#51b1aa] to-[#91dbd3] hover:from-[#449990] hover:to-[#51b1aa] text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center gap-2 shadow-md"
                    >
                      {isSaving ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Enregistrement...</span>
                        </>
                      ) : (
                        <>
                          <Save className="w-5 h-5" />
                          <span>Enregistrer les modifications</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

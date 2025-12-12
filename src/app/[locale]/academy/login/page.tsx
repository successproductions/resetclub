'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';
import Image from 'next/image';

export default function AcademyLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Une erreur s&apos;est produite');
        setIsLoading(false);
        return;
      }

      // Store token in localStorage
      localStorage.setItem('academy_token', data.token);
      localStorage.setItem('academy_user', JSON.stringify(data.user));

      // Redirect to dashboard
      router.push('/academy/dashboard');
    } catch {
      setError('Erreur de connexion. Veuillez réessayer.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white font-graphik">
      {/* Top Bar - LinkedIn Style */}
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="relative w-32 h-10">
            <Image
              src="/images/master/MASTERCLASSLOGO2.png"
              alt="RESET Club Academy"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>

      {/* Login Form Container */}
      <div className="flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Welcome Text */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-normal text-gray-900 mb-2">
              Bon retour !
            </h1>
            <p className="text-gray-600 text-sm">
              Connectez-vous pour accéder à vos formations
            </p>
          </div>

          {/* Login Form Card */}
          <div className="bg-white rounded-lg border border-gray-300 shadow-sm p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Adresse email
                </label>
                <div className="relative">
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#51b1aa] focus:ring-1 focus:ring-[#51b1aa] transition-all"
                    placeholder="exemple@email.com"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Mot de passe
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#51b1aa] focus:ring-1 focus:ring-[#51b1aa] transition-all"
                    placeholder="Mot de passe"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded p-3">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}

              {/* Forgot Password */}
              <div className="text-right">
                <button
                  type="button"
                  onClick={() => router.push('/academy/forgot-password')}
                  className="text-[#51b1aa] hover:text-[#449990] text-sm font-medium transition-colors"
                >
                  Mot de passe oublié ?
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#51b1aa] hover:bg-[#449990] text-white font-semibold py-3 px-6 rounded transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Connexion...</span>
                  </>
                ) : (
                  <span>SE CONNECTER</span>
                )}
              </button>
            </form>
          </div>

          {/* Help Text */}
          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              Vous n&apos;avez pas encore de compte ?
              <br />
              <span className="text-gray-500 text-xs mt-1 block">
                Les comptes sont créés automatiquement lors de l&apos;accès à une formation
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

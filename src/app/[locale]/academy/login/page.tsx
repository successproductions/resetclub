'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';
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

      localStorage.setItem('academy_token', data.token);
      localStorage.setItem('academy_user', JSON.stringify(data.user));
      
      // Redirect based on user role
      if (data.user.role === 'ADMIN') {
        router.push('/academy/admin/formations');
      } else {
        router.push('/academy/dashboard');
      }
    } catch {
      setError('Erreur de connexion. Veuillez réessayer.');
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-white font-graphik flex">
      {/* Left Side - Image Only */}
      <div className="hidden md:block md:w-1/2 relative">
        <Image
          src="/images/RESET2.png"
          alt="Academy Background"
          fill
          className="object-cover"
        />
      </div>

      {/* Right Side - Logo + Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12 bg-white">
        <div className="w-full max-w-md">
          {/* Logo at Top */}
          <div className="text-center mb-8">
            <div className="relative w-40 h-16 mx-auto mb-4">
              <Image
                src="/images/master/MASTERCLASSLOGO2.png"
                alt="RESET Club Academy"
                fill
                className="object-contain"
              />
            </div>
            <p className="text-gray-600 text-sm">
              Connecte-toi pour accéder à tes formations
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Adresse email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-[#51b1aa] transition-all duration-300"
                placeholder="ton.email@example.com"
              />
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Mot de passe
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 pr-12 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-[#51b1aa] transition-all duration-300"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-[#51b1aa] transition-colors"
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
              <div className="bg-red-500/10 border-2 border-red-500/50 rounded-lg p-3">
                <p className="text-red-600 text-sm text-center">{error}</p>
              </div>
            )}

            {/* Forgot Password */}
            <div className="text-right">
              <button
                type="button"
                onClick={() => router.push('/academy/forgot-password')}
                className="text-[#51b1aa] hover:text-[#91dbd3] text-sm font-medium transition-colors"
              >
                Mot de passe oublié ?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-[#51b1aa] to-[#91dbd3] hover:from-[#91dbd3] hover:to-[#51b1aa] text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2 shadow-lg shadow-[#51b1aa]/50"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Connexion...</span>
                </>
              ) : (
                <>
                  <span>SE CONNECTER</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {/* Help Text */}
          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              Tu n&apos;as pas encore de compte ?
              <br />
              <span className="text-gray-500 text-xs mt-1 block">
                Les comptes sont créés automatiquement lors de l&apos;accès à une master-class
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

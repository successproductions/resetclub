'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// CMI fee: 2.97% — applied server-side but declared here for reference
const RESET_CLUB_AMOUNT_MAD = 1500; // Base price in MAD — adjust as needed

export default function PaymentPage() {
  const t = useTranslations('PaymentPage');
  const searchParams = useSearchParams();
  const hasError = searchParams.get('error') === '1';

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(hasError ? 'Votre paiement a échoué. Veuillez réessayer.' : '');
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');

    try {
      // Generate unique order ID
      const orderId = `RC-${Date.now().toString(36)}${Math.random().toString(36).substring(2, 7)}`.toUpperCase();

      // Apply 2.97% CMI fee
      const totalAmount = Math.ceil(RESET_CLUB_AMOUNT_MAD * 1.0297 * 100) / 100;

      const res = await fetch('/api/payment/initiate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName:  formData.fullName,
          email:     formData.email,
          phone:     formData.phone,
          address:   formData.address,
          city:      formData.city,
          amount:    totalAmount,
          orderId:   orderId,
          pageSlug:  'fr/payment',
        }),
      });

      const data = await res.json();

      if (data.success) {
        // Build hidden form and POST to CMI gateway
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = data.gatewayUrl;

        Object.entries(data.params).forEach(([key, value]) => {
          const input = document.createElement('input');
          input.type  = 'hidden';
          input.name  = key;
          input.value = value as string;
          form.appendChild(input);
        });

        document.body.appendChild(form);
        form.submit(); // User redirected to CMI payment page
      } else {
        setErrorMsg('Erreur lors de l\'initialisation du paiement. Veuillez réessayer.');
        setIsLoading(false);
      }
    } catch (err) {
      console.error('Payment error:', err);
      setErrorMsg('Une erreur est survenue. Veuillez réessayer.');
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />

      {/* Video Header Section */}
      <div className="relative pt-28 pb-10 md:pb-16 min-h-[38vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover  "
          >
            <source src="/videos/website-banner-vdo.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/30"></div>
        </div>

       
      </div>

      <main className="min-h-[80vh] bg-white py-8 md:py-8 px-6">
        <div className="max-w-2xl mx-auto">
 <div className="relative z-10 text-center px-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-graphik font-normal tracking-wide mb-4 text-gray-900 drop-shadow-lg">
            RESET CLUB
          </h1>
        </div>
          {/* Warning Message */}
          <div className="bg-white  mb-2 md:mb-6 flex items-start gap-3">
            <div className="flex-shrink-0 mt-1">
              <svg
                className="w-6 h-6 text-gray-900"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="12" r="10" strokeWidth="2"/>
                <line x1="12" y1="8" x2="12" y2="13" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="12" cy="16" r="0.5" fill="currentColor" stroke="none"/>
              </svg>
            </div>
            <p className="text-gray-900 text-lg font-graphik">
              {t('warning')}
            </p>
          </div>

          {/* Step Indicator */}
          <div className="mb-3 md:mb-8 ">
            <p className="text-center text-gray-900 text-lg md:text-xl mb-2 md:mb-4 font-graphik">
              {t('step')}
            </p>
            <div className="flex items-center gap-2 max-w-md mx-auto">
              <div className="flex-1 h-1 bg-gray-500"></div>
              <div className="flex-1 h-1 bg-gray-300"></div>
            </div>
          </div>

          {/* Main Content */}
          <div className="text-center mb-2 md:mb-8">
            <h2 className="text-3xl md:text-5xl font-serif font-normal text-gray-900 mb-2 md:mb-6 leading-tight">
              {t('title')}
            </h2>
            <p className="text-lg text-gray-900 font-normal mb-2 md:mb-6 font-graphik">
              {t('subtitle')}
            </p>
            <p className="text-lg text-gray-900 font-normal mb-2 md:mb-8 font-graphik">
              {t('availableSlots')}
            </p>
          </div>

          {/* Error Message */}
          {errorMsg && (
            <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 text-red-700 text-sm font-graphik">
              {errorMsg}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-2 mb-2 md:mb-6">
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder={t('form.fullName')}
              required
              disabled={isLoading}
              className="w-full px-6 py-3 md:py-4 border border-[#3c3c3c] text-base focus:outline-none focus:border-gray-400 bg-white text-gray-900 placeholder-gray-400 font-graphik disabled:opacity-60"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={t('form.email')}
              required
              disabled={isLoading}
              className="w-full px-6 py-3 md:py-4 border border-[#3c3c3c] text-base focus:outline-none focus:border-gray-400 bg-white text-gray-900 placeholder-gray-400 font-graphik disabled:opacity-60"
            />

            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder={t('form.phone')}
              required
              disabled={isLoading}
              className="w-full px-6 py-3 md:py-4 border border-[#3c3c3c] text-base focus:outline-none focus:border-gray-400 bg-white text-gray-900 placeholder-gray-400 font-graphik disabled:opacity-60"
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder={t('form.address')}
                required
                disabled={isLoading}
                className="w-full px-6 py-3 md:py-4 border border-[#3c3c3c] text-base focus:outline-none focus:border-gray-400 bg-white text-gray-900 placeholder-gray-400 font-graphik disabled:opacity-60"
              />
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder={t('form.city')}
                required
                disabled={isLoading}
                className="w-full px-6 py-3 md:py-4 border border-[#3c3c3c] text-base focus:outline-none focus:border-gray-400 bg-white text-gray-900 placeholder-gray-400 font-graphik disabled:opacity-60"
              />
            </div>

            <label className="flex items-start gap-3 py-3 text-left font-graphik text-sm text-gray-800">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={(event) => setTermsAccepted(event.target.checked)}
                disabled={isLoading}
                required
                className="mt-1 h-4 w-4 accent-black disabled:opacity-60"
              />
              <span>
                J&apos;ai lu et j&apos;accepte les{' '}
                <Link href="/fr/cgv" target="_blank" className="underline underline-offset-2 hover:text-black">
                  Conditions Générales de Vente
                </Link>
                .
              </span>
            </label>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || !termsAccepted}
              className="w-full bg-black border border-[#3c3c3c] text-white py-5 text-lg font-medium hover:bg-[#1d1c1c] hover:text-gray-200 transition-colors duration-300 mt-1 md:mt-8 font-graphik disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Redirection vers le paiement...' : t('form.submit')}
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}

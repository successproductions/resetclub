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

  const inputClassName = 'w-full rounded-[4px] border border-[#d8cec4] bg-white px-5 py-4 font-graphik text-base text-gray-950 placeholder:text-gray-500 transition-colors focus:border-[#5b5148] focus:outline-none focus:ring-2 focus:ring-[#cbb9a7]/30 disabled:opacity-60';

  return (
    <>
      <Header />

      <div className="relative min-h-[34vh] overflow-hidden pt-28 md:min-h-[42vh]">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/videos/website-banner-vdo.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/45"></div>
        <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center px-6 py-14 text-center text-white md:py-20">
          <p className="mb-4 font-graphik text-xs uppercase tracking-[0.32em] text-white/70">
            {t('securePayment')}
          </p>
          <h1 className="font-graphik text-4xl font-normal tracking-wide md:text-6xl">
            RESET CLUB
          </h1>
        </div>
      </div>

      <main className="bg-[#f7f3ee] px-5 py-10 md:px-8 md:py-16">
        <section className="mx-auto grid max-w-6xl overflow-hidden rounded-[8px] border border-[#ded4ca] bg-white shadow-2xl shadow-black/10 md:grid-cols-[0.95fr_1.05fr]">
          <div className="bg-[#fbf8f4] p-6 md:p-10 lg:p-12">
            <p className="mb-5 font-graphik text-base text-[#5b5148] md:text-lg">
              {t('step')}
            </p>
            <div className="mb-8 flex max-w-sm items-center gap-2">
              <div className="h-1 flex-1 bg-[#5b5148]"></div>
              <div className="h-1 flex-1 bg-[#d7cec4]"></div>
            </div>
            <h2 className="mb-6 font-serif text-3xl font-normal leading-[1.05] text-gray-950 md:text-4xl!">
              {t('title')}
            </h2>
            <p className="mb-5 font-graphik text-base leading-relaxed text-gray-700 md:text-lg">
              {t('subtitle')}
            </p>
            <p className="mb-9 font-graphik text-base  text-gray-950 md:text-lg">
              {t('availableSlots')}
            </p>

            <div className="border-t border-[#d8cec4] pt-6">
              <p className="font-graphik text-base leading-relaxed text-gray-700 md:text-lg">
                {t('warning')}
              </p>
            </div>
          </div>

          <div className="p-6 md:p-10 lg:p-12">
            <div className="mx-auto w-full max-w-[620px]">
              <div className="mb-8 flex items-end justify-between border-b border-[#d8cec4] pb-5">
                <div>
                  <p className="font-graphik text-xs uppercase tracking-[0.22em] text-[#7b7066]">
                    RESET CLUB
                  </p>
                  <p className="mt-1 font-graphik text-sm text-gray-600">
                    {t('securePayment')}
                  </p>
                </div>
                <p className="font-graphik text-2xl font-medium text-gray-950">
                  {RESET_CLUB_AMOUNT_MAD} MAD
                </p>
              </div>

              {errorMsg && (
                <div className="mb-6 border border-red-200 bg-red-50 px-4 py-3 font-graphik text-sm text-red-700">
                  {errorMsg}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder={t('form.fullName')}
                  required
                  disabled={isLoading}
                  className={inputClassName}
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t('form.email')}
                  required
                  disabled={isLoading}
                  className={inputClassName}
                />

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder={t('form.phone')}
                  required
                  disabled={isLoading}
                  className={inputClassName}
                />

                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder={t('form.address')}
                    required
                    disabled={isLoading}
                    className={inputClassName}
                  />
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder={t('form.city')}
                    required
                    disabled={isLoading}
                    className={inputClassName}
                  />
                </div>

                <label className="flex items-start gap-3 py-3 text-left font-graphik text-sm leading-relaxed text-gray-800">
                  <input
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={(event) => setTermsAccepted(event.target.checked)}
                    disabled={isLoading}
                    required
                    className="mt-1 h-4 w-4 accent-[#5b5148] disabled:opacity-60"
                  />
                  <span>
                    J&apos;ai lu et j&apos;accepte les{' '}
                    <Link href="/fr/cgv" target="_blank" className="underline underline-offset-2 hover:text-black">
                      Conditions Générales de Vente
                    </Link>
                    .
                  </span>
                </label>

                <button
                  type="submit"
                  disabled={isLoading || !termsAccepted}
                  className="mt-4 w-full rounded-[4px] bg-[#111111] py-4 font-graphik text-base font-medium text-white transition-colors duration-300 hover:bg-[#5b5148] disabled:cursor-not-allowed disabled:opacity-70 md:py-5 md:text-lg"
                >
                  {isLoading ? 'Redirection vers le paiement...' : t('form.submit')}
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

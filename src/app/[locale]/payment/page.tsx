'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { getBasePriceMad } from '@/lib/pricing';

// Display only — the amount actually charged is recomputed in the API route.
const RESET_CLUB_AMOUNT_MAD = getBasePriceMad();

const TOP_COUNTRIES = [
  { code: '+212', label: '🇲🇦 +212' },
  { code: '+33', label: '🇫🇷 +33' },
  { code: '+34', label: '🇪🇸 +34' },
  { code: '+32', label: '🇧🇪 +32' },
  { code: '+1', label: '🇺🇸 +1' },
  { code: '+44', label: '🇬🇧 +44' },
  { code: '+49', label: '🇩🇪 +49' },
  { code: '+39', label: '🇮🇹 +39' },
  { code: '+31', label: '🇳🇱 +31' },
  { code: '+41', label: '🇨🇭 +41' },
  { code: '+971', label: '🇦🇪 +971' },
  { code: '+966', label: '🇸🇦 +966' },
  { code: '+974', label: '🇶🇦 +974' },
  { code: '+213', label: '🇩🇿 +213' },
  { code: '+216', label: '🇹🇳 +216' },
  { code: '+221', label: '🇸🇳 +221' },
  { code: '+225', label: '🇨🇮 +225' },
  { code: '+86', label: '🇨🇳 +86' },
  { code: '+81', label: '🇯🇵 +81' },
  { code: '+61', label: '🇦🇺 +61' },
];

export default function PaymentPage() {
  const t = useTranslations('PaymentPage');
  const ts = useTranslations('PaymentPage.step1');
  const searchParams = useSearchParams();
  const hasError = searchParams.get('error') === '1';

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    countryCode: '+212',
    address: '',
    city: ''
  });
  const [step, setStep] = useState<1 | 2>(hasError ? 2 : 1);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(hasError ? 'Votre paiement a échoué. Veuillez réessayer.' : '');
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const goToPayment = () => {
    setStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');

    try {
      // Generate unique order ID
      const orderId = `RC-${Date.now().toString(36)}${Math.random().toString(36).substring(2, 7)}`.toUpperCase();

      const res = await fetch('/api/payment/initiate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: `${formData.countryCode} ${formData.phone}`,
          address: formData.address,
          city: formData.city,
          orderId: orderId,
          pageSlug: 'fr/payment',
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
          input.type = 'hidden';
          input.name = key;
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

  const formattedPrice = RESET_CLUB_AMOUNT_MAD.toLocaleString('fr-FR');

  const progressBar = (
    <div className="mb-8 flex max-w-sm items-center gap-2">
      {[1, 2, 3].map((index) => (
        <div
          key={index}
          className={`h-1 flex-1 ${index <= step ? 'bg-[#5b5148]' : 'bg-[#d7cec4]'}`}
        ></div>
      ))}
    </div>
  );

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
        {step === 1 ? (
          <section className="mx-auto grid max-w-6xl overflow-hidden rounded-[8px] border border-[#ded4ca] bg-white shadow-2xl shadow-black/10 md:grid-cols-2">
            <div className="order-2 p-6 md:order-1 md:p-10 lg:p-9">
              <p className="mb-1 font-graphik text-base text-[#5b5148] md:text-lg">
                {ts('step')}
              </p>
              {progressBar}
              <h2 className="mb-2 font-serif text-3xl font-normal leading-[1.05] text-gray-950 md:text-4xl!">
                {ts('title')}
              </h2>
              <p className="mb-2 font-graphik text-base leading-relaxed text-gray-700 md:text-lg">
                {ts('intro')}
              </p>
              <p className="mb-2 font-graphik text-base leading-relaxed text-gray-700 md:text-lg">
                {ts('body')}
              </p>
              <p className="mb-2 font-graphik text-base leading-relaxed text-gray-950 md:text-lg">
                {ts('secret')}
              </p>
              <p className="mb-2 font-graphik text-base leading-relaxed text-gray-700 md:text-lg">
                {ts('report')}
              </p>
              <p className="mb-2 font-graphik text-base text-gray-950 md:text-lg">
                {ts('summary', { price: formattedPrice })}
              </p>

              <button
                type="button"
                onClick={goToPayment}
                className="w-full rounded-[4px] bg-[#111111] py-4 font-graphik text-base font-medium text-white transition-colors duration-300 hover:bg-[#5b5148] md:py-5 md:text-lg"
              >
                {ts('cta')}
              </button>

              <p className="mt-6 border-t border-[#d8cec4] pt-6 font-graphik text-base leading-relaxed text-gray-700 md:text-lg">
                {ts('reassurance')}
              </p>
            </div>

            <div className="relative order-1 h-56 md:order-2 md:h-auto md:min-h-[560px]">
              <Image
                src="/images/POPUP.jpg"
                alt={ts('imageAlt')}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>
          </section>
        ) : (
          <section className="mx-auto grid max-w-6xl overflow-hidden rounded-[8px] border border-[#ded4ca] bg-white shadow-2xl shadow-black/10 md:grid-cols-[0.95fr_1.05fr]">
            <div className="bg-[#fbf8f4] p-6 md:p-10 lg:p-12">
              <p className="mb-5 font-graphik text-base text-[#5b5148] md:text-lg">
                {t('step')}
              </p>
              {progressBar}
              <h2 className="mb-6 font-serif text-3xl font-normal leading-[1.05] text-gray-950 md:text-4xl!">
                {t('title')}
              </h2>
              <p className="mb-8 font-graphik text-base leading-relaxed text-gray-700 md:text-lg">
                {t('subtitle')}
              </p>

              <p className="mb-3 font-graphik text-xs uppercase tracking-[0.22em] text-[#7b7066]">
                {t('nextStepsTitle')}
              </p>
              <p className="mb-8 font-graphik text-base leading-relaxed text-gray-700 md:text-lg">
                {t('nextStepsBody')}
              </p>

              <p className="mb-9 font-graphik text-base text-gray-950 md:text-lg">
                {t('summary', { price: formattedPrice })}
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

                  <div className="flex gap-3">
                    <select
                      name="countryCode"
                      value={formData.countryCode}
                      onChange={handleChange}
                      disabled={isLoading}
                      className="w-[130px] flex-shrink-0 rounded-[4px] border border-[#d8cec4] bg-white px-3 py-4 font-graphik text-base text-gray-950 transition-colors focus:border-[#5b5148] focus:outline-none focus:ring-2 focus:ring-[#cbb9a7]/30 disabled:opacity-60 md:w-[150px]"
                    >
                      {TOP_COUNTRIES.map((country) => (
                        <option key={country.code} value={country.code}>
                          {country.label}
                        </option>
                      ))}
                    </select>
                    <div className="flex-1">
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
                    </div>
                  </div>

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
                    <span className='text-sm'>
                      J&apos;ai lu et j&apos;accepte les{' '}
                      <Link href="/fr/cgv" target="_blank" className="underline underline-offset-2 hover:text-black text-sm">
                        Conditions Générales de Vente
                      </Link>
                      .
                    </span>
                  </label>

                  <button
                    type="submit"
                    disabled={isLoading || !termsAccepted}
                    className="mt-2 w-full rounded-[4px] bg-[#111111] py-4 font-graphik text-base font-medium text-white transition-colors duration-300 hover:bg-[#5b5148] disabled:cursor-not-allowed disabled:opacity-70 md:py-5 md:text-lg"
                  >
                    {isLoading ? 'Redirection vers le paiement...' : t('form.submit')}
                  </button>
                </form>
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}

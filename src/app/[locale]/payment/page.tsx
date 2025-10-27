'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function PaymentPage() {
  const t = useTranslations('PaymentPage');
  const router = useRouter();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // TODO: Integrate with CMI payment gateway
    // For now, simulate payment and redirect to confirmation
    console.log('Payment data:', formData);

    // Simulate API call delay
    setTimeout(() => {
      router.push('/confirmation');
    }, 1000);
  };

  return (
    <>
      <Header />

      {/* Video Header Section */}
      <div className="relative pt-28 pb-10 md:pb-16 min-h-[30vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-40 blur-sm"
          >
            <source src="/videos/videobg.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/30"></div>
        </div>

       
      </div>

      <main className="min-h-[80vh] bg-white py-8 md:py-8 px-6">
        <div className="max-w-2xl mx-auto">
 <div className="relative z-10 text-center px-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-graphik font-normal tracking-wide mb-4 text-[#524029] drop-shadow-lg">
            RESET CLUB
          </h1>
        </div>
          {/* Warning Message */}
          <div className="bg-white border border-[#3c3c3c] p-4 mb-2 md:mb-6 flex items-start gap-3">
            <div className="flex-shrink-0 mt-1">
              <svg
                className="w-6 h-6 text-[#524029]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="12" r="10" strokeWidth="2"/>
                <line x1="12" y1="8" x2="12" y2="13" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="12" cy="16" r="0.5" fill="currentColor" stroke="none"/>
              </svg>
            </div>
            <p className="text-[#524029] text-base font-graphik">
              {t('warning')}
            </p>
          </div>

          {/* Step Indicator */}
          <div className="mb-3 md:mb-8 ">
            <p className="text-center text-[#524029] text-lg md:text-xl mb-2 md:mb-4 font-graphik">
              {t('step')}
            </p>
            <div className="flex items-center gap-2 max-w-md mx-auto">
              <div className="flex-1 h-1 bg-gray-500"></div>
              <div className="flex-1 h-1 bg-gray-300"></div>
            </div>
          </div>

          {/* Main Content */}
          <div className="text-center mb-2 md:mb-8">
            <h2 className="text-4xl md:text-5xl font-serif font-normal text-[#524029] mb-2 md:mb-6 leading-tight">
              {t('title')}
            </h2>
            <p className="text-xl text-[#524029] mb-2 md:mb-6 font-graphik">
              {t('subtitle')}
            </p>
            <p className="text-lg text-[#524029] font-medium mb-2 md:mb-8 font-graphik">
              {t('availableSlots')}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-2 mb-2 md:mb-6">
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder={t('form.fullName')}
              required
              className="w-full px-6 py-3 md:py-4 border border-[#3c3c3c] text-base focus:outline-none focus:border-gray-400 bg-white text-[#524029] placeholder-gray-400 font-graphik"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={t('form.email')}
              required
              className="w-full px-6 py-3 md:py-4 border border-[#3c3c3c] text-base focus:outline-none focus:border-gray-400 bg-white text-[#524029] placeholder-gray-400 font-graphik"
            />

            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder={t('form.phone')}
              required
              className="w-full px-6 py-3 md:py-4 border border-[#3c3c3c] text-base focus:outline-none focus:border-gray-400 bg-white text-[#524029] placeholder-gray-400 font-graphik"
            />

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#3c3c3c] border border-[#3c3c3c] text-white py-5 text-lg font-medium hover:bg-[#4a4848] hover:text-gray-200 transition-colors duration-300 mt-1 md:mt-8 font-graphik"
            >
              {t('form.submit')}
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}

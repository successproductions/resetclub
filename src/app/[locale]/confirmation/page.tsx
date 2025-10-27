'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function ConfirmationPage() {
  const t = useTranslations('ConfirmationPage');

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

      <main className="min-h-[60vh] bg-white flex items-center justify-center px-6 py-8 md:py-16">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Message */}
          <h1 className="text-3xl md:text-5xl font-graphik font-normal text-[#524029] mb-2 md:mb-6 leading-tight">
            {t('title')}
          </h1>

          <p className="text-lg text-[#524029] mb-2 md:mb-8 font-graphik">
            {t('subtitle')}
          </p>

          {/* Details Box */}
          <div className="bg-gray-50 p-6 md:p-8 mb-4 md:mb-8 md:text-left">
            <p className="text-lg text-[#524029] mb-4 font-graphik">
              <span className="font-medium">{t('duration.label')}:</span> {t('duration.value')}
            </p>
            <p className="text-lg text-[#524029] font-graphik">
              <span className="font-medium">{t('amount.label')}:</span> {t('amount.value')}
            </p>
          </div>

          {/* Additional Information */}
          <p className="text-lg text-[#524029] leading-relaxed mb-2 md:mb-8 font-graphik">
            {t('followUp')}
          </p>

          {/* Back to Home Button */}
          <Link
            href="/"
            className="inline-block bg-[#2c2c2c] text-white px-8 py-4 text-lg font-medium hover:bg-[#3c3c3c] transition-colors duration-300 font-graphik"
          >
            {t('backToHome')}
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}

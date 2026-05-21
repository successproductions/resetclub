'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Check, LockKeyhole } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// ─── helper ───────────────────────────────────────────────────────────────────

function formatDate(iso: string | null, locale: string): string {
  const dateLocale = locale === 'fr' ? 'fr-MA' : 'en-US';
  if (!iso) return new Date().toLocaleString(dateLocale, { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  try {
    return new Date(iso).toLocaleString(dateLocale, { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  } catch {
    return new Date().toLocaleString(dateLocale, { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  }
}

function formatAmount(raw: string | null, unavailableLabel: string): string {
  if (!raw) return unavailableLabel;
  const n = parseFloat(raw);
  if (isNaN(n)) return `${raw} MAD`;
  return n.toLocaleString('fr-MA', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' MAD';
}

// ─── inner component (uses useSearchParams – must be wrapped in Suspense) ─────

function ConfirmationContent() {
  const params   = useSearchParams();
  const t = useTranslations('ConfirmationPage');
  const locale = useLocale();
  const orderId  = params.get('order') || '—';
  const amount   = formatAmount(params.get('amount'), t('amount.unavailable'));
  const date     = formatDate(params.get('date'), locale);
  const code     = params.get('code') || '00';
  const transactionId = params.get('transaction') || '';

  return (
    <>
      <Header />

      {/* ── Video banner ── */}
      <div className="relative flex min-h-[28vh] items-center justify-center overflow-hidden pt-28 pb-10 md:min-h-[34vh] md:pb-16">
        <div className="absolute inset-0 z-0">
          <video autoPlay loop muted playsInline
            className="absolute inset-0 h-full w-full object-cover">
            <source src="/videos/website-banner-vdo.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/45" />
        </div>
      </div>

      {/* ── Main receipt section ── */}
      <main className="flex min-h-[72vh] items-start justify-center bg-[#f7f3ee] px-5 py-10 md:px-8 md:py-16">
        <div className="mx-auto w-full max-w-3xl">

          {/* Status badge */}
          <div className="flex justify-center mb-6">
            <span className="inline-flex items-center gap-3 rounded-[4px] border border-[#524029] bg-[#fbf8f4] px-5 py-3 font-graphik text-sm font-medium uppercase tracking-[0.16em] text-gray-950 shadow-sm">
              <Check className="h-4 w-4 text-[#524029]" strokeWidth={2.5} />
              {t('statusBadge')}
            </span>
          </div>

          {/* Title */}
          <h1 className="mb-3 text-center font-graphik text-3xl font-normal leading-tight text-gray-950 md:text-5xl">
            {t('title')}
          </h1>
          <p className="mb-8 text-center font-graphik text-base leading-relaxed text-[#5b5148] md:text-lg">
            {t('subtitle')}
          </p>

          {/* ── Transaction receipt card ── */}
          <div className="mb-8 overflow-hidden rounded-[8px] border border-[#ded4ca] bg-white shadow-2xl shadow-black/10">

            {/* Card header */}
            <div className="border-b border-[#d8cec4] bg-[#fbf8f4] px-6 py-5 md:px-8">
              <p className="mb-2 font-graphik text-xs uppercase tracking-[0.22em] text-[#7b7066]">{t('receiptEyebrow')}</p>
              <p className="font-graphik text-xl font-medium text-gray-950 md:text-2xl">
                {t('receiptTitle')}
              </p>
            </div>

            {/* Card rows */}
            <div className="divide-y divide-[#eee7df] bg-white">

              {/* Statut */}
              <div className="flex flex-col gap-2 px-6 py-4 md:flex-row md:items-center md:justify-between md:px-8">
                <span className="font-graphik text-sm text-[#7b7066]">{t('paymentStatus.label')}</span>
                <span className="flex items-center gap-2 font-graphik text-sm font-medium text-gray-950">
                  <span className="inline-block h-2 w-2 rounded-full bg-[#524029]" />
                  {t('paymentStatus.success', { code })}
                </span>
              </div>

              {/* Numéro de commande */}
              <div className="flex flex-col gap-2 px-6 py-4 md:flex-row md:items-center md:justify-between md:px-8">
                <span className="font-graphik text-sm text-[#7b7066]">{t('orderNumber')}</span>
                <span className="break-all font-graphik text-sm font-medium tracking-wide text-gray-950">{orderId}</span>
              </div>

              {transactionId && (
                <div className="flex flex-col gap-2 px-6 py-4 md:flex-row md:items-center md:justify-between md:px-8">
                  <span className="font-graphik text-sm text-[#7b7066]">{t('cmiTransactionNumber')}</span>
                  <span className="break-all font-graphik text-sm font-medium tracking-wide text-gray-950">{transactionId}</span>
                </div>
              )}

              {/* Date */}
              <div className="flex flex-col gap-2 px-6 py-4 md:flex-row md:items-center md:justify-between md:px-8">
                <span className="font-graphik text-sm text-[#7b7066]">{t('transactionDate')}</span>
                <span className="font-graphik text-sm font-medium text-gray-950">{date}</span>
              </div>

              {/* Service */}
              <div className="flex flex-col gap-2 px-6 py-4 md:flex-row md:items-center md:justify-between md:px-8">
                <span className="font-graphik text-sm text-[#7b7066]">{t('duration.label')}</span>
                <span className="font-graphik text-sm font-medium text-gray-950">{t('duration.value')}</span>
              </div>

              {/* Amount */}
              <div className="flex flex-col gap-2 bg-[#fbf8f4] px-6 py-6 md:flex-row md:items-center md:justify-between md:px-8">
                <span className="font-graphik text-base font-medium text-gray-950">{t('amount.label')}</span>
                <span className="font-graphik text-2xl font-medium text-gray-950">{amount}</span>
              </div>
            </div>

            {/* Secure footer */}
            <div className="flex items-center gap-2 border-t border-[#d8cec4] bg-[#f5efe8] px-6 py-4 md:px-8">
              <LockKeyhole className="h-4 w-4 shrink-0 text-[#7b7066]" strokeWidth={1.8} />
              <span className="font-graphik text-xs leading-relaxed text-[#7b7066]">{t('secureText')}</span>
            </div>
          </div>

          {/* Follow-up message */}
          <p className="mx-auto mb-8 max-w-2xl text-center font-graphik text-base leading-relaxed text-[#5b5148] md:text-lg">
            {t('followUp')}
          </p>

          {/* CTA */}
          <div className="flex justify-center">
            <Link
              href={`/${locale}`}
              className="inline-block border border-[#524029] bg-transparent px-8 py-4 font-graphik text-base font-medium text-gray-950 shadow-lg transition-all duration-300 hover:scale-105 hover:bg-gray-950 hover:text-white hover:shadow-xl md:text-lg"
            >
              {t('backToHome')}
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}

// ─── page export (Suspense required by Next.js for useSearchParams) ───────────

export default function ConfirmationPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <ConfirmationContent />
    </Suspense>
  );
}

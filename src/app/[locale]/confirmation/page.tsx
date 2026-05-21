'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// ─── helper ───────────────────────────────────────────────────────────────────

function formatDate(iso: string | null): string {
  if (!iso) return new Date().toLocaleString('fr-MA', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  try {
    return new Date(iso).toLocaleString('fr-MA', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  } catch {
    return new Date().toLocaleString('fr-MA', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  }
}

function formatAmount(raw: string | null): string {
  if (!raw) return 'Montant non disponible';
  const n = parseFloat(raw);
  if (isNaN(n)) return `${raw} MAD`;
  return n.toLocaleString('fr-MA', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' MAD';
}

// ─── inner component (uses useSearchParams – must be wrapped in Suspense) ─────

function ConfirmationContent() {
  const params   = useSearchParams();
  const orderId  = params.get('order') || '—';
  const amount   = formatAmount(params.get('amount'));
  const date     = formatDate(params.get('date'));
  const code     = params.get('code') || '00';
  const transactionId = params.get('transaction') || '';

  return (
    <>
      <Header />

      {/* ── Video banner ── */}
      <div className="relative pt-28 pb-10 md:pb-16 min-h-[28vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video autoPlay loop muted playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-40 blur-sm">
            <source src="/videos/videobg.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/30" />
        </div>
      </div>

      {/* ── Main receipt section ── */}
      <main className="min-h-[72vh] bg-white flex items-start justify-center px-4 py-10 md:py-16">
        <div className="w-full max-w-lg mx-auto">

          {/* Status badge */}
          <div className="flex justify-center mb-6">
            <span className="inline-flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 text-sm font-medium px-4 py-2 rounded-full">
              <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              Paiement effectué avec succès
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-normal text-gray-900 text-center mb-2 leading-tight" style={{ fontFamily: 'var(--font-graphik, sans-serif)' }}>
            Bravo. Votre transformation<br />commence maintenant.
          </h1>
          <p className="text-base text-gray-500 text-center mb-8" style={{ fontFamily: 'var(--font-graphik, sans-serif)' }}>
            Votre bilan RESET™ est confirmé avec succès.
          </p>

          {/* ── Transaction receipt card ── */}
          <div className="border border-gray-200 rounded-sm overflow-hidden mb-8">

            {/* Card header */}
            <div className="bg-gray-900 px-6 py-4">
              <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">Récapitulatif de la transaction</p>
              <p className="text-white font-medium text-lg" style={{ fontFamily: 'var(--font-graphik, sans-serif)' }}>
                Bilan RESET™ — Reset Club
              </p>
            </div>

            {/* Card rows */}
            <div className="divide-y divide-gray-100 bg-white">

              {/* Statut */}
              <div className="flex items-center justify-between px-6 py-4">
                <span className="text-sm text-gray-500">Statut du paiement</span>
                <span className="flex items-center gap-1.5 text-sm font-semibold text-green-700">
                  <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
                  Paiement réussi {code && `(code ${code})`}
                </span>
              </div>

              {/* Numéro de commande */}
              <div className="flex items-center justify-between px-6 py-4">
                <span className="text-sm text-gray-500">Numéro de commande</span>
                <span className="text-sm font-semibold text-gray-900 font-mono tracking-wide">{orderId}</span>
              </div>

              {transactionId && (
                <div className="flex items-center justify-between px-6 py-4">
                  <span className="text-sm text-gray-500">Numéro de transaction CMI</span>
                  <span className="text-sm font-semibold text-gray-900 font-mono tracking-wide">{transactionId}</span>
                </div>
              )}

              {/* Date */}
              <div className="flex items-center justify-between px-6 py-4">
                <span className="text-sm text-gray-500">Date de la transaction</span>
                <span className="text-sm font-semibold text-gray-900">{date}</span>
              </div>

              {/* Service */}
              <div className="flex items-center justify-between px-6 py-4">
                <span className="text-sm text-gray-500">Durée du bilan</span>
                <span className="text-sm font-semibold text-gray-900">45 minutes</span>
              </div>

              {/* Amount */}
              <div className="flex items-center justify-between px-6 py-5 bg-gray-50">
                <span className="text-base font-semibold text-gray-900">Montant payé</span>
                <span className="text-xl font-bold text-gray-900">{amount}</span>
              </div>
            </div>

            {/* Secure footer */}
            <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 flex items-center gap-2">
              <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c0-1.657 1.343-3 3-3s3 1.343 3 3v1H9v-1c0-1.657 1.343-3 3-3zm-6 2h12v7a2 2 0 01-2 2H8a2 2 0 01-2-2v-7z" />
              </svg>
              <span className="text-xs text-gray-400">Transaction sécurisée via CMI — Centre Monétique Interbancaire</span>
            </div>
          </div>

          {/* Follow-up message */}
          <p className="text-sm text-gray-600 text-center leading-relaxed mb-8" style={{ fontFamily: 'var(--font-graphik, sans-serif)' }}>
            Dans les prochaines 24 heures (hors week-end), notre équipe vous contactera personnellement pour fixer votre rendez-vous au centre.
          </p>

          {/* CTA */}
          <div className="flex justify-center">
            <Link
              href="/"
              className="inline-block bg-black text-white px-8 py-4 text-sm font-medium hover:bg-[#1d1c1c] transition-colors duration-300"
              style={{ fontFamily: 'var(--font-graphik, sans-serif)' }}
            >
              Retour à l&apos;accueil
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

'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function PaymentFailPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('order') || searchParams.get('oid') || '';
  const errorCode = searchParams.get('code') || searchParams.get('ProcReturnCode') || '';

  return (
    <>
      <Header />
      <main className="min-h-[70vh] bg-white px-6 py-28 flex items-center justify-center">
        <section className="w-full max-w-2xl text-center">
          <p className="text-sm uppercase tracking-[0.18em] text-gray-500 font-graphik mb-4">
            Paiement non finalisé
          </p>
          <h1 className="text-3xl md:text-5xl font-graphik font-normal text-gray-950 mb-5">
            Votre paiement n&apos;a pas été validé.
          </h1>
          <p className="text-base md:text-lg text-gray-700 font-graphik leading-relaxed mb-8">
            Aucun débit confirmé n&apos;a été enregistré pour cette tentative. Vous pouvez réessayer le paiement ou contacter notre équipe si vous pensez qu&apos;il s&apos;agit d&apos;une erreur.
          </p>

          {(orderId || errorCode) && (
            <div className="bg-gray-50 border border-gray-200 px-5 py-4 text-left font-graphik text-sm text-gray-800 mb-8">
              {orderId && <p><span className="font-medium">Commande :</span> {orderId}</p>}
              {errorCode && <p><span className="font-medium">Code retour :</span> {errorCode}</p>}
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/fr/payment"
              className="inline-flex justify-center bg-black text-white px-7 py-4 text-base font-medium hover:bg-[#1d1c1c] transition-colors font-graphik"
            >
              Réessayer le paiement
            </Link>
            <Link
              href="/fr/contact"
              className="inline-flex justify-center border border-gray-900 text-gray-950 px-7 py-4 text-base font-medium hover:bg-gray-950 hover:text-white transition-colors font-graphik"
            >
              Contacter Reset Club
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

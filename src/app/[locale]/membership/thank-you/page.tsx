'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function ThankYouPage() {
  const router = useRouter();

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-black text-white px-6 py-20">
      {/* Background Orb */}
      <div className="absolute inset-0 flex items-center justify-center opacity-20">
        <div className="relative w-[500px] h-[500px] md:w-[800px] md:h-[800px]">
          <Image
            src="/images/orberesetclub.png"
            alt="Reset Club"
            fill
            className="object-contain"
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-3xl">
        <div className="mb-8">
          <svg
            className="w-20 h-20 mx-auto text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-light mb-6">
          Merci pour votre demande !
        </h1>

        <p className="text-xl md:text-2xl text-white/80 mb-8 leading-relaxed">
          Votre transformation commence maintenant.
        </p>

        <div className="bg-white/5 border border-white/10 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-medium mb-4">Prochaines étapes</h2>

          <p className="text-white/80 mb-6 leading-relaxed">
            Une de nos thérapeutes vous contactera dans les <strong>24-48 heures</strong> pour planifier votre Bilan Transformationnel Reset™.
          </p>

          <div className="border-t border-white/10 pt-6">
            <p className="text-white/70 mb-4">
              Vous préférez nous appeler directement ?
            </p>
            <a
              href="tel:+212600000000"
              className="inline-block px-8 py-3 border border-white text-white font-medium uppercase tracking-wider transition-all duration-300 hover:bg-white hover:text-black"
            >
              +212 6 XX XX XX XX
            </a>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-white/60 text-sm">
            Vous recevrez également un email de confirmation avec tous les détails.
          </p>

          <button
            onClick={() => router.push('/')}
            className="text-white/80 hover:text-white underline transition-colors"
          >
            Retour à l&apos;accueil
          </button>
        </div>
      </div>
    </section>
  );
}

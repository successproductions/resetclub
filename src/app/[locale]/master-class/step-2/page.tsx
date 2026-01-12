'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import { Award, Plus, Minus } from 'lucide-react';
import Image from 'next/image';

export default function MasterClassStep2() {
  const router = useRouter();
  const videoRef = useRef<HTMLDivElement>(null);
  const guaranteeRef = useRef<HTMLDivElement>(null);
  const ticketsRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const progressTextRef = useRef<HTMLDivElement>(null);
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Animate sections on scroll
      if (videoRef.current) {
        tl.fromTo(
          videoRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8 }
        );
      }

      // Animate progress bar
      if (progressBarRef.current && progressTextRef.current) {
        gsap.fromTo(
          progressBarRef.current,
          { width: '0%' },
          { 
            width: '73%', 
            duration: 1.5, 
            ease: 'power2.out',
            delay: 0.3
          }
        );
        
        // Animate counter from 0 to 73
        gsap.fromTo(
          progressTextRef.current,
          { innerText: 0 },
          {
            innerText: 73,
            duration: 1.5,
            ease: 'power2.out',
            delay: 0.3,
            snap: { innerText: 1 },
            onUpdate: function() {
              if (progressTextRef.current) {
                progressTextRef.current.innerText = Math.round(Number(progressTextRef.current.innerText)) + '%';
              }
            }
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  const handleFreeTicket = () => {
    // Redirect to confirmation page
    router.push('/master-class/confirmation');
  };

  const handleVIPTicket = () => {
    // Redirect to payment page
    router.push('/master-class/payment');
  };

  return (
    <div className="relative bg-black font-graphik">
      {/* Top Warning Banner - Fixed */}
      <div className="fixed top-0 left-0 w-full bg-red-600 py-3 px-4 z-50">
        <p className="text-white text-center font-bold text-xs md:text-sm uppercase tracking-wide">
          NE FERME PAS CETTE PAGE ! TON INSCRIPTION N&apos;EST PAS ENCORE COMPLÈTE...
        </p>
      </div>

      {/* Section 1 - Video & Offer (70vh) */}
      <section className="relative min-h-[65vh] bg-white flex flex-col items-center justify-center px-4 pt-18 pb-6">
        <div ref={videoRef} className="w-full max-w-4xl mx-auto">
          {/* Progress Bar */}
          <div className="w-full mb-8">
            <div className="relative w-full h-5 bg-gray-200 rounded-full overflow-hidden">
              <div
                ref={progressBarRef}
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#51b1aa] to-[#91dbd3]"
                style={{ width: '0%' }}
              >
                <div 
                  ref={progressTextRef}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-white text-xs font-bold"
                >
                  0%
                </div>
              </div>
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-2xl md:text-5xl font-medium text-gray-950 text-center mb-2">
            Je veux te donner une {' '}
            <span className="text-[#51b1aa]">opportunité unique d’accélérer ta transformation avec </span> + un bilan de Biohacking 100% {' '}
            <span className="text-[#51b1aa]">personnalisé</span>
          </h1>

          <p className="text-center text-gray-950 mb-2 md:mb-4">
            Regarde cette vidéo pour comprendre comment saisir cette opportunité sans risque 👇
          </p>

          {/* Video Container */}
          <div className="relative w-full aspect-video bg-gray-900  overflow-hidden mb-3 md:mb-3 ">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-[#51b1aa] w-full text-center text-white text-xs px-4 py-0.5  font-medium uppercase z-10">
              Tu ne verras cette page qu’une seule fois — écoute attentivement ce message
            </div>
            <iframe
              src="https://www.youtube.com/embed/7lECIsRif10"
              title="Master Class Step 2 Video"
              className="absolute inset-0 w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col items-center gap-2 max-w-2xl mx-auto">
            <button
              onClick={handleVIPTicket}
              className="w-full bg-gradient-to-r from-[#cbb9a7] to-[#d4c4b3] hover:from-[#d4c4b3] hover:to-[#cbb9a7] text-white font-medium text-lg md:text-xl! py-4 px-3 md:px-8 rounded-lg transition-all duration-300 hover:scale-105 uppercase"
            >
              OUI, JE VEUX ACCÉLÉRER MA TRANSFORMATION 

            </button>
            <button
              onClick={handleFreeTicket}
              className="w-5/6 bg-gradient-to-r from-[#51b1aa] to-[#91dbd3] hover:from-[#91dbd3] hover:to-[#51b1aa] text-white font-medium text-lg md:text-xl! py-4 px-0 md:px-8 rounded-lg transition-all duration-300 hover:scale-105 uppercase"
            >
              NON MERCI, JE VEUX UNIQUEMENT GARDER L’ACCÈS GRATUIT 
            </button>
          </div>
        </div>
      </section>

      {/* Section 2 - Guarantee (70vh) */}
      <section className="relative min-h-[70vh] bg-black flex flex-col items-center justify-center px-4 pt-16">
        <div ref={guaranteeRef} className="w-full max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-[#1a4d47] to-[#0d2623] rounded-3xl p-6 md:p-12 border-2 border-[#51b1aa]">
            {/* Badge */}
            <div className="flex justify-center mb-8">
              <div className="relative w-40 h-40 md:w-52 md:h-52">
                <Image
                  src="/images/master/moneyback4.jpg"
                  alt="100% Money Back Guarantee"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            {/* Content */}
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-6">
              Garantie Sérénité RESET Club™ Zéro Stress, Zéro Risque
            </h2>

            <p className="text-white text-center text-lg mb-4 max-w-2xl mx-auto">
             Une expérience VIP en toute confiance
             En choisissant le Bilan Premium RESET Club™, tu accèdes à un accompagnement complet et personnalisé.
            </p>

            <p className="text-white text-center text-lg mb-8 max-w-2xl mx-auto">
              Notre engagement est simple :
Si tu ressors du bilan sans avoir obtenu la clarté que tu attendais, nous t’offrons un remboursement intégral.
            </p>

            <p className="text-white text-center text-lg mb-8 max-w-2xl mx-auto">
              Pas de formulaires, pas de justification.
Juste une garantie honnête, transparente et alignée avec nos valeurs.
Ton bien-être passe avant tout.

            </p>



            {/* CTA Buttons */}
            <div className="flex flex-col gap-4 max-w-2xl mx-auto items-center">
              <button
                onClick={handleVIPTicket}
                className="w-full bg-gradient-to-r from-[#cbb9a7] to-[#d4c4b3] hover:from-[#d4c4b3] hover:to-[#cbb9a7] text-white font-medium text-lg md:text-xl! py-4 px-2 md:px-8 rounded-lg transition-all duration-300 hover:scale-105 uppercase"
              >
                OUI, JE RÉSERVE MON BILAN PREMIUM
              </button>
              <button
                onClick={handleFreeTicket}
                className="w-5/6 bg-gradient-to-r from-[#51b1aa] to-[#91dbd3] hover:from-[#91dbd3] hover:to-[#51b1aa] text-white font-medium text-base md:text-lg py-3 px-2 md:px-4 rounded-lg transition-all duration-300 hover:scale-105 uppercase"
              >
                JE GARDE UNIQUEMENT MON ACCÈS GRATUIT À LA MASTERCLASS
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3 - Ticket Comparison (80vh) */}
      <section className="relative min-h-[80vh] bg-black flex flex-col items-center justify-center px-4 py-16">
        <div ref={ticketsRef} className="w-full max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            Choisis ton Ticket : 
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Free Ticket */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-6 md:p-8 border-2 border-gray-700 relative flex flex-col">
              {/* Logo */}
              <div className="flex justify-center mb-1 md:mb-6">
                <div className="relative w-40 h-16">
                  <Image
                    src="/images/master/MASTERCLASSLOGO2.png"
                    alt="Masterclass Logo"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Price */}
              <div className="text-center mb-1 md:mb-6">
                <div className="text-5xl font-normal md:font-bold text-white md:mb-2"> 0 MAD</div>
                <div className="text-gray-400 text-lg font-semibold">TICKET GRATUIT</div>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-white md:mb-4">
                Ticket Gratuit — Masterclass Exclusive
              </h3>

              {/* Content - grows to fill space */}
              <div className="flex-grow">
                {/* What You Get */}
                <div className="mb-1 md:mb-6">
                  <p className="text-[#51b1aa] font-semibold mb-3">Ce que tu obtiens :</p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 font-semibold text-white">
                      <span className="text-green-500 flex-shrink-0">✔</span>
                      <span>Accès à la Masterclass &quot;Les Secrets du Biohacking Féminin&quot; animée par Nahed Rachad</span>
                    </li>
                    <li className="flex items-start font-semibold gap-2 text-white">
                      <span className="text-green-500 flex-shrink-0">✔</span>
                      <span>Un mini-guide exclusif : &quot;5 Protocoles de Biohacking pour Booster ton Énergie & Affiner ta Silhouette&quot;</span>
                    </li>
                  </ul>
                </div>

                {/* What You Don't Get */}
                <div className="mb-4 md:mb-8 font-semibold">
                  <p className="text-red-400 font-semibold mb-3">Ce que tu n&apos;obtiens pas :</p>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-2 text-gray-500">
                      <span className="text-red-400 flex-shrink-0">✖</span>
                      <span>Aucun diagnostic personnalisé</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-500">
                      <span className="text-red-400 flex-shrink-0">✖</span>
                      <span>Aucune analyse de tes blocages (fatigue, stress, hormones, graisse)</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-500">
                      <span className="text-red-400 flex-shrink-0">✖</span>
                      <span>Aucun protocole sur mesure</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-500">
                      <span className="text-red-400 flex-shrink-0">✖</span>
                      <span>Pas d&apos;accès prioritaire au centre</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-500">
                      <span className="text-red-400 flex-shrink-0">✖</span>
                      <span>Pas de réduction spéciale sur les packs</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Button - stays at bottom */}
              <div>
                <button
                  onClick={handleFreeTicket}
                  className="w-full bg-gradient-to-r from-[#51b1aa] to-[#91dbd3] hover:from-[#91dbd3] hover:to-[#51b1aa] text-white font-medium text-base md:text-lg py-4 md:px-6 rounded-lg transition-all duration-300 hover:scale-105 uppercase"
                >
                   NON, JE GARDE MON TICKET GRATUIT
                </button>

                <p className="text-gray-500 text-xs text-center mt-3">
                  Tu seras redirigée vers la page de confirmation + groupe WhatsApp
                </p>
              </div>
            </div>

            {/* VIP Ticket */}
            <div className="bg-gradient-to-br from-[#3d2f1f] to-[#2a1f14] rounded-3xl p-6 md:p-8 border-2 border-[#cbb9a7] relative transform md:scale-102 flex flex-col shadow-lg shadow-[#cbb9a7]/40">
              {/* Logo */}
              <div className="flex justify-center mb-2 md:mb-6">
                <div className="relative w-40 h-16">
                  <Image
                    src="/images/master/MASTERCLASSLOGO2.png"
                    alt="Masterclass Logo"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Price */}
              <div className="text-center mb-2 md:mb-6">
                <div className="text-5xl font-normal md:font-bold text-white md:mb-2"> 1500 MAD</div>
                <div className="text-gray-400 text-lg font-semibold">TICKET VIP</div>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-white mb-4">
                 Ticket VIP — Bilan Premium RESET Club™
              </h3>

              {/* Content - grows to fill space */}
              <div className="flex-grow">
                {/* What You Get */}
                <div className="mb-8">
                  <p className="text-[#cbb9a7] font-semibold mb-3">Ce que tu obtiens :</p>
                  <ul className="space-y-7 font-medium">
                    <li className="flex items-start gap-2 font-normal text-white">
                      <span className="text-green-500 flex-shrink-0">✔</span>
                      <span className='font-semibold'>Accès à la Masterclass (inclus)</span>
                    </li>
                    <li className="flex items-start gap-2 text-white">
                      <span className="text-green-500 flex-shrink-0">✔</span>
                      <span>Un mini-guide exclusif : &quot;5 Protocoles de Biohacking pour Booster ton Énergie & Affiner ta Silhouette&quot;</span>
                    </li>
                    <li className="flex items-start gap-2 text-white">
                      <span className="text-[#cbb9a7] flex-shrink-0">👑</span>
                      <span>Analyse de ton énergie + métabolisme</span>
                    </li>
                    <li className="flex items-start gap-2 text-white">
                      <span className="text-[#cbb9a7] flex-shrink-0">👑</span>
                      <span>Analyse du sommeil & stress</span>
                    </li>
                    <li className="flex items-start gap-2 text-white">
                      <span className="text-[#cbb9a7] flex-shrink-0">👑</span>
                      <span>Détection des blocages (hormones, inflammation, rétention)</span>
                    </li>
                    <li className="flex items-start font-medium gap-2 text-white">
                      <span className="text-[#cbb9a7] flex-shrink-0">👑</span>
                      <span>Protocole personnalisé selon ton corps</span>
                    </li>
                    <li className="flex items-start gap-2 text-white">
                      <span className="text-[#cbb9a7] flex-shrink-0">👑</span>
                      <span className="font-medium">Offre spéciale VIP disponible uniquement maintenant</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Button - stays at bottom */}
              <div>
                <button
                  onClick={handleVIPTicket}
                  className="w-full bg-gradient-to-r from-[#cbb9a7] to-[#d4c4b3] hover:from-[#d4c4b3] hover:to-[#cbb9a7] text-white font-medium text-base md:text-lg py-4 px-6 rounded-lg transition-all duration-300 hover:scale-105 uppercase shadow-lg shadow-[#cbb9a7]/50"
                >
                   OUI, JE VEUX LE TICKET VIP
                </button>

                <p className="text-gray-500 text-xs text-center mt-3">
                  Tu seras redirigée vers la page de paiement pour finaliser ton bilan.
                </p>
              </div>
            </div>
          </div>

          {/* Footer Note */}
          <p className="text-white text-center text-sm max-w-3xl mx-auto">
            Peu importe le ticket que tu choisis, assure-toi de rejoindre le groupe WhatsApp.<br />
            C&apos;est le seul moyen d&apos;accéder à tout le contenu.
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative min-h-[60vh] bg-black flex flex-col items-center justify-center px-4 py-16">
        <div className="w-full max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            Questions Fréquemment Posées
          </h2>

          <div className="space-y-4">
            {/* FAQ 1 */}
            <div className="border-2 border-[#51b1aa] rounded-xl overflow-hidden bg-gradient-to-br from-[#1a4d47]/50 to-[#0d2623]/50 transition-all duration-300">
              <button
                onClick={() => setOpenFAQ(openFAQ === 0 ? null : 0)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-[#51b1aa]/10 transition-all duration-300"
              >
                <span className="text-white font-semibold text-lg pr-4">
                  1. Que comprend exactement le Bilan Premium ?
                </span>
                <div className={`transform transition-transform duration-300 ${openFAQ === 0 ? 'rotate-180' : ''}`}>
                  {openFAQ === 0 ? (
                    <Minus className="w-6 h-6 text-[#51b1aa] flex-shrink-0" />
                  ) : (
                    <Plus className="w-6 h-6 text-[#51b1aa] flex-shrink-0" />
                  )}
                </div>
              </button>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openFAQ === 0 ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-6 text-gray-300 text-base leading-relaxed">
                  Une analyse complète : énergie, stress, sommeil, métabolisme, hormones, inflammation…
                  <br />
                  Tu repars avec un protocole sur mesure et un plan d&apos;action concret basé sur le biohacking.
                </div>
              </div>
            </div>

            {/* FAQ 2 */}
            <div className="border-2 border-[#51b1aa] rounded-xl overflow-hidden bg-gradient-to-br from-[#1a4d47]/50 to-[#0d2623]/50 transition-all duration-300">
              <button
                onClick={() => setOpenFAQ(openFAQ === 1 ? null : 1)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-[#51b1aa]/10 transition-all duration-300"
              >
                <span className="text-white font-semibold text-lg pr-4">
                  2. Combien de temps dure le bilan ?
                </span>
                <div className={`transform transition-transform duration-300 ${openFAQ === 1 ? 'rotate-180' : ''}`}>
                  {openFAQ === 1 ? (
                    <Minus className="w-6 h-6 text-[#51b1aa] flex-shrink-0" />
                  ) : (
                    <Plus className="w-6 h-6 text-[#51b1aa] flex-shrink-0" />
                  )}
                </div>
              </button>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openFAQ === 1 ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-6 text-gray-300 text-base leading-relaxed">
                  Environ 45 à 60 minutes, avec un échange personnalisé et des recommandations immédiates.
                </div>
              </div>
            </div>

            {/* FAQ 3 */}
            <div className="border-2 border-[#51b1aa] rounded-xl overflow-hidden bg-gradient-to-br from-[#1a4d47]/50 to-[#0d2623]/50 transition-all duration-300">
              <button
                onClick={() => setOpenFAQ(openFAQ === 2 ? null : 2)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-[#51b1aa]/10 transition-all duration-300"
              >
                <span className="text-white font-semibold text-lg pr-4">
                  3. Est-ce utile même si j&apos;ai déjà un objectif précis (perte de gras, fatigue, stress…) ?
                </span>
                <div className={`transform transition-transform duration-300 ${openFAQ === 2 ? 'rotate-180' : ''}`}>
                  {openFAQ === 2 ? (
                    <Minus className="w-6 h-6 text-[#51b1aa] flex-shrink-0" />
                  ) : (
                    <Plus className="w-6 h-6 text-[#51b1aa] flex-shrink-0" />
                  )}
                </div>
              </button>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openFAQ === 2 ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-6 text-gray-300 text-base leading-relaxed">
                  Oui.
                  <br />
                  Le bilan te permet d&apos;identifier la vraie cause de ton blocage et de choisir la méthode la plus efficace pour ton corps.
                </div>
              </div>
            </div>

            {/* FAQ 4 */}
            <div className="border-2 border-[#51b1aa] rounded-xl overflow-hidden bg-gradient-to-br from-[#1a4d47]/50 to-[#0d2623]/50 transition-all duration-300">
              <button
                onClick={() => setOpenFAQ(openFAQ === 3 ? null : 3)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-[#51b1aa]/10 transition-all duration-300"
              >
                <span className="text-white font-semibold text-lg pr-4">
                  4. Et si je ne ressens pas la valeur du bilan ?
                </span>
                <div className={`transform transition-transform duration-300 ${openFAQ === 3 ? 'rotate-180' : ''}`}>
                  {openFAQ === 3 ? (
                    <Minus className="w-6 h-6 text-[#51b1aa] flex-shrink-0" />
                  ) : (
                    <Plus className="w-6 h-6 text-[#51b1aa] flex-shrink-0" />
                  )}
                </div>
              </button>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openFAQ === 3 ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-6 text-gray-300 text-base leading-relaxed">
                  Tu bénéficies de la Garantie Sérénité RESET :
                  <br />
                  si le bilan ne t&apos;apporte pas la clarté attendue, nous te remboursons, sans justification.
                </div>
              </div>
            </div>

            {/* FAQ 5 */}
            <div className="border-2 border-[#51b1aa] rounded-xl overflow-hidden bg-gradient-to-br from-[#1a4d47]/50 to-[#0d2623]/50 transition-all duration-300">
              <button
                onClick={() => setOpenFAQ(openFAQ === 4 ? null : 4)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-[#51b1aa]/10 transition-all duration-300"
              >
                <span className="text-white font-semibold text-lg pr-4">
                  5. Est-ce que l&apos;offre est disponible plus tard ?
                </span>
                <div className={`transform transition-transform duration-300 ${openFAQ === 4 ? 'rotate-180' : ''}`}>
                  {openFAQ === 4 ? (
                    <Minus className="w-6 h-6 text-[#51b1aa] flex-shrink-0" />
                  ) : (
                    <Plus className="w-6 h-6 text-[#51b1aa] flex-shrink-0" />
                  )}
                </div>
              </button>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openFAQ === 4 ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-6 text-gray-300 text-base leading-relaxed">
                  Non.
                  <br />
                  C&apos;est une offre ponctuelle, réservée aux personnes qui confirment maintenant.
                  <br />
                  Quand tu quittes la page, elle disparaît.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

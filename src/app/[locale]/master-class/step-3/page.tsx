'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import { Plus, Minus } from 'lucide-react';
import Image from 'next/image';

export default function MasterClassStep3() {
  const router = useRouter();
  const videoRef = useRef<HTMLDivElement>(null);
  const guaranteeRef = useRef<HTMLDivElement>(null);
  const ticketsRef = useRef<HTMLDivElement>(null);
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      if (videoRef.current) {
        tl.fromTo(
          videoRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8 }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  const handleFreeTicket = () => {
    router.push('/master-class/confirmation');
  };

  const handleVIPTicket = () => {
    router.push('/master-class/payment');
  };

  const handleUltimateTicket = () => {
    router.push('/master-class/payment-ultimate');
  };

  return (
    <div className="relative bg-black font-graphik">
      {/* Top Warning Banner - Fixed */}
      <div className="fixed top-0 left-0 w-full bg-red-600 py-3 px-4 z-50">
        <p className="text-white text-center font-bold text-xs md:text-sm uppercase tracking-wide">
          DERNIÈRE ÉTAPE POUR CONFIRMER TA PLACE — NE QUITTE PAS LA PAGE
        </p>
      </div>

      {/* Section 1 - Video & Offer (70vh) */}
      <section className="relative min-h-[65vh] bg-white flex flex-col items-center justify-center px-4 pt-18 pb-6">
        <div ref={videoRef} className="w-full max-w-4xl mx-auto">
          {/* Progress Bar */}
          <div className="w-full mb-8">
            <div className="relative w-full h-5 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#51b1aa] to-[#91dbd3] transition-all duration-500"
                style={{ width: '84%' }}
              >
                <div className="absolute right-2 top-1/2 -translate-y-1/2 text-white text-xs font-bold">
                  84%
                </div>
              </div>
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-2xl md:text-5xl font-medium text-gray-950 text-center mb-4">
            J&apos;ai réuni la méthode complète qui transforme{' '}
            <span className="text-[#51b1aa]">l&apos;énergie, la silhouette et l&apos;équilibre intérieur</span>…
            <br />
            Et aujourd&apos;hui, tu peux accéder à la{' '}
            <span className="text-[#51b1aa]">Plateforme RESET 360™</span> à un tarif inédit.
          </h1>

          <p className="text-center text-gray-950 mb-4 md:mb-8">
            Regarde cette vidéo pour comprendre pourquoi on ouvre exceptionnellement cet accès 👇
          </p>

          {/* Video Container */}
          <div className="relative w-full aspect-video bg-gray-900 overflow-hidden mb-4 md:mb-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-[#51b1aa] w-full text-center text-white text-xs px-4 py-0.5 font-medium uppercase z-10">
              Dernière opportunité — regarde attentivement
            </div>
            <iframe
              src="https://www.youtube.com/embed/7lECIsRif10"
              title="Master Class Step 3 Video"
              className="absolute inset-0 w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col items-center gap-2 max-w-2xl mx-auto">
            <button
              onClick={handleUltimateTicket}
              className="w-full bg-gradient-to-r from-[#cbb9a7] to-[#d4c4b3] hover:from-[#d4c4b3] hover:to-[#cbb9a7] text-white font-medium text-lg md:text-xl py-4 px-3 md:px-8 rounded-lg transition-all duration-300 hover:scale-105 uppercase"
            >
               OUI, JE VEUX L&apos;ACCÈS COMPLET À RESET 360™
            </button>
            <button
              onClick={handleFreeTicket}
              className="w-5/6 bg-gradient-to-r from-[#51b1aa] to-[#91dbd3] hover:from-[#91dbd3] hover:to-[#51b1aa] text-white font-medium text-lg md:text-xl py-4 px-0 md:px-8 rounded-lg transition-all duration-300 hover:scale-105 uppercase"
            >
              NON, JE REJOINS UNIQUEMENT LA MASTERCLASS GRATUITE
            </button>
          </div>
        </div>
      </section>

      {/* Section 2 - Ticket Comparison (80vh) */}
      <section className="relative min-h-[80vh] bg-black flex flex-col items-center justify-center px-4 py-16">
        <div ref={ticketsRef} className="w-full max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            Choisis ton Ticket :
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Free Ticket */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-6 border-2 border-gray-700 relative flex flex-col">
              <div className="flex justify-center mb-4">
                <div className="relative w-32 h-12">
                  <Image
                    src="/images/master/MASTERCLASSLOGO2.png"
                    alt="Masterclass Logo"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              <div className="text-center mb-4">
                <div className="text-4xl font-bold text-white mb-2">🖤 0 MAD</div>
                <div className="text-gray-400 text-base font-semibold">TICKET GRATUIT</div>
              </div>

              <h3 className="text-lg font-bold text-white mb-3">
                 Ticket Gratuit — Masterclass Exclusive
              </h3>

              <div className="flex-grow">
                <div className="mb-4">
                  <p className="text-[#51b1aa] font-semibold mb-2 text-sm">Ce que tu obtiens :</p>
                  <ul className="space-y-1 text-sm">
                    <li className="flex items-start gap-2 text-white">
                      <span className="text-green-500 flex-shrink-0">✔</span>
                      <span>Accès à la Masterclass</span>
                    </li>
                    <li className="flex items-start gap-2 text-white">
                      <span className="text-green-500 flex-shrink-0">✔</span>
                      <span>Mini-guide exclusif</span>
                    </li>
                  </ul>
                </div>

                <div className="mb-4">
                  <p className="text-red-400 font-semibold mb-2 text-sm">Ce que tu n&apos;obtiens pas :</p>
                  <ul className="space-y-1 text-sm">
                    <li className="flex items-start gap-2 text-gray-500">
                      <span className="text-red-400 flex-shrink-0">✖</span>
                      <span>Aucun diagnostic personnalisé</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-500">
                      <span className="text-red-400 flex-shrink-0">✖</span>
                      <span>Aucune analyse approfondie</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-500">
                      <span className="text-red-400 flex-shrink-0">✖</span>
                      <span>Aucun protocole sur mesure</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <button
                  onClick={handleFreeTicket}
                  className="w-full bg-gradient-to-r from-[#51b1aa] to-[#91dbd3] text-white font-medium text-sm py-3 rounded-lg transition-all duration-300 hover:scale-105 uppercase"
                >
                   JE GARDE MON TICKET GRATUIT
                </button>
                <p className="text-gray-500 text-xs text-center mt-2">
                  Redirection : confirmation + WhatsApp
                </p>
              </div>
            </div>

            {/* VIP Ticket */}
            <div className="bg-gradient-to-br from-[#3d2f1f] to-[#2a1f14] rounded-3xl p-6 border-2 border-[#cbb9a7] relative flex flex-col">
              <div className="flex justify-center mb-4">
                <div className="relative w-32 h-12">
                  <Image
                    src="/images/master/MASTERCLASSLOGO2.png"
                    alt="Masterclass Logo"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              <div className="text-center mb-4">
                <div className="text-4xl font-bold text-[#cbb9a7] mb-2"> 1500 MAD</div>
                <div className="text-gray-400 text-base font-semibold">TICKET VIP</div>
              </div>

              <h3 className="text-lg font-bold text-white mb-3">
                 Ticket VIP — Bilan Premium
              </h3>

              <div className="flex-grow">
                <div className="mb-4">
                  <p className="text-[#cbb9a7] font-semibold mb-2 text-sm">Ce que tu obtiens :</p>
                  <ul className="space-y-1 text-sm">
                    <li className="flex items-start gap-2 text-white">
                      <span className="text-green-500 flex-shrink-0">✔</span>
                      <span>Accès Masterclass + mini-guide</span>
                    </li>
                    <li className="flex items-start gap-2 text-white">
                      <span className="text-[#cbb9a7] flex-shrink-0">👑</span>
                      <span>Analyse énergie + métabolisme</span>
                    </li>
                    <li className="flex items-start gap-2 text-white">
                      <span className="text-[#cbb9a7] flex-shrink-0">👑</span>
                      <span>Analyse sommeil & stress</span>
                    </li>
                    <li className="flex items-start gap-2 text-white">
                      <span className="text-[#cbb9a7] flex-shrink-0">👑</span>
                      <span>Détection blocages</span>
                    </li>
                    <li className="flex items-start gap-2 text-white">
                      <span className="text-[#cbb9a7] flex-shrink-0">👑</span>
                      <span>Protocole personnalisé</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <button
                  onClick={handleVIPTicket}
                  className="w-full bg-gradient-to-r from-[#cbb9a7] to-[#d4c4b3] text-white font-medium text-sm py-3 rounded-lg transition-all duration-300 hover:scale-105 uppercase shadow-lg shadow-[#cbb9a7]/50"
                >
                   JE VEUX LE TICKET VIP
                </button>
                <p className="text-gray-500 text-xs text-center mt-2">
                  Redirection : page de paiement
                </p>
              </div>
            </div>

            {/* Ultimate RESET 360 Ticket */}
            <div className="bg-gradient-to-br from-[#1a4d47] to-[#0d2623] rounded-3xl p-6 border-2 border-[#51b1aa] relative flex flex-col transform md:scale-105 shadow-xl shadow-[#51b1aa]/40">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#51b1aa] to-[#91dbd3] text-white px-4 py-1 rounded-full font-bold text-xs uppercase animate-pulse">
                ULTIMATE ACCESS
              </div>

              <div className="flex justify-center mb-4 mt-2">
                <div className="relative w-32 h-12">
                  <Image
                    src="/images/master/MASTERCLASSLOGO2.png"
                    alt="Masterclass Logo"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              <div className="text-center mb-4">
                <div className="text-4xl font-bold text-[#51b1aa] mb-2"> X MAD</div>
                <div className="text-gray-400 text-base font-semibold">RESET 360™</div>
              </div>

              <h3 className="text-lg font-bold text-white mb-3">
                TICKET ULTIMATE — RESET 360
              </h3>

              <div className="flex-grow">
                <p className="text-[#51b1aa] font-semibold mb-2 text-sm">
                  Tu obtiens TOUT du Gratuit + TOUT du VIP, PLUS :
                </p>

                <div className="mb-3">
                  <p className="text-white font-bold text-sm mb-1">🌐 Plateforme RESET 360</p>
                  <ul className="space-y-1 text-xs text-gray-300 ml-4">
                    <li>• Protocoles guidés complets</li>
                    <li>• Vidéos pédagogiques exclusives</li>
                    <li>• Rituels matin & soir</li>
                    <li>• Outils de suivi avancés</li>
                    <li>• Espace de progression</li>
                  </ul>
                </div>

                <div className="mb-3">
                  <p className="text-white font-bold text-sm mb-1">💎 Avantages Premium</p>
                  <ul className="space-y-1 text-xs text-gray-300 ml-4">
                    <li>• Remises sur les packs centre</li>
                    <li>• Priorité calendrier</li>
                    <li>• Accès VIP nouvelles méthodes</li>
                  </ul>
                </div>

                <div className="mb-4">
                  <p className="text-white font-bold text-sm mb-1">🎁 Bonus Ultimate</p>
                  <ul className="space-y-1 text-xs text-gray-300 ml-4">
                    <li>• Bibliothèque exercices & recettes</li>
                    <li>• Workshops privés 360</li>
                  </ul>
                </div>
              </div>

              <div>
                <button
                  onClick={handleUltimateTicket}
                  className="w-full bg-gradient-to-r from-[#51b1aa] to-[#91dbd3] text-white font-bold text-sm py-3 rounded-lg transition-all duration-300 hover:scale-105 uppercase shadow-lg shadow-[#51b1aa]/50"
                >
                   JE VEUX LE TICKET RESET 360™
                </button>
                <p className="text-gray-500 text-xs text-center mt-2">
                  Redirection : paiement + configuration 360
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3 - Guarantee (70vh) */}
      <section className="relative min-h-[70vh] bg-black flex flex-col items-center justify-center px-4 pt-16">
        <div ref={guaranteeRef} className="w-full max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-[#1a4d47] to-[#0d2623] rounded-3xl p-6 md:p-12 border-2 border-[#51b1aa]">
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

            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-6">
              Garantie Sérénité RESET 360™ — Zéro Pression, Zéro Risque
            </h2>

            <p className="text-white text-center text-lg mb-4 max-w-2xl mx-auto">
              🔰 Une expérience complète, accessible en toute confiance
            </p>

            <p className="text-white text-center text-base mb-4 max-w-2xl mx-auto">
              En choisissant l&apos;accès à la Plateforme RESET 360™, tu rejoins un espace privé dédié à ton énergie,
              ton métabolisme, ton équilibre mental et ton mieux-être global.
            </p>

            <p className="text-white text-center text-base mb-6 max-w-2xl mx-auto">
              C&apos;est l&apos;outil conçu pour t&apos;accompagner jour après jour, avec des protocoles simples, efficaces
              et adaptés à ton rythme de vie.
            </p>

            <p className="text-[#51b1aa] text-center text-lg font-semibold mb-4">
              Et surtout : tu avances en toute tranquillité.
            </p>

            <p className="text-white text-center text-base mb-4 max-w-2xl mx-auto">
              Notre promesse est claire :
            </p>

            <p className="text-white text-center text-lg mb-6 max-w-2xl mx-auto font-medium">
              Si tu n&apos;es pas pleinement satisfaite de ton accès 360™,<br />
              ou si tu sens que la plateforme ne t&apos;aide pas comme tu l&apos;espérais,<br />
              👉 nous te remboursons intégralement.
            </p>

            <div className="bg-[#51b1aa]/10 border-2 border-[#51b1aa] rounded-xl p-4 mb-8 max-w-2xl mx-auto">
              <p className="text-[#51b1aa] text-center font-bold text-lg">
                ✨ Aucun justificatif. Aucune question.
              </p>
              <p className="text-white text-center text-sm mt-2">
                Juste une garantie transparente, fidèle aux valeurs RESET Club™.
              </p>
              <p className="text-white text-center text-sm mt-2 italic">
                Ton bien-être mérite une expérience sans stress.
              </p>
            </div>

            <div className="flex flex-col gap-4 max-w-2xl mx-auto items-center">
              <button
                onClick={handleUltimateTicket}
                className="w-full bg-gradient-to-r from-[#cbb9a7] to-[#d4c4b3] hover:from-[#d4c4b3] hover:to-[#cbb9a7] text-white font-medium text-lg md:text-xl py-4 px-2 md:px-8 rounded-lg transition-all duration-300 hover:scale-105 uppercase"
              >
                 OUI, J&apos;ACCÈDE À LA PLATEFORME RESET 360™
              </button>
              <button
                onClick={handleFreeTicket}
                className="w-5/6 bg-gradient-to-r from-[#51b1aa] to-[#91dbd3] hover:from-[#91dbd3] hover:to-[#51b1aa] text-white font-medium text-base md:text-lg py-3 px-2 md:px-4 rounded-lg transition-all duration-300 hover:scale-105 uppercase"
              >
                 NON, JE PRÉFÈRE L&apos;ACCÈS GRATUIT À LA MASTERCLASS
              </button>
            </div>
          </div>
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
                  1. Qu&apos;est-ce que la Plateforme RESET 360™ ?
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
                  Un espace privé qui rassemble protocoles, vidéos, outils de suivi, rituels matin & soir,
                  et conseils pratiques pour intégrer le biohacking dans ton quotidien.
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
                  2. Est-ce que j&apos;ai besoin de la plateforme si j&apos;ai déjà le bilan ?
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
                  Le bilan te donne la direction.
                  <br />
                  RESET 360™ t&apos;aide à appliquer, suivre et maintenir tes progrès jour après jour.
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
                  3. Est-ce adapté si je débute totalement dans le bien-être ?
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
                  Les modules sont courts, guidés, simples et pensés pour avancer étape par étape, sans pression.
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
                  4. Est-ce que j&apos;aurai accès à tout immédiatement ?
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
                  Oui.
                  <br />
                  Dès ton inscription, tu accèdes à l&apos;ensemble des contenus, outils et ressources.
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
                  5. L&apos;abonnement inclut-il un accès aux machines du centre ?
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
                  Tu bénéficies d&apos;avantages et de priorités réservés aux membres,
                  <br />
                  mais l&apos;utilisation des machines se fait en centre, sur rendez-vous.
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}

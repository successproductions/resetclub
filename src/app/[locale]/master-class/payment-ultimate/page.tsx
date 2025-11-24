'use client';

import { useState } from 'react';
import { CreditCard, Lock } from 'lucide-react';

export default function MasterClassPaymentUltimate() {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'bank'>('card');

  return (
    <div className="relative min-h-screen bg-black px-4 py-12 font-graphik">
      {/* Top Banner */}
      <div className="fixed top-0 left-0 w-full bg-[#51b1aa] py-3 px-4 z-50">
        <p className="text-white text-center font-bold text-xs md:text-sm uppercase tracking-wide flex items-center justify-center gap-2">
          <Lock className="w-4 h-4" />
          PAIEMENT SÉCURISÉ SSL
        </p>
      </div>

      <div className="max-w-4xl mx-auto mt-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
            🔥 Finalise ton Accès RESET 360™
          </h1>
          <p className="text-gray-400 text-lg">
            Plateforme Complète RESET 360™ — X MAD
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Form */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 border-2 border-[#51b1aa]">
              <h2 className="text-2xl font-bold text-white mb-6">Informations de Paiement</h2>

              {/* Payment Method Selection */}
              <div className="mb-6">
                <label className="block text-white font-semibold mb-3">Méthode de Paiement</label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setPaymentMethod('card')}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      paymentMethod === 'card'
                        ? 'border-[#51b1aa] bg-[#51b1aa]/10'
                        : 'border-gray-700 bg-gray-800 hover:border-gray-600'
                    }`}
                  >
                    <CreditCard className="w-8 h-8 text-white mx-auto mb-2" />
                    <span className="text-white text-sm font-semibold">Carte Bancaire</span>
                  </button>
                  <button
                    onClick={() => setPaymentMethod('bank')}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      paymentMethod === 'bank'
                        ? 'border-[#51b1aa] bg-[#51b1aa]/10'
                        : 'border-gray-700 bg-gray-800 hover:border-gray-600'
                    }`}
                  >
                    <div className="text-2xl mb-2">🏦</div>
                    <span className="text-white text-sm font-semibold">Virement</span>
                  </button>
                </div>
              </div>

              {paymentMethod === 'card' ? (
                /* Card Payment Form */
                <form className="space-y-4">
                  <div>
                    <label className="block text-white text-sm font-semibold mb-2">Nom sur la Carte</label>
                    <input
                      type="text"
                      placeholder="PRÉNOM NOM"
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[#51b1aa] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-white text-sm font-semibold mb-2">Numéro de Carte</label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[#51b1aa] focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white text-sm font-semibold mb-2">Date d&apos;Expiration</label>
                      <input
                        type="text"
                        placeholder="MM/AA"
                        maxLength={5}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[#51b1aa] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-white text-sm font-semibold mb-2">CVV</label>
                      <input
                        type="text"
                        placeholder="123"
                        maxLength={3}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[#51b1aa] focus:outline-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#51b1aa] to-[#91dbd3] hover:from-[#91dbd3] hover:to-[#51b1aa] text-white font-bold text-lg py-4 rounded-lg transition-all duration-300 hover:scale-105 mt-6"
                  >
                    CONFIRMER LE PAIEMENT — X MAD
                  </button>
                </form>
              ) : (
                /* Bank Transfer Info */
                <div className="space-y-4">
                  <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <h3 className="text-white font-bold mb-4">Informations de Virement</h3>
                    <div className="space-y-3 text-gray-300">
                      <p><span className="text-[#51b1aa] font-semibold">Bénéficiaire :</span> RESET Club™</p>
                      <p><span className="text-[#51b1aa] font-semibold">RIB :</span> XXXX XXXX XXXX XXXX XXXX XX</p>
                      <p><span className="text-[#51b1aa] font-semibold">Banque :</span> [Nom de la Banque]</p>
                      <p><span className="text-[#51b1aa] font-semibold">Montant :</span> X MAD</p>
                    </div>
                  </div>

                  <div className="bg-[#51b1aa]/10 border border-[#51b1aa] rounded-lg p-4">
                    <p className="text-white text-sm">
                      ⚠️ Après avoir effectué le virement, envoie-nous la preuve de paiement par WhatsApp au{' '}
                      <span className="font-bold">+212 XXX XXX XXX</span>
                    </p>
                  </div>

                  <a
                    href="https://wa.me/212XXXXXXXXX"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#128C7E] hover:to-[#25D366] text-white font-bold text-lg py-4 rounded-lg transition-all duration-300 hover:scale-105 text-center mt-6"
                  >
                    CONTACTER SUR WHATSAPP
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-[#1a4d47] to-[#0d2623] rounded-2xl p-6 border-2 border-[#51b1aa] sticky top-24">
              <h3 className="text-xl font-bold text-white mb-6">Récapitulatif</h3>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-300">
                  <span>Plateforme RESET 360™</span>
                  <span className="font-bold">X MAD</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Bilan Premium</span>
                  <span className="text-[#51b1aa] font-bold">Inclus</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Masterclass + Guide</span>
                  <span className="text-[#51b1aa] font-bold">Inclus</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Avantages Premium</span>
                  <span className="text-[#51b1aa] font-bold">Inclus</span>
                </div>
              </div>

              <div className="border-t border-gray-700 pt-4 mb-6">
                <div className="flex justify-between text-white text-xl font-bold">
                  <span>Total</span>
                  <span className="text-[#51b1aa]">X MAD</span>
                </div>
              </div>

              <div className="bg-[#51b1aa]/10 border border-[#51b1aa] rounded-lg p-4 mb-4">
                <div className="flex items-center gap-2 text-[#51b1aa] font-bold mb-2">
                  <Lock className="w-4 h-4" />
                  <span className="text-sm">Garantie 100% Satisfait ou Remboursé</span>
                </div>
                <p className="text-gray-400 text-xs">
                  Accès complet sans risque avec notre garantie transparente
                </p>
              </div>

              <ul className="space-y-2 text-gray-400 text-xs">
                <li className="flex items-center gap-2">
                  <span className="text-[#51b1aa]">✔</span>
                  Paiement sécurisé SSL
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#51b1aa]">✔</span>
                  Accès immédiat à la plateforme
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#51b1aa]">✔</span>
                  Support disponible 24/7
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm mb-4">Paiement 100% sécurisé</p>
          <div className="flex justify-center gap-6 opacity-50">
            <span className="text-3xl">🔒</span>
            <span className="text-3xl">💳</span>
            <span className="text-3xl">✅</span>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CreditCard } from 'lucide-react';

export default function PaymentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const ticketType = searchParams.get('type') || 'vip'; // 'vip' or 'ultimate'

  const [formData, setFormData] = useState({
    email: 'test@example.com',
    cardNumber: '4242 4242 4242 4242',
    expiryDate: '12 / 25',
    cvv: '123',
    name: 'John Doe',
    country: 'Morocco',
    address: '123 Main Street, Casablanca',
    promoCode: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get ticket info based on type
  const ticketInfo = {
    vip: {
      title: 'Ticket VIP — Bilan Premium RESET Club™',
      price: '1500 MAD',
      description: 'Analyse complète : énergie, stress, sommeil, métabolisme + protocole personnalisé'
    },
    ultimate: {
      title: 'Ticket ULTIMATE — RESET 360™',
      price: '3000 MAD',
      description: 'Accès complet à la plateforme RESET 360™ + Bilan Premium + Suivi personnalisé'
    }
  };

  const currentTicket = ticketInfo[ticketType as keyof typeof ticketInfo] || ticketInfo.vip;

  useEffect(() => {
    // Get user info from localStorage
    const storedUserInfo = localStorage.getItem('masterclass-user-info');
    if (storedUserInfo) {
      const parsedInfo = JSON.parse(storedUserInfo);
      setFormData(prev => ({
        ...prev,
        email: parsedInfo.email,
        name: parsedInfo.name
      }));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Process payment here
      // await processPayment(formData);

      // Redirect based on ticket type
      if (ticketType === 'ultimate') {
        router.push('/master-class/confirmation-ultimate');
      } else {
        router.push('/master-class/confirmation-2');
      }
    } catch (error) {
      console.error('Payment error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleApplyPromo = () => {
    // Apply promo code logic
    console.log('Applying promo code:', formData.promoCode);
  };

  return (
    <div className="relative bg-[#0a0a0a] min-h-screen flex items-start justify-center px-4 py-12 font-graphik">
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Side - Product Info */}
        <div className="bg-[#1a1a1a] rounded-2xl p-4 md:p-8 border border-gray-800">
          {/* Product Header */}
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center flex-shrink-0 text-2xl">
              💎
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-white mb-1">
                {currentTicket.title}
              </h2>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex">
                  <span className="text-yellow-400">⭐⭐⭐⭐⭐</span>
                </div>
                <span className="text-gray-400 text-sm">(293)</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                {currentTicket.description}
              </p>
            </div>
          </div>

          {/* Features & Price */}
          <div className="flex items-center justify-between mb-8 pb-8 border-b border-gray-800">
            <div className="flex items-center gap-2 text-sm text-gray-400">

            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-white mb-1">{currentTicket.price}</div>
              <div className="text-xs text-gray-400">Paiement unique</div>
            </div>
          </div>

          {/* Promo Code */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <label className="text-gray-400 text-sm">Code promo</label>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                name="promoCode"
                value={formData.promoCode}
                onChange={handleChange}
                placeholder="Saisir votre code promo"
                className="flex-1 px-2 md:px-4 py-2.5 bg-[#0f0f0f] border border-gray-800 rounded-lg text-white text-sm placeholder-gray-600 focus:outline-none focus:border-gray-700 transition-colors"
              />
              <button
                type="button"
                onClick={handleApplyPromo}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm! font-medium rounded-lg transition-colors"
              >
                Postuler
              </button>
            </div>
          </div>

          {/* Total */}
          <div className="flex justify-between items-center">
            <span className="text-white text-base">Total dû aujourd&apos;hui</span>
            <span className="text-white text-2xl font-semibold">{currentTicket.price}</span>
          </div>
        </div>

        {/* Right Side - Payment Form */}
        <div className="space-y-5">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-gray-400 text-xs mb-2">E-mail</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-800 rounded-lg text-white text-sm placeholder-gray-600 focus:outline-none focus:border-gray-700 transition-colors"
              />
            </div>

            {/* Payment Method - Card Only */}
            <div className="bg-[#1a1a1a] border border-blue-600 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked
                  readOnly
                  className="w-4 h-4 accent-blue-600"
                />
                <CreditCard className="w-5 h-5 text-blue-600" />
                <span className="text-white text-sm">Carte</span>
              </div>
            </div>

            {/* Card Number */}
            <div>
              <label className="block text-gray-400 text-xs mb-2">Numéro de carte</label>
              <div className="relative">
                <input
                  type="text"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  placeholder="1234 1234 1234 1234"
                  maxLength={19}
                  required
                  className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-800 rounded-lg text-white text-sm placeholder-gray-600 focus:outline-none focus:border-gray-700 transition-colors"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
                  <div className="w-8 h-5 bg-blue-600 rounded flex items-center justify-center text-[10px] font-bold text-white">VISA</div>
                  <div className="w-8 h-5 bg-gradient-to-r from-red-600 to-orange-500 rounded"></div>
                </div>
              </div>
            </div>

            {/* Expiry and CVV */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-gray-400 text-xs mb-2">Date d&apos;expiration</label>
                <input
                  type="text"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleChange}
                  placeholder="MM / YY"
                  maxLength={7}
                  required
                  className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-800 rounded-lg text-white text-sm placeholder-gray-600 focus:outline-none focus:border-gray-700 transition-colors"
                />
              </div>
              <div>
                <label className="block text-gray-400 text-xs mb-2">Code de sécurité</label>
                <input
                  type="text"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleChange}
                  placeholder="CVC"
                  maxLength={4}
                  required
                  className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-800 rounded-lg text-white text-sm placeholder-gray-600 focus:outline-none focus:border-gray-700 transition-colors"
                />
              </div>
            </div>

            {/* Name */}
            <div>
              <label className="block text-gray-400 text-xs mb-2">Nom</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Lorem veniam fugit"
                required
                className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-800 rounded-lg text-white text-sm placeholder-gray-600 focus:outline-none focus:border-gray-700 transition-colors"
              />
            </div>

            {/* Country */}
            <div>
              <label className="block text-gray-400 text-xs mb-2">Pays</label>
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-800 rounded-lg text-white text-sm focus:outline-none focus:border-gray-700 transition-colors cursor-pointer"
              >
                <option value="Morocco">Morocco</option>
                <option value="France">France</option>
                <option value="USA">USA</option>
                <option value="UK">UK</option>
                <option value="UAE">UAE</option>
              </select>
            </div>

            {/* Address */}
            <div>
              <label className="block text-gray-400 text-xs mb-2">Ligne d&apos;adresse 1</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="123 Main St"
                required
                className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-800 rounded-lg text-white text-sm placeholder-gray-600 focus:outline-none focus:border-gray-700 transition-colors"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base py-3.5 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              {isSubmitting ? 'TRAITEMENT...' : 'Rejoindre'}
            </button>

            {/* Security Badge */}
            <div className="text-center pt-2">
              <p className="text-gray-500 text-xs mb-3 flex items-center justify-center gap-1">
                <span>🔒</span>
                <span>Sécurisé par Reset Club</span>
              </p>
              <p className="text-gray-600 text-xs leading-relaxed mb-4">
                By joining, you agree to MMO Challenge 2.0 VIP Ticket&apos;s terms and conditions and Whop&apos;s Terms of Service and Privacy Policy and to allow us to charge your payment method for this payment.
              </p>

              {/* Footer Links */}
              <div className="flex justify-center gap-4 text-xs">
                <a href="#" className="text-blue-500 hover:underline">Conditions</a>
                <a href="#" className="text-blue-500 hover:underline">Confidentialité</a>
                <a href="#" className="text-blue-500 hover:underline">Retours</a>
                <a href="#" className="text-blue-500 hover:underline">CLUF</a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

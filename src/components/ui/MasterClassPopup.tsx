'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';
import Swal from 'sweetalert2';

interface MasterClassPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MasterClassPopup({ isOpen, onClose }: MasterClassPopupProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    countryCode: '+212',
    wantsVIP: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Submit to API
      const response = await fetch('/api/master-class', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      // Close popup
      onClose();

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        countryCode: '+212',
        wantsVIP: false,
      });

      // Redirect to registration page
      router.push('/master-class/registration');

    } catch (error) {
      console.error('Error submitting form:', error);

      // Show error alert
      await Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Une erreur est survenue. Veuillez réessayer.',
        confirmButtonText: 'OK',
        confirmButtonColor: '#e3bd93',
        customClass: {
          popup: 'font-graphik',
        }
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type, checked } = target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 font-graphik"
    >
      <div className="relative bg-[#1a1a1a] border border-gray-800 rounded-sm max-w-md w-full p-8 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          aria-label="Close"
        >
          <X size={24} />
        </button>

        {/* Title */}
        <h2 className="text-2xl md:text-2xl! font-medium! text-white mb-2 text-center">
          Réservez Votre Place
        </h2>
        <p className="text-gray-400 text-center mb-6">
          Entrez vos informations pour réserver votre spot
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Input */}
          <div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Votre nom complet *"
              required
              className="w-full px-4 py-3 bg-[#2a2a2a] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#e3bd93] transition-colors"
            />
          </div>

          {/* Email Input */}
          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Votre meilleur email *"
              required
              className="w-full px-4 py-3 bg-[#2a2a2a] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#e3bd93] transition-colors"
            />
          </div>

          {/* Phone Input */}
          <div>
            <div className="flex">
              <select
                name="countryCode"
                value={formData.countryCode}
                onChange={handleChange}
                className="px-1 py-3 bg-[#2a2a2a] border border-r-0 border-gray-700 rounded-l-lg text-white text-sm focus:outline-none focus:border-[#e3bd93] transition-colors cursor-pointer"
              >
                <option value="+212">🇲🇦 +212</option>
                <option value="+33">🇫🇷 +33</option>
                <option value="+1">🇺🇸 +1</option>
                <option value="+44">🇬🇧 +44</option>
                <option value="+971">🇦🇪 +971</option>
                <option value="+966">🇸🇦 +966</option>
                <option value="+213">🇩🇿 +213</option>
                <option value="+216">🇹🇳 +216</option>
                <option value="+20">🇪🇬 +20</option>
                <option value="+34">🇪🇸 +34</option>
                <option value="+49">🇩🇪 +49</option>
                <option value="+39">🇮🇹 +39</option>
                <option value="+32">🇧🇪 +32</option>
                <option value="+41">🇨🇭 +41</option>
                <option value="+31">🇳🇱 +31</option>
              </select>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Numéro de téléphone *"
                required
                className="flex-1 px-4 py-3 bg-[#2a2a2a] border border-gray-700 rounded-r-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#e3bd93] transition-colors"
              />
            </div>
          </div>

          

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#e3bd93] hover:bg-[#e6b57c] text-white font-medium text-lg py-4 rounded-sm transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[#e3bd93]/20"
          >
            {isSubmitting ? 'ENVOI EN COURS...' : 'RÉSERVER MA PLACE'}
          </button>
        </form>

        <p className="text-xs text-gray-500 text-center mt-4">
          * En vous inscrivant, vous acceptez de recevoir des informations sur cet événement
        </p>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface MembershipApplicationFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MembershipApplicationForm({ isOpen, onClose }: MembershipApplicationFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    phone: '',
    gdprConsent: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Close modal and redirect to thank you page
    onClose();
    router.push('/membership/thank-you');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-2 md:p-4">
      <div className="relative bg-white text-black max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-lg">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 md:top-6 right-2 md:right-6 text-black/60 hover:text-black transition-colors z-10"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Form Content */}
        <div className="p-5 md:p-12">
          <h2 className="text-3xl md:text-4xl font-light mb-4">
            Apply for Membership
          </h2>

          <p className="text-black/70 mb-2">
            Complétez le formulaire ci-dessous comme première étape du processus de candidature.
          </p>

          <p className="text-black/70 mb-8">
            Si votre demande est approuvée, vous recevrez un appel d&apos;un membre de notre équipe dans les prochains jours.
          </p>

          <form onSubmit={handleSubmit} className="space-y-3 md:space-y-6">
            {/* First Name */}
            <div>
              <label htmlFor="firstName" className="block text-sm md:mb-2">
                Nom complet
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-full bg-transparent border-b border-black/20 py-3 focus:border-black/60 focus:outline-none transition-colors"
                placeholder="Votre nom complet"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm md:mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-transparent border-b border-black/20 py-3 focus:border-black/60 focus:outline-none transition-colors"
                placeholder="votre@email.com"
              />
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-sm md:mb-2">
                Téléphone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full bg-transparent border-b border-black/20 py-3 focus:border-black/60 focus:outline-none transition-colors"
                placeholder="+212 6 XX XX XX XX"
              />
            </div>

            {/* Copywriting Section */}
            <div className="bg-black/2 p-2 md:p-6 border border-[#f5efe8]">
              <h3 className="text-lg font-medium mb-3">Votre Bilan Transformationnel Reset™</h3>
              <p className="text-black/80 text-sm leading-relaxed mb-3">
                Découvrez en 30 minutes ce qui freine vraiment vos résultats — énergie, métabolisme, inflammation, équilibre hormonal — grâce à notre technologie de pointe InBody + OligoCheck™.
              </p>
              <p className="text-black/80 text-sm leading-relaxed">
                Ce n&apos;est pas un simple bilan. C&apos;est la cartographie précise de votre corps pour créer votre protocole personnalisé In • Out • Reset™ et commencer votre transformation durable.
              </p>
            </div>

            {/* GDPR Consent */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="gdprConsent"
                name="gdprConsent"
                checked={formData.gdprConsent}
                onChange={handleChange}
                required
                className="mt-1 w-4 h-4 accent-black"
              />
              <label htmlFor="gdprConsent" className="text-sm text-black/70">
                J&apos;accepte que mes données soient utilisées pour me recontacter concernant ma demande d&apos;adhésion.
                Conformément au RGPD, vos données sont sécurisées et ne seront jamais partagées avec des tiers.
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || !formData.gdprConsent}
              className="w-full py-4 bg-black text-white font-medium uppercase tracking-wider transition-all duration-300 hover:bg-black/90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Envoi en cours...' : 'Soumettre ma demande'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

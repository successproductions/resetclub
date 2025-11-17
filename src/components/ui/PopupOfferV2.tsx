'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { X } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function PopupOfferV2() {
  const [isOpen, setIsOpen] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const t = useTranslations('PopupOffer');
  const popupRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    // Show popup after 3 seconds
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', { fullName, email });

    // Close popup and redirect to payment page
    setIsOpen(false);
    router.push('/payment');
  };

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false);
    }
  };

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
    >
      <div ref={popupRef} className="relative bg-white max-w-4xl w-full shadow-2xl overflow-hidden max-h-[90vh] md:max-h-none overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-2 right-2 md:top-4 md:right-4 z-10 text-gray-600 hover:text-gray-900 transition-colors bg-white/80 rounded-full p-1"
          aria-label="Close"
        >
          <X size={24} className="md:w-7 md:h-7" />
        </button>

        {/* Two Column Layout */}
        <div className="grid md:grid-cols-2">
          {/* Left Side - Image */}
          <div className="relative h-48 md:h-auto">
            <Image
              src="/images/POPUP.jpg"
              alt="Reset Club"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Right Side - Form */}
          <div className="p-3 md:p-5 flex flex-col justify-center">
            {/* Title */}
            <h3 className="text-[23px] md:text-4xl! font-graphik font-medium md:mb-2 text-gray-900 tracking-wide">
              {t('title')}
            </h3>

            {/* Subtitle */}
            <p className="text-gray-900 font-graphik mb-3 md:mb-6 text-sm md:text-lg">
              {t('subtitle')}
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-2 md:space-y-4">
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Nom complet"
                required
                className="w-full px-4 md:px-6 py-2 md:py-3 border  border-[#040404] text-sm md:text-base focus:outline-none focus:border-gray-400 bg-white text-gray-900 placeholder-gray-400 font-graphik"
              />

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E-mail"
                required
                className="w-full px-4 md:px-6 py-2 md:py-3 border border-[#040404] text-sm md:text-base focus:outline-none focus:border-gray-400 bg-white text-gray-900 placeholder-gray-400 font-graphik"
              />

              <button
                type="submit"
                className="w-full bg-black text-white py-3 md:py-4 text-base md:text-lg font-medium hover:bg-[#1f1e1e] transition-colors duration-300 font-graphik"
              >
                {t('ctaButton')}
              </button>
            </form>

            {/* Privacy Policy */}
            <p className="text-xs text-gray-500 mt-3 md:mt-4 font-graphik">
              {t('privacyText')}{' '}
              <Link href="/privacy" className="underline hover:text-gray-700">
                {t('privacyLink')}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { X } from 'lucide-react';
import Image from 'next/image';
import ScratchCard from './ScratchCard';

export default function PopupOffer() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [cards, setCards] = useState<number[]>([]);
  const [scratchedCards, setScratchedCards] = useState<boolean[]>([false, false, false]);
  const t = useTranslations('PopupOffer');
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize cards with discounts - always guarantee wins
    const discounts = [5, 10, 15];
    const shuffled = discounts.sort(() => Math.random() - 0.5);
    setCards(shuffled);

    // Show popup after 2 seconds
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleCardScratched = (index: number) => {
    setScratchedCards(prev => {
      const newState = [...prev];
      newState[index] = true;
      return newState;
    });
  };

  const allCardsScratched = scratchedCards.every(scratched => scratched);
  const bestDiscount = cards.length > 0 ? Math.max(...cards) : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Email submitted:', email);
    // You can add your email submission logic here
    setIsOpen(false);
  };

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only close if clicking the backdrop itself, not its children
    if (e.target === e.currentTarget) {
      setIsOpen(false);
    }
  };

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
    >
      <div ref={popupRef} className="relative bg-white max-w-lg w-full rounded-lg shadow-2xl overflow-hidden max-h-[70vdh] md:max-h-[80vdh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-1 right-3 md:top-0 md:right-1 z-10 text-gray-600 hover:text-gray-900 transition-colors"
          aria-label="Close"
        >
          <X size={24} className="md:w-7 md:h-7" />
        </button>

        {/* Content */}
        <div className="p-3 md:p-4 text-center">
          {/* Title */}
          <h3 className="text-1xl md:text-2xl uppercase lg:text-2xl font-graphik font-medium mb-1 md:mb-2 lg:mb-4 text-[#524029] tracking-wide">
            {t('title')}
          </h3>

          {/* Image */}
          <div className="mb-1 md:mb-2 rounded-lg overflow-hidden bg-gradient-to-br from-blue-400 to-blue-600 relative">
            <Image
              src="/images/woman-put.jpg"
              alt={t('imageAlt')}
              width={600}
              height={400}
              quality={85}
              priority
              className="w-full h-40 md:h-52 object-cover"
            />
          </div>

          {/* Description */}
          <p className="text-[#524029] font-graphik  mb-1 md:mb-1 text-sm font-normal md:text-lg">
            {t('subtitle')}
          </p>
          {/* <p className="text-gray-600 mb-3 md:mb-6 text-sm md:text-base">
            {t('description')}
          </p> */}

          {/* Card instruction */}
          <p className="text-xs md:text-base font-graphik  text-[#524029] mb-3 md:mb-1">
            {t('cardInstruction')}
          </p>

          {/* Scratch-off cards */}
          <div className="flex justify-center gap-2 md:gap-3 mb-2 md:mb-2 p-4 pb-6 bg-gradient-to-b from-gray-50 to-gray-100 rounded-lg border border-gray-200 shadow-inner">
            {cards.map((discount, index) => (
              <div
                key={index}
                className={`
                  w-20 h-24 md:w-24 md:h-32 transition-all duration-300
                  ${index === 0 ? 'transform -rotate-3' : index === 2 ? 'transform rotate-3' : ''}
                  ${scratchedCards[index] ? 'scale-105' : 'hover:scale-105'}
                  relative
                `}
              >
                <ScratchCard
                  discount={discount}
                  onScratched={() => handleCardScratched(index)}
                  isScratched={scratchedCards[index]}
                />
                {/* Ticket number label */}
                
              </div>
            ))}
          </div>



          {/* Show result message */}
          {allCardsScratched && (
            <div className="mb-2 py-2 md:p-2 rounded-lg text-center bg-gradient-to-br from-yellow-50 via-amber-50 to-yellow-100 border-4 border-double border-amber-400 shadow-lg">
              {/* <div className="flex items-center justify-center mb-2">
                <div className="text-1xl md:text-3xl">🎉</div>
                <div className="mx-2 text-sm md:text-xl font-black text-amber-600">WINNER!</div>
                <div className="text-1xl md:text-3xl">🎉</div>
              </div> */}
              {/* <p className="text-xs md:text-base font-bold text-amber-800 mb-1">
                {t('congratulations') || 'Félicitations !'} {t('youWon') || 'Vous avez gagné'}
              </p> */}
              <div className="text-1xl md:text-2xl font-graphik font-black text-amber-600 " style={{ textShadow: '2px 2px 0px rgba(217, 119, 6, 0.2)' }}>
                {bestDiscount}% {t('discount') || 'de réduction'}
              </div>
              <p className="text-xs md:text-sm font-graphik font-medium text-amber-700 ">
                {t('enterEmail') || 'Entrez votre email pour recevoir votre code promo'} 
              </p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('emailPlaceholder')}
              required
              className="w-full px-4 py-2.5 md:py-3 border font-graphik text-gray-900 border-gray-300  focus:outline-none focus:ring-2 focus:ring-black text-sm md:text-base"
            />

            <button
              type="submit"
              disabled={!allCardsScratched}
              className={`
                w-full py-2.5 md:py-3 px-6  font-graphik font-medium transition-colors uppercase tracking-wider text-sm md:text-base
                ${!allCardsScratched
                  ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                  : 'bg-black text-white hover:bg-[#c26d4c] cursor-pointer hover:scale-105 shadow-lg hover:shadow-xl'}
              `}
            >
              {t('ctaButton')}
            </button>
          </form>

          {/* Privacy Policy */}
          <p className="text-[10px] md:text-xs text-gray-500 mt-3 md:mt-1">
            {t('privacyText')}{' '}
            <a href="#" className="underline hover:text-gray-700">
              {t('privacyLink')}
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}

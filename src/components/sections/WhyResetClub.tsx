'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

const WhyResetClub: React.FC = () => {
  const t = useTranslations('WhyResetClub');
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !scrollRef.current) return;
      
      e.preventDefault();
      const x = e.pageX - scrollRef.current.offsetLeft;
      const walk = (x - startX) * 2; 
      scrollRef.current.scrollLeft = scrollLeft - walk;
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, startX, scrollLeft]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    
    setIsDragging(true);
    const startX = e.pageX - scrollRef.current.offsetLeft;
    setStartX(startX);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const cards = [
    {
      id: 1,
      titleKey: "cards.values.title",
      descriptionKey: "cards.values.description",
      image: "/images/card1.png",
      iconUrl: "https://shawellness.com/wp-content/uploads/2025/01/1-01.svg"
    },
    {
      id: 2,
      titleKey: "cards.innovation.title",
      descriptionKey: "cards.innovation.description",
      image: "https://shawellness.com/wp-content/uploads/2025/01/6.png",
      iconUrl: "https://shawellness.com/wp-content/uploads/2025/01/1-02.svg"
    },
    {
      id: 3,
      titleKey: "cards.transformation.title",
      descriptionKey: "cards.transformation.description",
      image: "/images/card2.png",
      iconUrl: "https://shawellness.com/wp-content/uploads/2025/01/1-03.svg"
    },
    {
      id: 4,
      titleKey: "cards.excellence.title",
      descriptionKey: "cards.excellence.description",
      image: "/images/card4.png",
      iconUrl: "https://shawellness.com/wp-content/uploads/2025/01/1-04.svg"
    },
    {
      id: 5,
      titleKey: "cards.holistic.title",
      descriptionKey: "cards.holistic.description",
      image: "/images/card5.png",
      iconUrl: "https://shawellness.com/wp-content/uploads/2025/01/1-05.svg"
    },
    {
      id: 6,
      titleKey: "cards.method.title",
      descriptionKey: "cards.method.description",
      image: "/images/card6.png",
      iconUrl: "https://shawellness.com/wp-content/uploads/2025/01/1-06.svg"
    }
  ];

  return (
    <section className="md:pt-2 pt-4 bg-white">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-6 md:text-center mb-6 md:mb-16">
        <h2 className="text-3xl md:text-4xl lg:text-5xl  text-[#524029] mb-1 ">
          {t('title')}
        </h2>
        <p className="text-lg md:text-lg xl:text-xl font-normal  font-graphik text-[#524029] ">
          {t('subtitle')}
        </p>
      </div>

      {/* Cards Section - Full Width */}
      <div className="relative w-full overflow-hidden">
        {/* Scrolling Banner Container */}
        <div className="relative overflow-hidden">
          <div
            ref={scrollRef}
            className={`flex animate-scroll-banner scrollbar-hide ${isDragging ? 'cursor-grabbing' : 'cursor-grab'} select-none`}
            style={{
              width: 'calc(200% + 20px)',
              animationPlayState: isHovered ? 'paused' : 'running',
              overflowX: 'auto'
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onMouseDown={handleMouseDown}
          >
            {/* First set of cards */}
            {cards.map((card, index) => (
              <div
                key={`first-${card.id}`}
                className="flex-none w-[60%]  md:w-[80%] min-h-[480px] md:min-h-[580px] sm:w-1/2 lg:w-2/12 relative group"

              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <Image
                    src={card.image}
                    alt={t(card.titleKey)}
                    fill
                    className="object-cover"
                    style={{ filter: 'grayscale(30%)' }}
                    sizes="16.67vw"
                    draggable={false}
                  />
                  {/* Overlay */}
                  {/* <div
                    className="absolute inset-0"
                    style={{
                      background: index === 0
                        ? 'rgba(0, 0, 0, 0.6)'
                        : index === 1
                        ? 'rgba(108, 117, 125, 0.8)'
                        : index === 2
                        ? 'rgba(139, 115, 85, 0.8)'
                        : index === 3
                        ? 'rgba(52, 73, 85, 0.8)'
                        : index === 4
                        ? 'rgba(74, 85, 104, 0.8)'
                        : 'rgba(113, 128, 150, 0.8)'
                    }}
                  /> */}
                </div>

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col justify-end p-4 sm:p-6 lg:p-8 text-white">
                  {/* Content - Title and description at bottom */}
                  <div>
                    <h3 className="text-2xl font-bold mb-2 md:mb-4 lg:text-3xl text-white leading-tight break-words">
                      {t(card.titleKey)}
                    </h3>
                    <p className="text-lg md:text-base font-graphik text-white lg:text-xl leading-relaxed opacity-90 break-words">
                      {t(card.descriptionKey)}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Duplicate set for seamless loop */}
            {cards.map((card, index) => (
              <div
                key={`second-${card.id}`}
                className="flex-none w-[60%] md:w-[80%] sm:w-1/2 lg:w-2/12 relative group"
                style={{ minHeight: '410px' }}
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <Image
                    src={card.image}
                    alt={t(card.titleKey)}
                    fill
                    className="object-cover"
                    style={{ filter: 'grayscale(30%)' }}
                    sizes="16.67vw"
                    draggable={false}
                  />
                  {/* Overlay */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: index === 0
                        ? 'rgba(0, 0, 0, 0.6)'
                        : index === 1
                        ? 'rgba(108, 117, 125, 0.8)'
                        : index === 2
                        ? 'rgba(139, 115, 85, 0.8)'
                        : index === 3
                        ? 'rgba(52, 73, 85, 0.8)'
                        : index === 4
                        ? 'rgba(74, 85, 104, 0.8)'
                        : 'rgba(113, 128, 150, 0.8)'
                    }}
                  />
                </div>

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col justify-end p-4 sm:p-6 lg:p-8 text-white">
                  {/* Content - Title and description at bottom */}
                  <div>
                    <h3 className="text-2xl font-bold mb-2 md:mb-4 lg:text-3xl text-white leading-tight break-words">
                      {t(card.titleKey)}
                    </h3>
                    <p className="text-lg md:text-base font-graphik text-white lg:text-xl leading-relaxed opacity-90 break-words">
                      {t(card.descriptionKey)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        @keyframes scroll-banner {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll-banner {
          animation: scroll-banner 40s linear infinite;
        }
        .animate-scroll-banner:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default WhyResetClub;
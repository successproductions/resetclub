'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';

const WhyResetClub: React.FC = () => {
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
      const walk = (x - startX) * 2; // Multiply by 2 for faster scrolling
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
      title: "Nos valeurs signatures",
      description: "Nous vous donnons le pouvoir de façonner votre santé avec les connaissances et les conseils, en veillant à ce que vous deveniez l'architecte ultime de votre bien-être.",
      image: "https://shawellness.com/wp-content/uploads/2025/01/5.png",
      iconUrl: "https://shawellness.com/wp-content/uploads/2025/01/1-01.svg"
    },
    {
      id: 2,
      title: "Innovation",
      description: "Découvrez l'excellence à travers des destinations de rêve, des installations de pointe, une hospitalité exceptionnelle et des soins chaleureux de l'équipe dédiée RESET CLUB™.",
      image: "https://shawellness.com/wp-content/uploads/2025/01/4.png",
      iconUrl: "https://shawellness.com/wp-content/uploads/2025/01/1-02.svg"
    },
    {
      id: 3,
      title: "Transformation",
      description: "Leaders mondiaux en optimisation de la santé et de la longévité depuis près de deux décennies, servant 100 000 clients dans le monde avec innovation et reconnaissance prestigieuse.",
      image: "https://shawellness.com/wp-content/uploads/2025/01/6.png",
      iconUrl: "https://shawellness.com/wp-content/uploads/2025/01/1-03.svg"
    },
    {
      id: 4,
      title: "Excellence",
      description: "Technologies de pointe et analyses avancées pour fournir des diagnostics, mesurer les biomarqueurs pour identifier les opportunités d'optimisation et prévenir les maladies.",
      image: "https://shawellness.com/wp-content/uploads/2025/01/2.png",
      iconUrl: "https://shawellness.com/wp-content/uploads/2025/01/1-04.svg"
    },
    {
      id: 5,
      title: "Approche Holistique",
      description: "Une méthode complète qui intègre le corps, l'esprit et l'âme pour une transformation durable et profonde de votre bien-être global.",
      image: "https://shawellness.com/wp-content/uploads/2025/01/3.png",
      iconUrl: "https://shawellness.com/wp-content/uploads/2025/01/1-05.svg"
    },
    {
      id: 6,
      title: "Méthode Signature",
      description: "Notre approche unique In-Out-Reset vous aide à découvrir vos vraies limites et solutions pour une transformation authentique et durable.",
      image: "https://shawellness.com/wp-content/uploads/2025/01/1.png",
      iconUrl: "https://shawellness.com/wp-content/uploads/2025/01/1-06.svg"
    }
  ];

  return (
    <section className="pt-16 bg-white">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
          POURQUOI RESET CLUB EST UNIQUE ?
        </h2>
        <p className="text-lg text-gray-600 max-w-4xl">
          Vous avez tout essayé… Ici, vous découvrez vos vraies limites & solutions avec la méthode signature In—Out—Reset
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
                className="flex-none w-[60%] md:w-[80%] sm:w-1/2 lg:w-2/12 relative group"
                style={{ minHeight: '450px' }}
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover"
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
                <div className="relative z-10 h-full flex flex-col p-4 sm:p-6 lg:p-8 text-white">
                  {/* Icon - Large on the left */}
                  <div className="flex-shrink-0 mb-3 sm:mb-4 lg:mb-6">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 flex items-center justify-start">
                      <Image
                        src={card.iconUrl}
                        alt={card.title}
                        width={64}
                        height={64}
                        className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16"
                        draggable={false}
                      />
                    </div>
                  </div>

                  {/* Content - Title and description below icon */}
                  <div>
                    <h3 className="text-2xl font-bold mb-4 leading-tight break-words">
                      {card.title}
                    </h3>
                    <p className="text-sm md:text-base leading-relaxed opacity-90 break-words">
                      {card.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Duplicate set for seamless loop */}
            {cards.map((card, index) => (
              <div
                key={`second-${card.id}`}
                className="flex-none w-[40%] md:w-[80%] sm:w-1/2 lg:w-2/12 relative group"
                style={{ minHeight: '410px' }}
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover"
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
                <div className="relative z-10 h-full flex flex-col p-4 sm:p-6 lg:p-8 text-white">
                  {/* Icon - Large on the left */}
                  <div className="flex-shrink-0 mb-3 sm:mb-4 lg:mb-6">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 flex items-center justify-start">
                      <Image
                        src={card.iconUrl}
                        alt={card.title}
                        width={64}
                        height={64}
                        className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16"
                        draggable={false}
                      />
                    </div>
                  </div>

                  {/* Content - Title and description below icon */}
                  <div>
                    <h3 className="text-2xl font-bold mb-4 leading-tight break-words">
                      {card.title}
                    </h3>
                    <p className="text-sm md:text-base leading-relaxed opacity-90 break-words">
                      {card.description}
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
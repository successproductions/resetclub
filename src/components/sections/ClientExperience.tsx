'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';

interface ExperienceItemProps {
  title: string;
  description: string;
  isActive: boolean;
  onClick: () => void;
}

function ExperienceItem({ title, description, isActive, onClick }: ExperienceItemProps) {
  return (
    <div className="border-b border-black/10">
      <button
        onClick={onClick}
        className="w-full py-6 flex items-center justify-between text-left transition-all hover:bg-black/5"
      >
        <span className="text-base md:text-lg font-semibold font-graphik text-black uppercase tracking-wide">
          {title}
        </span>
        <ChevronDown
          className={`w-6 h-6 text-black transition-transform duration-300 ${
            isActive ? 'rotate-180' : ''
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isActive ? 'max-h-96 opacity-100 mb-6' : 'max-h-0 opacity-0'
        }`}
      >
        <p className="text-black/70 leading-relaxed px-2 text-base font-graphik">
          {description}
        </p>
      </div>
    </div>
  );
}

export default function ClientExperience() {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const experiences = [
    {
      title: 'Diagnostic exclusif',
      description: 'Un bilan complet pour découvrir ce qui freine vos résultats – énergie, émotions, silhouette.',
    },
    {
      title: 'Protocole personnalisé',
      description: 'Un parcours conçu pour vous, basé sur notre signature In • Out • Reset™.',
    },
    {
      title: 'Suivi & bilans d\'étape',
      description: 'Un accompagnement 360°, avec des ajustements réguliers et une écoute permanente.',
    },
    {
      title: 'Célébration',
      description: 'Chaque transformation est reconnue et célébrée, parce que vos victoires comptent.',
    },
  ];

  const handleToggle = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <section className="relative min-h-[75dvh] flex items-center justify-center bg-white px-6">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Side - Content */}
          <div>
            {/* Header */}
            <div className="mb-12">
              <p className="text-xs md:text-sm uppercase tracking-[0.3em] text-black/50 mb-4 font-graphik">
                PRECISION IN MOTION
              </p>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-graphik text-black mb-6 leading-tight">
                L&apos;expérience client
              </h2>
              <p className="text-lg md:text-xl text-black/70 leading-relaxed font-graphik">
                Reset Club vous accompagne à chaque étape, avec une méthode exclusive qui allie diagnostic précis, protocoles personnalisés et célébration de vos victoires.
              </p>
            </div>

            {/* Dropdown Items */}
            <div className="space-y-2">
              {experiences.map((experience, index) => (
                <ExperienceItem
                  key={index}
                  title={experience.title}
                  description={experience.description}
                  isActive={activeIndex === index}
                  onClick={() => handleToggle(index)}
                />
              ))}
            </div>
          </div>

          {/* Right Side - Circles - Hidden on Mobile */}
          <div className="hidden lg:flex relative items-center justify-center min-h-[600px]">
            <div className="relative w-full max-w-[500px] aspect-square">
              {/* Circle Grid */}
              <div className="absolute inset-0 flex flex-wrap items-center justify-center gap-8">
                {experiences.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleToggle(index)}
                    className={`relative rounded-full transition-all duration-500 ${
                      activeIndex === index
                        ? 'w-56 h-56 md:w-64 md:h-64 scale-110'
                        : 'w-32 h-32 md:w-40 md:h-40 hover:scale-110'
                    }`}
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src={activeIndex === index ? "/images/orberesetclub.png" : "/images/orberesetclub2.png"}
                        alt="Reset Club Orb"
                        fill
                        className={`object-contain ${
                          activeIndex === index ? 'animate-pulse' : ''
                        }`}
                      />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

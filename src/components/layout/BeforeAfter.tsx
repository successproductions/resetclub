'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

const BeforeAfter: React.FC = () => {
  const t = useTranslations('BeforeAfter');
  const testimonials = [
    {
      id: 1,
      beforeImage: "https://revealweightlossmd.com/wp-content/uploads/2025/04/before-after-case-2.png",
      beforeWeight: "95 kg",
      afterWeight: "68 kg",
      weightLoss: "27 kg",
      timeframe: "6 mois",
      name: "Sarah M.",
      age: 32
    },
    {
      id: 2,
      beforeImage: "https://revealweightlossmd.com/wp-content/uploads/2025/04/before-after-case-3.png",
      beforeWeight: "88 kg",
      afterWeight: "63 kg",
      weightLoss: "25 kg",
      timeframe: "5 mois",
      name: "Hamza L.",
      age: 28
    },
    {
      id: 3,
      beforeImage: "https://revealweightlossmd.com/wp-content/uploads/2025/04/before-after-case-1.png",
      beforeWeight: "102 kg",
      afterWeight: "72 kg",
      weightLoss: "30 kg",
      timeframe: "8 mois",
      name: "Jennifer K.",
      age: 35
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 text-center ">
          {t('title')}
        </h2>
        <p className="text-lg text-gray-600 max-w-4xl mx-auto  text-center ">
          {t('subtitle')}
        </p>
      </div>

      {/* Testimonials Grid */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Image Container */}
              <div className="relative h-80 overflow-hidden">
                <Image
                  src={testimonial.beforeImage}
                  alt={`Transformation de ${testimonial.name}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {/* Gradient Overlay for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Before/After Labels */}
                <div className="absolute top-4 left-4">
                  <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-800">
                    AVANT
                  </div>
                </div>
                <div className="absolute top-4 right-4">
                  <div className="bg-green-500/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-white">
                    APRÈS
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Stats Row */}
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">
                      {testimonial.beforeWeight}
                    </div>
                    <div className="text-xs text-gray-500 uppercase tracking-wide">
                      Avant
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      -{testimonial.weightLoss}
                    </div>
                    <div className="text-xs text-gray-500 uppercase tracking-wide">
                      Perte
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">
                      {testimonial.afterWeight}
                    </div>
                    <div className="text-xs text-gray-500 uppercase tracking-wide">
                      Après
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-gray-200 mb-4" />

                {/* Client Info */}
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {testimonial.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {testimonial.age} ans • Transformation en {testimonial.timeframe}
                  </p>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Success Quote */}
      <div className="max-w-4xl mx-auto px-6 mt-16 text-center">
        <blockquote className="text-xl md:text-2xl font-light text-gray-700 italic">
          "{t('quote')}"
        </blockquote>
        
      </div>
    </section>
  );
};

export default BeforeAfter;
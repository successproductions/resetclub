'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

const BeforeAfter: React.FC = () => {
  const t = useTranslations('BeforeAfter');
  const [currentIndex, setCurrentIndex] = useState(0);

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

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  return (
    <section className="py-8 bg-white">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-6 mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center ">
          {t('subtitle').toUpperCase()}
        </h2>
        
      </div>

      {/* Desktop Grid */}
      <div className="hidden md:block max-w-7xl mx-auto px-6">
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

      {/* Mobile Slider */}
      <div className="md:hidden max-w-sm mx-auto px-6">
        <div className="relative">
          {/* Single Card */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* Image Container */}
            <div className="relative h-80 overflow-hidden">
              <Image
                src={testimonials[currentIndex].beforeImage}
                alt={`Transformation de ${testimonials[currentIndex].name}`}
                fill
                className="object-cover"
                sizes="100vw"
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
                    {testimonials[currentIndex].beforeWeight}
                  </div>
                  <div className="text-xs text-gray-500 uppercase tracking-wide">
                    Avant
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    -{testimonials[currentIndex].weightLoss}
                  </div>
                  <div className="text-xs text-gray-500 uppercase tracking-wide">
                    Perte
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">
                    {testimonials[currentIndex].afterWeight}
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
                  {testimonials[currentIndex].name}
                </h3>
                <p className="text-sm text-gray-600">
                  {testimonials[currentIndex].age} ans • Transformation en {testimonials[currentIndex].timeframe}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
            aria-label="Previous testimonial"
          >
            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
            aria-label="Next testimonial"
          >
            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-6 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                index === currentIndex
                  ? 'bg-[#ccbaa8] w-6'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Success Quote */}
      <div className="max-w-4xl mx-auto px-6 mt-16 text-center">
        <blockquote className="text-xl md:text-2xl font-light text-gray-700 italic">
          &ldquo;{t('quote')}&rdquo;
        </blockquote>

        {/* CTA Button */}
        <div className="mt-8">
          <Link
            href="/contact"
            className="inline-block bg-[#c26d4c] text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#2b8a7c] cursor-pointer transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
          >
            {t('cta')}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfter;
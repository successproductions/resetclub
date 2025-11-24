'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';

interface Question {
  id: number;
  question: string;
  placeholder?: string;
  type: 'text' | 'number' | 'email' | 'choice' | 'slider';
  choices?: { label: string; value: string }[];
  conditionalId?: number; // For conditional questions
  showIf?: string; // Show this question if answer to conditionalId matches this
}

const questions: Question[] = [
  {
    id: 1,
    question: 'Quel âge as-tu ?',
    type: 'choice',
    choices: [
      { label: '18–24', value: 'A' },
      { label: '25–34', value: 'B' },
      { label: '35–44', value: 'C' },
      { label: '45–54', value: 'D' },
      { label: '55+', value: 'E' }
    ]
  },
  {
    id: 2,
    question: 'Connais-tu la coach Nahed Rachad ?',
    type: 'choice',
    choices: [
      { label: 'Oui, je la suis déjà', value: 'A' },
      { label: 'J\'en ai entendu parler', value: 'B' },
      { label: 'Non, pas encore', value: 'C' }
    ]
  },
  {
    id: 3,
    question: 'Comment as-tu entendu parler de cette masterclass ?',
    type: 'choice',
    choices: [
      { label: 'Instagram RESET Club', value: 'A' },
      { label: 'Instagram Nahed', value: 'B' },
      { label: 'TikTok', value: 'C' },
      { label: 'Recommandation', value: 'D' },
      { label: 'Autre', value: 'E' }
    ]
  },
  {
    id: 4,
    question: 'Connais-tu le concept du biohacking ?',
    type: 'choice',
    choices: [
      { label: 'Oui', value: 'A' },
      { label: 'Non', value: 'B' },
      { label: 'Un peu, mais je veux mieux comprendre', value: 'C' }
    ]
  },
  {
    id: 5,
    question: 'Quel est ton objectif principal aujourd\'hui ?',
    type: 'choice',
    choices: [
      { label: 'Perdre de la graisse durablement', value: 'A' },
      { label: 'Retrouver mon énergie', value: 'B' },
      { label: 'Améliorer mon sommeil', value: 'C' },
      { label: 'Réduire mon stress / rééquilibrer mes hormones', value: 'D' },
      { label: 'Booster ma confiance / mon pouvoir personnel', value: 'E' }
    ]
  },
  {
    id: 6,
    question: 'As-tu déjà visité un centre bien-être ou biohacking au Maroc ou ailleurs ?',
    type: 'choice',
    choices: [
      { label: 'Oui', value: 'A' },
      { label: 'Non', value: 'B' }
    ]
  },
  {
    id: 7,
    question: 'Qu\'as-tu le plus apprécié ?',
    placeholder: 'Tape ta réponse ici...',
    type: 'text',
    conditionalId: 6,
    showIf: 'Oui'
  },
  {
    id: 8,
    question: 'Dirais-tu que tu galères à perdre du gras malgré tes efforts ?',
    type: 'choice',
    choices: [
      { label: 'Oui, totalement', value: 'A' },
      { label: 'Un peu', value: 'B' },
      { label: 'Non, ce n\'est pas mon problème principal', value: 'C' }
    ]
  },
  {
    id: 9,
    question: 'Quel niveau d\'énergie as-tu en général ?',
    type: 'slider'
  },
  {
    id: 10,
    question: 'Si tu devais choisir UNE priorité RESET à travailler d\'abord, ce serait…',
    type: 'choice',
    choices: [
      { label: 'Corps & silhouette', value: 'A' },
      { label: 'Sommeil & récupération', value: 'B' },
      { label: 'Nutrition & métabolisme', value: 'C' },
      { label: 'Énergie & vitalité', value: 'D' },
      { label: 'Stress & gestion mentale', value: 'E' },
      { label: 'Confiance & pouvoir personnel', value: 'F' }
    ]
  }
];

export default function MasterClassRegistration() {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState('');

  // Refs for video section
  const progressBarRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const ctaButtonRef = useRef<HTMLButtonElement>(null);

  // Refs for survey section
  const badgeRef = useRef<HTMLDivElement>(null);
  const surveyHeadingRef = useRef<HTMLDivElement>(null);
  const questionCardRef = useRef<HTMLDivElement>(null);

  // Redirect to master-class on refresh
  useEffect(() => {
    const handleBeforeUnload = () => {
      router.push('/master-class');
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [router]);

  // Video section animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Animate progress bar
      tl.fromTo(
        progressBarRef.current,
        { opacity: 0, y: -30 },
        { opacity: 1, y: 0, duration: 0.8 }
      );

      // Animate heading
      tl.fromTo(
        headingRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.4'
      );

      // Animate description
      tl.fromTo(
        descriptionRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        '-=0.3'
      );

      // Animate video container
      tl.fromTo(
        videoRef.current,
        { opacity: 0, scale: 0.9, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 1 },
        '-=0.2'
      );

      // Animate CTA button
      tl.fromTo(
        ctaButtonRef.current,
        { opacity: 0, scale: 0.8, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.8 },
        '-=0.4'
      );

      // Add continuous pulse to CTA button
      gsap.to(ctaButtonRef.current, {
        scale: 1.05,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 1.5
      });
    });

    return () => ctx.revert();
  }, []);

  // Survey section animation when scrolling
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const ctx = gsap.context(() => {
              const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

              // Animate badge
              tl.fromTo(
                badgeRef.current,
                { opacity: 0, scale: 0.8, y: 20 },
                { opacity: 1, scale: 1, y: 0, duration: 0.6 }
              );

              // Animate heading
              tl.fromTo(
                surveyHeadingRef.current,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.8 },
                '-=0.3'
              );

              // Animate question card
              tl.fromTo(
                questionCardRef.current,
                { opacity: 0, y: 40, scale: 0.95 },
                { opacity: 1, y: 0, scale: 1, duration: 1 },
                '-=0.4'
              );
            });

            return () => ctx.revert();
          }
        });
      },
      { threshold: 0.2 }
    );

    const surveySection = document.getElementById('survey-section');
    if (surveySection) {
      observer.observe(surveySection);
    }

    return () => {
      if (surveySection) {
        observer.unobserve(surveySection);
      }
    };
  }, []);

  // Animate question card when question changes
  useEffect(() => {
    if (questionCardRef.current) {
      gsap.fromTo(
        questionCardRef.current,
        { x: 20, opacity: 0.7 },
        { x: 0, opacity: 1, duration: 0.4, ease: 'power2.out' }
      );
    }
  }, [currentQuestionIndex]);

  const handleInputChange = (value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questions[currentQuestionIndex].id]: value
    }));
    setError('');
  };

  const goToNextQuestion = () => {
    const currentAnswer = answers[questions[currentQuestionIndex].id];

    if (!currentAnswer || currentAnswer.trim() === '') {
      setError('Veuillez répondre à cette question');
      return;
    }

    if (currentQuestionIndex < questions.length - 1) {
      let nextIndex = currentQuestionIndex + 1;

      // Check if next question is conditional and should be skipped
      while (nextIndex < questions.length) {
        const nextQuestion = questions[nextIndex];
        if (nextQuestion.conditionalId && nextQuestion.showIf) {
          const conditionalAnswer = answers[nextQuestion.conditionalId];
          if (conditionalAnswer !== nextQuestion.showIf) {
            nextIndex++; // Skip this question
            continue;
          }
        }
        break;
      }

      setCurrentQuestionIndex(nextIndex);
      setError('');
    } else {
      // All questions answered - check consent and submit
      if (!consent) {
        setError('Vous devez accepter d\'être contacté pour continuer');
        return;
      }
      handleSubmit();
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      let prevIndex = currentQuestionIndex - 1;

      // Check if previous question is conditional and should be skipped
      while (prevIndex >= 0) {
        const prevQuestion = questions[prevIndex];
        if (prevQuestion.conditionalId && prevQuestion.showIf) {
          const conditionalAnswer = answers[prevQuestion.conditionalId];
          if (conditionalAnswer !== prevQuestion.showIf) {
            prevIndex--; // Skip this question
            continue;
          }
        }
        break;
      }

      setCurrentQuestionIndex(prevIndex);
      setError('');
    }
  };

  const handleSubmit = async () => {
    // Save answers to localStorage or send to API here if needed
    console.log('Survey answers:', answers);
    console.log('Consent:', consent);

    // Redirect to Step 2
    router.push('/master-class/step-2');
  };

  const scrollToSurvey = () => {
    const surveySection = document.getElementById('survey-section');
    if (surveySection) {
      surveySection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const currentQuestion = questions[currentQuestionIndex];
  const currentAnswer = answers[currentQuestion.id] || '';

  return (
    <div className="relative bg-black">
      {/* Top Warning Banner - Fixed */}
      <div className="fixed top-0 left-0 w-full bg-[#51b1aa] py-3 px-4 z-50">
        <p className="text-black text-center font-bold text-sm md:text-base uppercase tracking-wide">
          NE FERME PAS OU N&apos;ACTUALISE PAS CETTE PAGE !
        </p>
      </div>

      {/* Video Section */}
      <main id="video-section" className="relative min-h-screen bg-black flex flex-col items-center justify-center px-4 font-graphik">
        {/* Content Container */}
        <div className="w-full max-w-4xl mx-auto mt-10 md:mt-0">
          {/* Progress Bar */}
          <div ref={progressBarRef} className="w-full mb-2 md:mb-8">
            <div className="relative w-full h-6 bg-gray-800 rounded-full overflow-hidden border-1 border-gray-700">
              <div
                className="absolute top-0 left-0 h-full bg-[#51b1aa] transition-all duration-500"
                style={{ width: '60%' }}
              >
                <div className="absolute right-2 top-1/2 -translate-y-1/2 text-black text-xs font-medium">
                  60%
                </div>
              </div>
            </div>
          </div>

          {/* Main Heading */}
          <h1 ref={headingRef} className="text-white text-center mb-4">
            <span className="text-2xl md:text-4xl font-normal">Ton inscription est </span>
            <span className="text-[#cbb9a7] text-2xl md:text-4xl font-medium">presque terminée...</span>
          </h1>

          <p ref={descriptionRef} className="text-white text-center mb-8 text-sm md:text-base max-w-2xl mx-auto">
            Regarde la vidéo ci-dessous pour finaliser ton inscription et remplis le questionnaire<br />
            pour confirmer ta place dans la Masterclass
          </p>

          {/* Video Container */}
          <div ref={videoRef} className="relative w-full aspect-video bg-gray-900 rounded-sm overflow-hidden mb-8">
            <iframe
              src="https://www.youtube.com/embed/7lECIsRif10"
              title="Master Class Video"
              className="absolute inset-0 w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          {/* Progress Bar (bottom) */}
          {/* <div className="w-full mb-8">
            <div className="relative w-full h-2 bg-gray-800 rounded-full overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full bg-[#cbb9a7] transition-all duration-500"
                style={{ width: '60%' }}
              />
            </div>
          </div> */}

          {/* CTA Button */}
          <button
            ref={ctaButtonRef}
            onClick={scrollToSurvey}
            className="w-full max-w-md mx-auto block text-white font-medium text-lg md:text-xl! py-4 px-8 rounded-xl transition-all duration-300 cursor-pointer uppercase"
            style={{
              background: 'linear-gradient(290deg, rgb(145, 219, 211) 0%, rgb(81, 177, 170) 30.2858%, rgb(145, 219, 211) 67.2878%, rgb(81, 177, 170) 100%)'
            }}
          >
            REMPLIS LE QUESTIONNAIRE POUR REJOINDRE
          </button>
        </div>
      </main>

      {/* Survey Section */}
      <section id="survey-section" className="relative min-h-screen bg-black flex flex-col items-center justify-center px-4 font-graphik pt-10 md:pt-20">
      {/* Content Container */}
      <div className="w-full max-w-2xl mx-auto">
        {/* Step Badge */}
        <div ref={badgeRef} className="text-center mb-6">
          <span className="inline-block bg-[#51b1aa]/80 text-[#cbb9a7] px-4 py-1 rounded-full text-sm font-semibold uppercase tracking-wider">
            ÉTAPE 2
          </span>
        </div>

        {/* Heading */}
        <div ref={surveyHeadingRef}>
          <h2 className="text-white text-center text-2xl! md:text-3xl mb-2">
            Masterclass Exclusive  

          </h2>
          <h2 className="text-center text-2xl! md:text-3xl mb-12">
            <span className="text-white">Les Secrets du Biohacking Féminin </span>
            <span className="text-[#cbb9a7] font-semibold">Animée par Nahed Rachad</span>
          </h2>
        </div>

        {/* Question Card */}
        <div ref={questionCardRef} className="bg-white rounded-sm p-5 md:p-10 shadow-2xl">
          {/* Question Number and Text */}
          <div className="mb-6">
            <div className="flex items-start gap-3 md:mb-4">
              <span className="text-xl font-medium   text-gray-800">
                {currentQuestionIndex + 1} →
              </span>
              <h3 className="text-xl! font-medium text-gray-800">
                {currentQuestion.question}
                <span className="text-red-500">*</span>
              </h3>
            </div>
            {currentQuestion.type === 'slider' && (
              <p className="text-gray-600 text-sm ml-8">
                Déplace le curseur pour sélectionner ton niveau d&apos;énergie (1 = épuisée, 10 = pleine d&apos;énergie)
              </p>
            )}
            {currentQuestion.type !== 'choice' && currentQuestion.type !== 'slider' && (
              <p className="text-gray-600 text-sm ml-8">
                Tape ta réponse ci-dessous.
              </p>
            )}
          </div>

          {/* Choice Questions */}
          {currentQuestion.type === 'choice' && currentQuestion.choices ? (
            <div className="mb-6 space-y-4">
              {currentQuestion.choices.map((choice) => (
                <button
                  key={choice.value}
                  onClick={() => {
                    handleInputChange(choice.label);
                  }}
                  className={`w-full text-left px-6 py-4 rounded-sm border-2 transition-all duration-200 ${
                    currentAnswer === choice.label
                      ? 'border-black bg-gray-100'
                      : 'border-gray-300 bg-white hover:border-[#51b1aa]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="flex-shrink-0 w-8 h-8 text-black flex items-center justify-center border-2 border-gray-700 rounded text-sm font-medium">
                      {choice.value}
                    </span>
                    <span className="text-lg font-normal text-gray-800">
                      {choice.label}
                    </span>
                  </div>
                </button>
              ))}

              {/* OK Button for choices */}
              <div className="flex items-center gap-2 mt-6">
                <button
                  onClick={goToNextQuestion}
                  className="bg-[#cbb9a7] hover:bg-[#51b1aa] text-white font-bold text-lg px-8 py-3 rounded-md transition-colors"
                >
                  OK
                </button>
              </div>
            </div>
          ) : currentQuestion.type === 'slider' ? (
            /* Slider for energy level */
            <div className="mb-6">
              <div className="mb-4">
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={currentAnswer || '5'}
                  onChange={(e) => handleInputChange(e.target.value)}
                  className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#51b1aa]"
                  style={{
                    background: `linear-gradient(to right, #51b1aa 0%, #51b1aa ${((parseInt(currentAnswer || '5') - 1) / 9) * 100}%, #e5e7eb ${((parseInt(currentAnswer || '5') - 1) / 9) * 100}%, #e5e7eb 100%)`
                  }}
                />
              </div>
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>1 - Épuisée</span>
                <span className="text-2xl font-bold text-[#51b1aa]">{currentAnswer || '5'}</span>
                <span>10 - Pleine d&apos;énergie</span>
              </div>

              {/* OK Button */}
              <div className="flex items-center gap-2 mt-6">
                <button
                  onClick={goToNextQuestion}
                  className="bg-[#cbb9a7] hover:bg-[#51b1aa] text-white font-bold text-lg px-8 py-3 rounded-md transition-colors"
                >
                  OK
                </button>
              </div>
            </div>
          ) : (
            /* Input Field for text/number questions */
            <div className="mb-6">
              <input
                type={currentQuestion.type}
                value={currentAnswer}
                onChange={(e) => handleInputChange(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    goToNextQuestion();
                  }
                }}
                placeholder={currentQuestion.placeholder}
                className="w-full px-0 py-3 border-b-2 border-gray-300 focus:border-black outline-none text-gray-800 text-3xl md:text-4xl font-normal transition-colors"
              />

              {/* OK Button */}
              <div className="flex items-center gap-2 mt-6">
                <button
                  onClick={goToNextQuestion}
                  className="bg-[#cbb9a7] hover:bg-[#51b1aa] text-white font-medium text-sm px-4 py-1.5 rounded-sm transition-colors"
                >
                  OK
                </button>
                <span className="text-gray-500 text-sm">
                  press <span className="font-semibold">Enter ↵</span>
                </span>
              </div>
            </div>
          )}

          {/* Consent Checkbox - Show only on last question */}
          {currentQuestionIndex === questions.length - 1 && (
            <div className="mb-6 mt-8 p-4 bg-gray-50 rounded-lg">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => {
                    setConsent(e.target.checked);
                    setError('');
                  }}
                  className="mt-1 w-5 h-5 text-[#51b1aa] border-gray-300 rounded focus:ring-[#51b1aa] cursor-pointer"
                />
                <span className="text-gray-700 text-sm leading-relaxed">
                  J&apos;autorise RESET Club™ à me contacter par WhatsApp / Email pour confirmer ma place dans la Masterclass.
                  <span className="text-red-500">*</span>
                </span>
              </label>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-6 flex items-center gap-2 text-red-500 text-sm bg-red-50 px-4 py-2 rounded">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              {error}
            </div>
          )}

          {/* Navigation Buttons */}
          {currentQuestionIndex === questions.length - 1 ? (
            /* Submit button on last question */
            <div className="mt-8">
              <button
                onClick={goToNextQuestion}
                className="w-full text-white font-bold text-lg md:text-xl py-4 px-8 rounded-lg transition-all duration-300 hover:scale-105"
                style={{
                  background: 'linear-gradient(290deg, rgb(145, 219, 211) 0%, rgb(81, 177, 170) 30.2858%, rgb(145, 219, 211) 67.2878%, rgb(81, 177, 170) 100%)'
                }}
              >
                CONFIRMER MON ACCÈS À LA MASTERCLASS
              </button>
            </div>
          ) : (
            /* Navigation arrows for other questions */
            <div className="flex items-center justify-end gap-2">
              {currentQuestionIndex > 0 && (
                <button
                  onClick={goToPreviousQuestion}
                  className="p-2 bg-[#cbb9a7] hover:bg-[#51b1aa] rounded transition-colors"
                  aria-label="Previous question"
                >
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                </button>
              )}
              <button
                onClick={goToNextQuestion}
                className="p-2 bg-[#cbb9a7] hover:bg-[#51b1aa] rounded transition-colors"
                aria-label="Next question"
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* Footer Text */}
        <div className="mt-12 text-center text-gray-500 text-xs space-y-1">
          <p>
            <a href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</a>
            {' | '}
            <a href="#" className="hover:text-gray-300 transition-colors">Terms & Conditions</a>
          </p>
          <p className="max-w-xl mx-auto">
            This site is not a part of the Facebook website or Facebook Inc. Additionally, This site is NOT endorsed by Facebook in any way. FACEBOOK is a trademark of FACEBOOK Inc.
          </p>
          <p>©2025 resetclub.ma, All Rights Reserved.</p>
        </div>
      </div>
      </section>
    </div>
  );
}

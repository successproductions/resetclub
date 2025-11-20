'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';

interface Question {
  id: number;
  question: string;
  placeholder?: string;
  type: 'text' | 'number' | 'email' | 'choice';
  choices?: { label: string; value: string }[];
}

const questions: Question[] = [
  {
    id: 1,
    question: 'How old are you?',
    placeholder: 'Type your answer here...',
    type: 'number'
  },
  {
    id: 2,
    question: 'Have you ever tried any other online business models before?',
    type: 'choice',
    choices: [
      { label: "No, I haven't tried any business models", value: 'A' },
      { label: 'Yes, I have tried other online business models before', value: 'B' }
    ]
  },
  {
    id: 3,
    question: 'What is your biggest health challenge right now?',
    placeholder: 'Type your answer here...',
    type: 'text'
  },
  {
    id: 4,
    question: 'What would you like to achieve in the next 3 months?',
    placeholder: 'Type your answer here...',
    type: 'text'
  }
];

export default function MasterClassRegistration() {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
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
      setError('Oops! Please enter a value');
      return;
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setError('');
    } else {
      // All questions answered - submit and redirect
      handleSubmit();
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setError('');
    }
  };

  const handleSubmit = async () => {
    // Save survey data to localStorage or API
    console.log('Survey answers:', answers);

    // Redirect to WhatsApp group or thank you page
    // For now, redirect back to master-class
    router.push('/master-class');
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
      <div className="fixed top-0 left-0 w-full bg-[#e3bd93] py-3 px-4 z-50">
        <p className="text-black text-center font-bold text-sm md:text-base uppercase tracking-wide">
          DO NOT CLOSE OR REFRESH THIS PAGE!
        </p>
      </div>

      {/* Video Section */}
      <main id="video-section" className="relative min-h-screen bg-black flex flex-col items-center justify-center px-4 font-graphik">
        {/* Content Container */}
        <div className="w-full max-w-4xl mx-auto mt-10 md:mt-0">
          {/* Progress Bar */}
          <div ref={progressBarRef} className="w-full mb-2 md:mb-8">
            <div className="relative w-full h-6 bg-gray-800 rounded-full overflow-hidden border-2 border-[#00ff00]">
              <div
                className="absolute top-0 left-0 h-full bg-[#00ff00] transition-all duration-500"
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
            <span className="text-2xl md:text-4xl font-normal">Your registration is </span>
            <span className="text-[#e3bd93] text-2xl md:text-4xl font-medium">almost complete....</span>
          </h1>

          <p ref={descriptionRef} className="text-white text-center mb-8 text-sm md:text-base max-w-2xl mx-auto">
            Watch the video below to finish your registration and fill out the survey<br />
            to download the Challenge Workbooks inside the WhatsApp Group
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
                className="absolute top-0 left-0 h-full bg-[#e3bd93] transition-all duration-500"
                style={{ width: '60%' }}
              />
            </div>
          </div> */}

          {/* CTA Button */}
          <button
            ref={ctaButtonRef}
            onClick={scrollToSurvey}
            className="w-full max-w-md mx-auto block bg-[#e3bd93] hover:bg-[#e6ed00] text-black font-medium text-lg py-4 px-8 rounded-sm transition-all duration-300 uppercase"
          >
            FILL OUT SURVEY TO JOIN 
          </button>
        </div>
      </main>

      {/* Survey Section */}
      <section id="survey-section" className="relative min-h-screen bg-black flex flex-col items-center justify-center px-4 font-graphik pt-10 md:pt-20">
      {/* Content Container */}
      <div className="w-full max-w-2xl mx-auto">
        {/* Step Badge */}
        <div ref={badgeRef} className="text-center mb-6">
          <span className="inline-block bg-[#00ff00]/20 text-[#e3bd93] px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider">
            STEP 2
          </span>
        </div>

        {/* Heading */}
        <div ref={surveyHeadingRef}>
          <h2 className="text-white text-center text-2xl! md:text-3xl mb-2">
            Fill Out The Quick Survey Below To Get Access To
          </h2>
          <h2 className="text-center text-2xl! md:text-3xl mb-12">
            <span className="text-white">The </span>
            <span className="text-[#e3bd93] font-bold">Free Resources Inside</span>
            <span className="text-white"> The </span>
            <span className="text-[#e3bd93] font-bold">WhatsApp Group</span>
          </h2>
        </div>

        {/* Question Card */}
        <div ref={questionCardRef} className="bg-white rounded-sm p-8 md:p-10 shadow-2xl">
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
            {currentQuestion.type !== 'choice' && (
              <p className="text-gray-600 text-sm ml-8">
                Please enter <span className="font-semibold">your {currentQuestion.type === 'number' ? 'age' : 'answer'}</span> {currentQuestion.type === 'number' ? 'in years' : ''}.
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
                      : 'border-gray-300 bg-white hover:border-gray-200'
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
                  className="bg-[#e3bd93] hover:bg-[#e6ed00] text-black font-bold text-lg px-8 py-3 rounded-md transition-colors"
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
                  className="bg-[#e3bd93] hover:bg-[#e6ed00] text-black font-medium text-sm px-4 py-1.5 rounded-sm transition-colors"
                >
                  OK
                </button>
                <span className="text-gray-500 text-sm">
                  press <span className="font-semibold">Enter ↵</span>
                </span>
              </div>
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
          <div className="flex items-center justify-end gap-2">
            {currentQuestionIndex > 0 && (
              <button
                onClick={goToPreviousQuestion}
                className="p-2 bg-[#e3bd93] hover:bg-[#e6ed00] rounded transition-colors"
                aria-label="Previous question"
              >
                <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
              </button>
            )}
            <button
              onClick={goToNextQuestion}
              className="p-2 bg-[#e3bd93] hover:bg-[#e6ed00] rounded transition-colors"
              aria-label="Next question"
            >
              <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
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

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface Question {
  id: number;
  question: string;
  placeholder: string;
  type: 'text' | 'number' | 'email';
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
    question: 'What is your biggest health challenge right now?',
    placeholder: 'Type your answer here...',
    type: 'text'
  },
  {
    id: 3,
    question: 'What would you like to achieve in the next 3 months?',
    placeholder: 'Type your answer here...',
    type: 'text'
  },
  {
    id: 4,
    question: 'On a scale of 1-10, how committed are you to transforming your health?',
    placeholder: 'Type your answer here...',
    type: 'number'
  }
];

export default function MasterClassRegistration() {
  const router = useRouter();
  const [currentSection, setCurrentSection] = useState<'video' | 'survey'>('video');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [error, setError] = useState('');
  const [videoWatched, setVideoWatched] = useState(false);

  // Redirect to master-class on refresh
  useEffect(() => {
    const handleBeforeUnload = () => {
      router.push('/master-class');
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [router]);

  // Simulate video progress
  useEffect(() => {
    if (currentSection === 'video') {
      const timer = setTimeout(() => {
        setVideoWatched(true);
      }, 3000); // Simulate video starting
      return () => clearTimeout(timer);
    }
  }, [currentSection]);

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

  const currentQuestion = questions[currentQuestionIndex];
  const currentAnswer = answers[currentQuestion.id] || '';

  if (currentSection === 'video') {
    return (
      <main className="relative min-h-screen bg-black flex flex-col items-center justify-center px-4 font-graphik">
        {/* Top Warning Banner */}
        <div className="fixed top-0 left-0 w-full bg-[#f7ff00] py-3 px-4 z-50">
          <p className="text-black text-center font-bold text-sm md:text-base uppercase tracking-wide">
            DO NOT CLOSE OR REFRESH THIS PAGE!
          </p>
        </div>

        {/* Content Container */}
        <div className="w-full max-w-4xl mx-auto mt-16">
          {/* Progress Bar */}
          <div className="w-full mb-8">
            <div className="relative w-full h-3 bg-gray-800 rounded-full overflow-hidden border-2 border-[#00ff00]">
              <div
                className="absolute top-0 left-0 h-full bg-[#00ff00] transition-all duration-500"
                style={{ width: '60%' }}
              >
                <div className="absolute right-2 top-1/2 -translate-y-1/2 text-black text-xs font-bold">
                  60%
                </div>
              </div>
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-white text-center mb-4">
            <span className="text-2xl md:text-4xl font-normal">Your registration is </span>
            <span className="text-[#00ff00] text-2xl md:text-4xl font-bold">almost complete....</span>
          </h1>

          <p className="text-white text-center mb-8 text-sm md:text-base max-w-2xl mx-auto">
            Watch the video below to finish your registration and fill out the survey<br />
            to download the Challenge Workbooks inside the WhatsApp Group
          </p>

          {/* Video Container */}
          <div className="relative w-full aspect-video bg-gray-900 rounded-lg overflow-hidden mb-8">
            <Image
              src="/images/master/nd-image.png"
              alt="Video thumbnail"
              fill
              className="object-cover"
            />

            {/* Video Overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <div className="text-center">
                <div className="bg-[#f7ff00]/90 rounded-lg p-6 mb-4">
                  <div className="flex items-center justify-center mb-2">
                    <svg className="w-12 h-12 text-black" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2-8c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2z"/>
                      <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" opacity="0.3"/>
                    </svg>
                  </div>
                  <p className="text-black font-bold text-lg">
                    {videoWatched ? 'Your video has already started' : 'Click to listen'}
                  </p>
                </div>
                <p className="text-white text-sm">
                  I&apos;ve left a very quick survey<br />
                  for you to fill out.
                </p>
              </div>
            </div>
          </div>

          {/* Progress Bar (bottom) */}
          <div className="w-full mb-8">
            <div className="relative w-full h-2 bg-gray-800 rounded-full overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full bg-[#00ff00] transition-all duration-500"
                style={{ width: '60%' }}
              />
            </div>
          </div>

          {/* CTA Button */}
          <button
            onClick={() => setCurrentSection('survey')}
            className="w-full max-w-md mx-auto block bg-[#f7ff00] hover:bg-[#e6ed00] text-black font-bold text-lg py-4 px-8 rounded-lg transition-all duration-300 uppercase"
          >
            FILL OUT SURVEY TO JOIN THE GROUP
          </button>
        </div>
      </main>
    );
  }

  // Survey Section
  return (
    <main className="relative min-h-screen bg-black flex flex-col items-center justify-center px-4 font-graphik">
      {/* Content Container */}
      <div className="w-full max-w-2xl mx-auto">
        {/* Step Badge */}
        <div className="text-center mb-6">
          <span className="inline-block bg-[#00ff00]/20 text-[#00ff00] px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider">
            STEP 2
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-white text-center text-2xl md:text-3xl mb-2">
          Fill Out The Quick Survey Below To Get Access To
        </h2>
        <h2 className="text-center text-2xl md:text-3xl mb-12">
          <span className="text-white">The </span>
          <span className="text-[#00ff00] font-bold">Free Resources Inside</span>
          <span className="text-white"> The </span>
          <span className="text-[#00ff00] font-bold">WhatsApp Group</span>
        </h2>

        {/* Question Card */}
        <div className="bg-white rounded-lg p-8 md:p-10 shadow-2xl">
          {/* Question Number and Text */}
          <div className="mb-6">
            <div className="flex items-start gap-3 mb-4">
              <span className="text-xl font-bold text-gray-800">
                {currentQuestionIndex + 1} →
              </span>
              <h3 className="text-xl font-bold text-gray-800">
                {currentQuestion.question}
                <span className="text-red-500">*</span>
              </h3>
            </div>
            <p className="text-gray-600 text-sm ml-8">
              Please enter <span className="font-semibold">your {currentQuestion.type === 'number' ? 'age' : 'answer'}</span> {currentQuestion.type === 'number' ? 'in years' : ''}.
            </p>
          </div>

          {/* Input Field */}
          <div className="mb-6">
            <input
              type={currentQuestion.type}
              value={currentAnswer}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder={currentQuestion.placeholder}
              className="w-full px-4 py-3 border-b-2 border-gray-300 focus:border-black outline-none text-gray-800 text-lg transition-colors"
            />
          </div>

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
                className="p-2 bg-[#f7ff00] hover:bg-[#e6ed00] rounded transition-colors"
                aria-label="Previous question"
              >
                <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
              </button>
            )}
            <button
              onClick={goToNextQuestion}
              className="p-2 bg-[#f7ff00] hover:bg-[#e6ed00] rounded transition-colors"
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
          <p>©2025 Educate.io, All Rights Reserved.</p>
        </div>
      </div>
    </main>
  );
}

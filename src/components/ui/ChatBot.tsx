'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

interface Message {
  id: number;
  type: 'bot' | 'user';
  text: string;
  options?: { label: string; value: string }[];
  timestamp: Date;
}

interface ChatBotProps {
  onClose?: () => void;
  phoneNumber?: string;
}

export default function ChatBot({ onClose, phoneNumber = '+212600000000' }: ChatBotProps) {
  const t = useTranslations('ChatBot');
  const tWhatsApp = useTranslations('WhatsApp');
  const [messageIdCounter, setMessageIdCounter] = useState(2);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'bot',
      text: t('phase1.greeting'),
      timestamp: new Date(),
    },
  ]);
  const [currentPhase, setCurrentPhase] = useState(1);
  const [showTyping, setShowTyping] = useState(false);
  const [userChoice, setUserChoice] = useState<string>('');

  const addMessage = (text: string, type: 'bot' | 'user', options?: { label: string; value: string }[]) => {
    setMessages((prev) => {
      const newMessage: Message = {
        id: messageIdCounter,
        type,
        text,
        options,
        timestamp: new Date(),
      };
      setMessageIdCounter((prevId) => prevId + 1);
      return [...prev, newMessage];
    });
  };

  const handleUserChoice = (choice: string, label: string) => {
    // Add user's choice as a message
    addMessage(label, 'user');
    setUserChoice(choice);

    // Show typing indicator
    setShowTyping(true);

    // Simulate bot thinking time
    setTimeout(() => {
      setShowTyping(false);
      processChoice(choice);
    }, 1500);
  };

  const processChoice = (choice: string) => {
    switch (currentPhase) {
      case 1:
        // Phase 2: Identification du besoin dominant
        const phase2Response = t(`phase2.${choice}`);
        addMessage(phase2Response, 'bot');

        setTimeout(() => {
          // Phase 3: Présentation du Bilan Reset
          addMessage(t('phase3.intro'), 'bot');
          setTimeout(() => {
            addMessage(t('phase3.details'), 'bot');
            setTimeout(() => {
              addMessage(t('phase3.bonus'), 'bot', [
                { label: t('options.yes'), value: 'yes' },
                { label: t('options.no'), value: 'no' },
              ]);
              setCurrentPhase(3);
            }, 2000);
          }, 2000);
        }, 1500);
        break;

      case 3:
        // Phase 4: Humanisation
        if (choice === 'yes') {
          addMessage(t('phase4.presentation'), 'bot');
          setTimeout(() => {
            addMessage(t('phase4.philosophy'), 'bot');
            setTimeout(() => {
              // Phase 5: Call to Action
              addMessage(t('phase5.intro'), 'bot', [
                { label: t('phase5.bookNow'), value: 'book' },
                { label: t('phase5.talkToAdvisor'), value: 'talk' },
                { label: t('phase5.learnMore'), value: 'learn' },
              ]);
              setCurrentPhase(5);
            }, 2000);
          }, 2000);
        } else {
          // Skip to phase 5
          addMessage(t('phase5.intro'), 'bot', [
            { label: t('phase5.bookNow'), value: 'book' },
            { label: t('phase5.talkToAdvisor'), value: 'talk' },
            { label: t('phase5.learnMore'), value: 'learn' },
          ]);
          setCurrentPhase(5);
        }
        break;

      case 5:
        // Phase 5 actions
        if (choice === 'book') {
          // Navigate directly to WhatsApp (no popup blocker)
          const bookingMessage = t('bookingMessage');
          const whatsappUrl = `https://wa.me/${phoneNumber.replace(/\D/g, '')}?text=${encodeURIComponent(bookingMessage)}`;
          window.location.href = whatsappUrl;
        } else if (choice === 'talk') {
          // Navigate directly to WhatsApp (no popup blocker)
          const advisorMessage = t('advisorMessage');
          const whatsappUrl = `https://wa.me/${phoneNumber.replace(/\D/g, '')}?text=${encodeURIComponent(advisorMessage)}`;
          window.location.href = whatsappUrl;
        } else if (choice === 'learn') {
          // Show objection handling options
          addMessage(t('phase6.intro'), 'bot', [
            { label: t('phase6.hesitation'), value: 'hesitation' },
            { label: t('phase6.price'), value: 'price' },
            { label: t('phase6.distance'), value: 'distance' },
            { label: t('phase6.backToOptions'), value: 'back' },
          ]);
          setCurrentPhase(6);
        }
        break;

      case 6:
        // Phase 6: Micro-interactions
        if (choice === 'back') {
          addMessage(t('phase5.intro'), 'bot', [
            { label: t('phase5.bookNow'), value: 'book' },
            { label: t('phase5.talkToAdvisor'), value: 'talk' },
            { label: t('phase5.learnMore'), value: 'learn' },
          ]);
          setCurrentPhase(5);
        } else {
          const response = t(`phase6.${choice}Response`);
          addMessage(response, 'bot');

          // Offer mini reset program
          setTimeout(() => {
            addMessage(t('phase7.intro'), 'bot', [
              { label: t('phase7.getMiniReset'), value: 'getMini' },
              { label: t('phase5.bookNow'), value: 'book' },
            ]);
            setCurrentPhase(7);
          }, 2000);
        }
        break;

      case 7:
        // Phase 7: Bonus Mini Reset
        if (choice === 'getMini') {
          addMessage(t('phase7.gift'), 'bot');
          setTimeout(() => {
            addMessage(t('phase7.program'), 'bot');
            setTimeout(() => {
              addMessage(t('phase10.closing'), 'bot', [
                { label: t('phase5.bookNow'), value: 'book' },
              ]);
              setCurrentPhase(5);
            }, 2000);
          }, 1500);
        } else if (choice === 'book') {
          // Navigate directly to WhatsApp (no popup blocker)
          const bookingMessage = t('bookingMessage');
          const whatsappUrl = `https://wa.me/${phoneNumber.replace(/\D/g, '')}?text=${encodeURIComponent(bookingMessage)}`;
          window.location.href = whatsappUrl;
        }
        break;

      default:
        break;
    }
  };

  return (
    <div className="flex flex-col h-full bg-white font-graphik">
      {/* Header */}
      <div className="bg-white text-[#52422e] px-6 py-4 flex items-center justify-between border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white flex items-center justify-center">
            <Image
                                src="/images/logogras.png"
                                alt="Reset Club Logo"
                                width={32}
                                height={32}
                                className="object-contain"
                              />
          </div>
          <div>
            <p className="font-graphik font-medium text-xl text-[#52422e]">Nahed - Reset Club</p>
            <p className="text-sm text-[#52422e] font-graphik">{t('subtitle')}</p>
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-[#52422e] hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-white">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] px-4 py-3 ${
                message.type === 'user'
                  ? 'bg-white text-[#52422e] border border-[#52422e]'
                  : 'bg-white text-[#52422e] border border-gray-200'
              }`}
            >
              <p className="text-sm whitespace-pre-line font-graphik">{message.text}</p>

              {/* Options */}
              {message.options && message.type === 'bot' && (
                <div className="mt-3 space-y-2">
                  {message.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleUserChoice(option.value, option.label)}
                      className="w-full text-left px-4 py-2 bg-white hover:bg-gray-50 text-[#52422e] transition-colors text-sm font-medium border border-[#52422e] font-graphik"
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {showTyping && (
          <div className="flex justify-start">
            <div className="bg-white px-4 py-3 border border-gray-200">
              <div className="flex items-center space-x-1">
                <div className="typing-dots">
                  <div className="dot dot1"></div>
                  <div className="dot dot2"></div>
                  <div className="dot dot3"></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Initial Options */}
      {currentPhase === 1 && messages.length === 1 && (
        <div className="p-6 bg-white border-t border-gray-200 space-y-2">
          <p className="text-sm text-[#52422e] mb-3 font-graphik">{t('phase1.question')}</p>
          <button
            onClick={() => handleUserChoice('weightLoss', t('phase1.weightLoss'))}
            className="w-full px-4 py-3 bg-white hover:bg-gray-50 text-[#52422e] border border-[#52422e] transition-colors text-sm font-medium font-graphik"
          >
            {t('phase1.weightLoss')}
          </button>
          <button
            onClick={() => handleUserChoice('energy', t('phase1.energy'))}
            className="w-full px-4 py-3 bg-white hover:bg-gray-50 text-[#52422e] border border-[#52422e] transition-colors text-sm font-medium font-graphik"
          >
            {t('phase1.energy')}
          </button>
          <button
            onClick={() => handleUserChoice('balance', t('phase1.balance'))}
            className="w-full px-4 py-3 bg-white hover:bg-gray-50 text-[#52422e] border border-[#52422e] transition-colors text-sm font-medium font-graphik"
          >
            {t('phase1.balance')}
          </button>
        </div>
      )}

      {/* Styles */}
      <style jsx>{`
        @keyframes typing-dot {
          0%, 60%, 100% {
            transform: translateY(0);
            opacity: 0.4;
          }
          30% {
            transform: translateY(-10px);
            opacity: 1;
          }
        }

        .typing-dots {
          display: flex;
          align-items: center;
          gap: 2px;
        }

        .dot {
          width: 8px;
          height: 8px;
          background-color: #9ca3af;
          border-radius: 50%;
          animation: typing-dot 1.4s infinite ease-in-out;
        }

        .dot1 {
          animation-delay: 0s;
        }

        .dot2 {
          animation-delay: 0.2s;
        }

        .dot3 {
          animation-delay: 0.4s;
        }
      `}</style>
    </div>
  );
}

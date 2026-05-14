'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { X } from 'lucide-react';

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

export default function ChatBot({ onClose }: ChatBotProps) {
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

    // Show typing indicator
    setShowTyping(true);

    // Simulate bot thinking time
    setTimeout(() => {
      setShowTyping(false);
      processChoice(choice);
    }, 1500);
  };

  const showBilan = () => {
    addMessage(t('bilan.presentation'), 'bot', [
      { label: t('bilan.book'), value: 'book' },
      { label: t('bilan.talk'), value: 'talk' },
      { label: t('bilan.question'), value: 'question' },
    ]);
    setCurrentPhase(3);
  };

  const showClosing = () => {
    setTimeout(() => {
      addMessage(t('closing'), 'bot');
    }, 1200);
  };

  const showBookResponse = () => {
    addMessage(t('responses.book'), 'bot');
    showClosing();
  };

  const showTalkResponse = () => {
    addMessage(t('responses.talk'), 'bot');
    showClosing();
  };

  const processChoice = (choice: string) => {
    switch (currentPhase) {
      case 1:
        addMessage(t(`goalResponses.${choice}`), 'bot', [
          { label: t('buttons.discoverBilan'), value: 'discoverBilan' },
        ]);
        setCurrentPhase(2);
        break;

      case 2:
        if (choice === 'discoverBilan') {
          showBilan();
        }
        break;

      case 3:
        if (choice === 'book') {
          showBookResponse();
        } else if (choice === 'talk') {
          showTalkResponse();
        } else if (choice === 'question') {
          addMessage(t('questions.intro'), 'bot', [
            { label: t('questions.hesitation'), value: 'hesitation' },
            { label: t('questions.price'), value: 'price' },
            { label: t('questions.distance'), value: 'distance' },
          ]);
          setCurrentPhase(4);
        }
        break;

      case 4:
        if (choice === 'hesitation') {
          addMessage(t('questions.hesitationResponse'), 'bot', [
            { label: t('questions.reserveAfterHesitation'), value: 'book' },
            { label: t('questions.talkAfterHesitation'), value: 'talk' },
          ]);
          setCurrentPhase(5);
        } else if (choice === 'price') {
          addMessage(t('questions.priceResponse'), 'bot', [
            { label: t('questions.talkAfterPrice'), value: 'talk' },
            { label: t('questions.reserveAfterPrice'), value: 'book' },
          ]);
          setCurrentPhase(5);
        } else if (choice === 'distance') {
          addMessage(t('questions.distanceResponse'), 'bot', [
            { label: t('questions.contactTeam'), value: 'talk' },
          ]);
          setCurrentPhase(5);
        }
        break;

      case 5:
        if (choice === 'book') {
          showBookResponse();
        } else if (choice === 'talk') {
          showTalkResponse();
        }
        break;

      default:
        break;
    }
  };

  return (
    <div className="flex flex-col h-full bg-white font-graphik">
      {/* Header */}
      <div className="bg-[#5b5148] text-white px-5 py-4 flex items-center justify-between border-b border-white/10">
        <div className="flex items-center space-x-3">
          <div className="relative flex h-11 w-11 items-center justify-center rounded-full bg-[#f5efe8]">
            <Image
              src="/images/logogras.png"
              alt="Reset Club Logo"
              width={30}
              height={30}
              className="object-contain"
            />
            
          </div>
          <div>
            <p className="font-graphik text-base font-semibold leading-tight text-white">Assistante RESET</p>
            <p className="text-xs text-white/65 font-graphik">{t('subtitle')}</p>
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            aria-label={tWhatsApp('closeLabel')}
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto space-y-4 bg-[#fbf8f4] p-4 sm:p-5">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[84%] rounded-[6px] px-4 py-3 shadow-sm ${
                message.type === 'user'
                  ? 'bg-[#111111] text-white'
                  : 'bg-white text-gray-900 border border-black/10'
              }`}
            >
              <p className="text-sm leading-relaxed whitespace-pre-line font-graphik">{message.text}</p>

              {/* Options */}
              {message.options && message.type === 'bot' && (
                <div className="mt-3 space-y-2">
                  {message.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleUserChoice(option.value, option.label)}
                      className="w-full rounded-[5px] border border-black/15 bg-[#f5efe8] px-4 py-2.5 text-left font-graphik text-sm! font-medium text-gray-950 transition-colors hover:border-black hover:bg-white"
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
            <div className="rounded-[6px] border border-black/10 bg-white px-4 py-3 shadow-sm">
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
        <div className="space-y-2 border-t border-black/10 bg-white p-4 sm:p-5">
          <button
            onClick={() => handleUserChoice('weightLoss', t('buttons.weightLoss'))}
            className="w-full rounded-[5px] border border-black/15 bg-[#111111] px-4 py-3 font-graphik text-sm! font-semibold text-white transition-colors hover:bg-black"
          >
            {t('buttons.weightLoss')}
          </button>
          <button
            onClick={() => handleUserChoice('energy', t('buttons.energy'))}
            className="w-full rounded-[5px] border border-black/15 bg-[#f5efe8] px-4 py-3 font-graphik text-sm! font-medium text-gray-950 transition-colors hover:border-black hover:bg-white"
          >
            {t('buttons.energy')}
          </button>
          <button
            onClick={() => handleUserChoice('balance', t('buttons.balance'))}
            className="w-full rounded-[5px] border border-black/15 bg-[#f5efe8] px-4 py-3 font-graphik text-sm! font-medium text-gray-950 transition-colors hover:border-black hover:bg-white"
          >
            {t('buttons.balance')}
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

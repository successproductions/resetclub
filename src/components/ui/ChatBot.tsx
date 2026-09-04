'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { ExternalLink, MessageCircle, X } from 'lucide-react';

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

const phoneNumberPattern = /^\+\s*212(?:[\s-]*\d){9}$/;

const renderInlineLinkedText = (text: string, fallbackPhoneNumber: string) => {
  const parts = text.split(/(https?:\/\/[^\s]+|\+\s*212(?:[\s-]*\d){9})/g);

  return parts.map((part, index) => {
    const isUrl = /^https?:\/\//.test(part);
    const isPhoneNumber = /^\+\s*212/.test(part);

    if (!isUrl && !isPhoneNumber) {
      return part;
    }

    const linkedPhoneNumber = part.replace(/\D/g, '') || fallbackPhoneNumber.replace(/\D/g, '');
    const href = isUrl ? part : `https://wa.me/${linkedPhoneNumber}`;

    return (
      <a
        key={`${part}-${index}`}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex max-w-full items-baseline gap-1 whitespace-nowrap font-semibold text-[#2d8f88] underline decoration-[#2d8f88]/45 underline-offset-2 transition-colors hover:text-[#1f6f69] ${isUrl ? 'text-[13px]' : ''}`}
      >
        <span>{part}</span>
        <ExternalLink className="h-3 w-3 shrink-0" aria-hidden="true" />
      </a>
    );
  });
};

const renderLinkedText = (text: string, fallbackPhoneNumber: string) => {
  const lines = text.split('\n');

  return lines.map((line, index) => {
    const trimmedLine = line.trim();
    const isStandalonePhoneNumber = phoneNumberPattern.test(trimmedLine);
    const linkedPhoneNumber = trimmedLine.replace(/\D/g, '') || fallbackPhoneNumber.replace(/\D/g, '');

    return (
      <React.Fragment key={`${line}-${index}`}>
        {isStandalonePhoneNumber ? (
          <a
            href={`https://wa.me/${linkedPhoneNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-[5px] bg-[#111111] px-4 py-2.5 font-semibold text-white no-underline transition-colors hover:bg-[#2d8f88]"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            <span>{trimmedLine}</span>
          </a>
        ) : (
          renderInlineLinkedText(line, fallbackPhoneNumber)
        )}
        {index < lines.length - 1 && <br />}
      </React.Fragment>
    );
  });
};

export default function ChatBot({
  onClose,
  phoneNumber = '+212689464650',
}: ChatBotProps) {
  const t = useTranslations('ChatBot');
  const tWhatsApp = useTranslations('WhatsApp');
  const nextMessageId = useRef(2);
  const responseTimer = useRef<number | null>(null);
  const closingTimer = useRef<number | null>(null);
  const isRespondingRef = useRef(false);
  const messagesViewportRef = useRef<HTMLDivElement>(null);
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

  const addMessage = useCallback((text: string, type: 'bot' | 'user', options?: { label: string; value: string }[]) => {
    setMessages((prev) => {
      const newMessage: Message = {
        id: nextMessageId.current,
        type,
        text,
        options,
        timestamp: new Date(),
      };
      nextMessageId.current += 1;
      return [...prev, newMessage];
    });
  }, []);

  useEffect(() => {
    const viewport = messagesViewportRef.current;
    if (!viewport) return;

    const frame = window.requestAnimationFrame(() => {
      viewport.scrollTo({
        top: viewport.scrollHeight,
        behavior: messages.length > 1 ? 'smooth' : 'auto',
      });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [messages, showTyping]);

  useEffect(() => {
    return () => {
      if (responseTimer.current !== null) window.clearTimeout(responseTimer.current);
      if (closingTimer.current !== null) window.clearTimeout(closingTimer.current);
    };
  }, []);

  const showBilan = () => {
    addMessage(t('bilan.presentation'), 'bot', [
      { label: t('bilan.book'), value: 'book' },
      { label: t('bilan.talk'), value: 'talk' },
      { label: t('bilan.question'), value: 'question' },
    ]);
    setCurrentPhase(3);
  };

  const showClosing = () => {
    isRespondingRef.current = true;
    setShowTyping(true);
    closingTimer.current = window.setTimeout(() => {
      addMessage(t('closing'), 'bot');
      setShowTyping(false);
      isRespondingRef.current = false;
      closingTimer.current = null;
    }, 900);
  };

  const showBookResponse = () => {
    addMessage(t('responses.book'), 'bot');
    showClosing();
  };

  const showTalkResponse = () => {
    addMessage(t('responses.talk'), 'bot');
    showClosing();
  };

  const processChoice = (choice: string, phase: number) => {
    switch (phase) {
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

  const handleUserChoice = (choice: string, label: string, sourceMessageId?: number) => {
    if (isRespondingRef.current) return;

    isRespondingRef.current = true;
    setShowTyping(true);

    if (sourceMessageId !== undefined) {
      setMessages((currentMessages) =>
        currentMessages.map((message) =>
          message.id === sourceMessageId ? { ...message, options: undefined } : message
        )
      );
    }

    addMessage(label, 'user');
    const selectedPhase = currentPhase;

    responseTimer.current = window.setTimeout(() => {
      setShowTyping(false);
      isRespondingRef.current = false;
      responseTimer.current = null;
      processChoice(choice, selectedPhase);
    }, 900);
  };

  return (
    <div className="flex h-full min-h-0 flex-col bg-white font-graphik">
      {/* Header */}
      <div className="flex shrink-0 items-center justify-between border-b border-white/10 bg-[#5b5148] px-5 py-4 text-white">
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

      {/* Messages  */}
      <div
        ref={messagesViewportRef}
        className="min-h-0 flex-1 overflow-y-auto overscroll-contain bg-[#fbf8f4] p-4 [scrollbar-gutter:stable] sm:p-5"
      >
        <div className="flex flex-col gap-4">
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
              <p className="text-sm leading-relaxed whitespace-pre-line font-graphik">
                {renderLinkedText(message.text, phoneNumber)}
              </p>

              {/* Options */}
              {message.options && message.type === 'bot' && (
                <div className="mt-3 space-y-2">
                  {message.options.map((option, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleUserChoice(option.value, option.label, message.id)}
                      disabled={showTyping}
                      className="w-full rounded-[5px] border border-black/15 bg-[#f5efe8] px-4 py-2.5 text-left font-graphik text-sm! font-medium text-gray-950 transition-colors hover:border-black hover:bg-white disabled:cursor-wait disabled:opacity-60"
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
          <div className="flex min-h-11 justify-start" role="status" aria-live="polite">
            <div className="flex h-11 w-[58px] items-center justify-center rounded-[6px] border border-black/10 bg-white shadow-sm">
              <span className="sr-only">...</span>
              <div className="typing-dots" aria-hidden="true">
                <span className="dot dot1" />
                <span className="dot dot2" />
                <span className="dot dot3" />
              </div>
            </div>
          </div>
        )}
        </div>
      </div>

      {/* Initial Options */}
      {currentPhase === 1 && messages.length === 1 && (
        <div className="space-y-2 border-t border-black/10 bg-white p-4 sm:p-5">
          <button
            type="button"
            onClick={() => handleUserChoice('weightLoss', t('buttons.weightLoss'))}
            disabled={showTyping}
            className="w-full rounded-[5px] border border-black/15 bg-[#111111] px-4 py-3 font-graphik text-sm! font-semibold text-white transition-colors hover:bg-black disabled:cursor-wait disabled:opacity-60"
          >
            {t('buttons.weightLoss')}
          </button>
          <button
            type="button"
            onClick={() => handleUserChoice('energy', t('buttons.energy'))}
            disabled={showTyping}
            className="w-full rounded-[5px] border border-black/15 bg-[#f5efe8] px-4 py-3 font-graphik text-sm! font-medium text-gray-950 transition-colors hover:border-black hover:bg-white disabled:cursor-wait disabled:opacity-60"
          >
            {t('buttons.energy')}
          </button>
          <button
            type="button"
            onClick={() => handleUserChoice('balance', t('buttons.balance'))}
            disabled={showTyping}
            className="w-full rounded-[5px] border border-black/15 bg-[#f5efe8] px-4 py-3 font-graphik text-sm! font-medium text-gray-950 transition-colors hover:border-black hover:bg-white disabled:cursor-wait disabled:opacity-60"
          >
            {t('buttons.balance')}
          </button>
        </div>
      )}

      {/* Styles */}
      <style jsx>{`
        @keyframes typing-dot {
          0%, 80%, 100% {
            transform: scale(0.65);
            opacity: 0.35;
          }
          40% {
            transform: scale(1);
            opacity: 1;
          }
        }

        .typing-dots {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .dot {
          width: 8px;
          height: 8px;
          background-color: #5b5148;
          border-radius: 50%;
          animation: typing-dot 1.2s infinite ease-in-out;
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

        @media (prefers-reduced-motion: reduce) {
          .dot {
            animation: none;
            opacity: 0.65;
          }
        }
      `}</style>
    </div>
  );
}

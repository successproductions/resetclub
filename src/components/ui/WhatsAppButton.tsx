'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Bot } from 'lucide-react';
import ChatBot from './ChatBot';

interface WhatsAppButtonProps {
  phoneNumber?: string;
  className?: string;
}

export default function WhatsAppButton({
  phoneNumber = '+212689464650',
  className = ''
}: WhatsAppButtonProps) {
  const t = useTranslations('WhatsApp');
  const [isOpen, setIsOpen] = useState(false);
  const hasInteracted = useRef(false);

  // useEffect(() => {
  //   const timer = window.setTimeout(() => {
  //     if (!hasInteracted.current) {
  //       setIsOpen(true);
  //     }
  //   }, 8000);

  //   return () => window.clearTimeout(timer);
  // }, []);

  const toggleWidget = () => {
    hasInteracted.current = true;
    setIsOpen((current) => !current);
  };

  return (
    <div className={`fixed bottom-5 right-4 z-50 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6 ${className}`}>
      {isOpen && (
        <div
          className="chatbot-panel w-[calc(100vw-2rem)] max-w-[390px] overflow-hidden rounded-md border border-black/10 bg-white shadow-2xl animate-fade-in"
        >
          <ChatBot
            onClose={() => setIsOpen(false)}
            phoneNumber={phoneNumber}
          />
        </div>
      )}

      <div className="relative">
        <div className="absolute -inset-1 rounded-full bg-[#cbb9a7]/40 blur-md" />
        <button
          onClick={toggleWidget}
          className="relative flex min-h-14 max-w-[calc(100vw-2rem)] cursor-pointer items-center gap-3 rounded-full border border-white/60 bg-[#111111] px-3 py-2 pr-4 text-white shadow-2xl transition-all duration-300 hover:-translate-y-0.5 hover:bg-black focus:outline-none focus:ring-2 focus:ring-[#cbb9a7] focus:ring-offset-2"
          aria-label={t('aria-label')}
          title={t('tooltip')}
        >
          <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#f5efe8] text-black shadow-inner">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#111111] text-[#f5efe8]">
              <Bot className="h-4.5 w-4.5" strokeWidth={1.9} />
            </span>
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-[#111111] bg-[#cbb9a7] text-[#111111]">
              {/* <Sparkles className="h-2.5 w-2.5" strokeWidth={2.4} /> */}
            </span>
          </span>
          <span className="hidden min-w-0 text-left leading-tight sm:block">
            <span className="block truncate text-sm font-semibold">{t('buttonText')}</span>
            <span className="block truncate text-[11px] text-white/70">{t('subtitle')}</span>
          </span>
        </button>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }

        .chatbot-panel {
          height: min(620px, calc(100vh - 7rem));
        }

        @media (max-width: 640px) {
          .chatbot-panel {
            height: min(78svh, calc(100vh - 5.5rem));
            max-height: 720px;
          }
        }
      `}</style>
    </div>
  );
}

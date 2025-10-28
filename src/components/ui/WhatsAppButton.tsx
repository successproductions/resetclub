'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import ChatBot from './ChatBot';

interface WhatsAppButtonProps {
  phoneNumber?: string;
  message?: string;
  className?: string;
}

export default function WhatsAppButton({
  phoneNumber = '+212600000000',
  message = '',
  className = ''
}: WhatsAppButtonProps) {
  const t = useTranslations('WhatsApp');
  const [isOpen, setIsOpen] = useState(false);
  const [showTyping, setShowTyping] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [showChatBot, setShowChatBot] = useState(false);

  const handleWhatsAppClick = () => {
    console.log('WhatsApp button clicked!');
    const defaultMessage = message || t('defaultMessage');
    const encodedMessage = encodeURIComponent(defaultMessage);
    const whatsappUrl = `https://wa.me/${phoneNumber.replace(/\D/g, '')}?text=${encodedMessage}`;
    console.log('Opening WhatsApp URL:', whatsappUrl);
    window.open(whatsappUrl, '_blank');
  };

  const toggleWidget = () => {
    setIsOpen(!isOpen);
    setShowChatBot(false); // Reset chatbot when toggling
    if (!isOpen) {
      // Reset animation states when opening
      setShowTyping(false);
      setShowMessages(false);

      // Start typing animation after a short delay
      setTimeout(() => {
        setShowTyping(true);
      }, 500);

      // Show messages after typing animation
      setTimeout(() => {
        setShowTyping(false);
        setShowMessages(true);
      }, 2500);
    }
  };

  return (
    <>
      <div className={`fixed bottom-6 right-6 z-50 ${className}`}>
        {/* Chat Widget with ChatBot - Positioned absolutely to not affect button position */}
        {isOpen && !showChatBot && (
          <div className="absolute bottom-16 right-0 w-80 md:w-96 bg-white rounded-2xl shadow-2xl overflow-hidden animate-fade-in">
            {/* Header */}
            <div className="bg-gray-950 text-white px-6 py-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center relative ">
                  <Image
                    src="/images/logogras.png"
                    alt="Reset Club Logo"
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                  {/* Online indicator */}
 <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-1 "></div>
                </div>
                <div>
                  <h3 className="font-medium text-sm text-gray-50">RESET CLUB</h3>
                  <p className="text-xs font-graphik text-gray-50">{t('subtitle')}</p>
                </div>
              </div>
              <button
                onClick={toggleWidget}
                className="text-gray-500 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Chat Content */}
            <div
              className="p-6 min-h-[300px] relative bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url('/whatssapImage.jpeg')`,
              }}
            >
              {/* Background overlay for better readability */}
              {/* <div className="absolute inset-0 bg-white/20 pointer-events-none"></div> */}

              {/* Time */}
              <div className="text-center mb-4">
                <span className="text-xs text-gray-500  px-2 py-1 rounded-full">
                  {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>

              {/* Chat Messages */}
              <div className="space-y-3 relative my-4 md:my-8">
                {/* Typing Indicator */}
                {showTyping && (
                  <div className="bg-white p-4 rounded-2xl rounded-bl-sm shadow-sm max-w-[20%] animate-fade-in">
                    <div className="flex items-center space-x-1">
                      <div className="typing-dots">
                        <div className="dot dot1"></div>
                        <div className="dot dot2"></div>
                        <div className="dot dot3"></div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Actual Messages */}
                {showMessages && (
                  <div className="bg-white font-graphik p-4 py-8 rounded-2xl rounded-bl-sm shadow-sm max-w-[85%] animate-slide-up">
                    <p className="text-gray-800 font-medium mb-2">
                      {t('welcomeTitle')}
                    </p>
                    <p className="text-gray-700 text-sm mb-3">
                      {t('welcomeMessage')}
                    </p>
                    <p className="text-gray-700 text-sm">
                      {t('helpMessage')}
                    </p>
                  </div>
                )}
              </div>

              {/* Start Chat Buttons */}
              {showMessages && (
                <div className="mt-6 space-y-2 animate-fade-in">
                  <button
                    onClick={() => {
                      setShowChatBot(true);
                    }}
                    className="w-full text-white py-3 px-6 flex bg-gray-950 items-center justify-center space-x-2 hover:opacity-90  cursor-pointer"
                    
                  >
                    <span className="text-2xl">🤖</span>
                    <span>{t('chatWithNahed')}</span>
                  </button>
                  <button
                    onClick={handleWhatsAppClick}
                    className="w-full bg-[#1d9e8c] hover:bg-[#20BA5A] text-white py-3 px-6 flex items-center justify-center space-x-2 transition-colors"
                  >
                    <svg className="w-5 h-5 " fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488"/>
                    </svg>
                    <span>{t('startChat')}</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ChatBot Modal */}
        {showChatBot && (
          <div className="absolute bottom-16 right-0 w-80 md:w-96 h-[600px] bg-white rounded-2xl shadow-2xl overflow-hidden animate-fade-in">
            <ChatBot
              onClose={() => {
                setShowChatBot(false);
              }}
              phoneNumber={phoneNumber}
            />
          </div>
        )}

        {/* Main WhatsApp Button - Pill Style */}
        <button
          onClick={toggleWidget}
          className="relative cursor-pointer bg-[#199e8e] hover:bg-[#128C7E] text-white px-4 py-3 md:px-6 md:py-3 rounded-full flex items-center space-x-3 md:space-x-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-sm md:text-base"
          aria-label={t('aria-label')}
        >
          {/* Notification Dot */}
          <div className="absolute -top-1 -right-1 w-2 h-2 md:w-3 md:h-3 bg-red-500 rounded-full"></div>

          {/* WhatsApp Icon */}
          <svg
            className="w-5 h-5 md:w-6 md:h-6 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488"/>
          </svg>

          {/* Text */}
          <span className="font-medium text-xs md:text-base">{t('buttonText')}</span>
        </button>
      </div>

      {/* Mobile optimization and animations */}
      <style jsx>{`
        @media (max-width: 768px) {
          .fixed {
            bottom: 1rem;
            right: 1rem;
          }
        }

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

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

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

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.5s ease-out;
        }

        .typing-dots {
          display: flex;
          align-items: center;
          space-between: 2px;
        }

        .dot {
          width: 8px;
          height: 8px;
          background-color: #9ca3af;
          border-radius: 50%;
          margin: 0 1px;
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
    </>
  );
}
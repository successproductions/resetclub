'use client';

import { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import ResetClubChatbot from './ResetClubChatbot';

export default function ChatbotButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-black text-white p-4 shadow-2xl hover:bg-black/90 transition-all duration-300 font-graphik"
        aria-label="Open chatbot"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Chatbot */}
      <ResetClubChatbot isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}

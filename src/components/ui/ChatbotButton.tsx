'use client';

import { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import ResetClubChatbot from './ResetClubChatbot';

export default function ChatbotButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
 
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-6 z-40 bg-black text-white p-4 shadow-2xl hover:bg-black/90 transition-all duration-300 font-graphik"
        aria-label="Open chatbot"
      >
        <MessageCircle className="w-6 h-6" />

        {/* Notification Badge */}
        <div className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
          1
        </div>
      </button>

      {/* Chatbot */}
      <ResetClubChatbot isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}

'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function WhatsAppJoin() {
  const [copied, setCopied] = useState(false);

  // Replace with your actual WhatsApp group link
  const whatsappGroupLink = 'https://chat.whatsapp.com/your-group-link';

  const handleJoinGroup = () => {
    window.open(whatsappGroupLink, '_blank');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(whatsappGroupLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative bg-white min-h-screen flex flex-col   px-4 py-12  font-graphik">
      <div className="w-full max-w-md mx-auto md:pt-10 px-1 md:px-8">
        {/* Profile Image */}
        <div className="flex justify-center mb-6">
          <div className="relative w-40 h-40 rounded-full overflow-hidden  shadow-lg">
            <Image
              src="/images/master/NAHED.png"
              alt="RESET Club"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Name/Title */}
        <h1 className="text-2xl md:text-3xl! font-medium text-gray-950 text-center mb-4 md:mb-8">
          Masterclass RESET Club
        </h1>

        {/* Join Group Button */}
        <button
          onClick={handleJoinGroup}
          className="w-full bg-gradient-to-r from-green-300 to-green-400 hover:from-green-500 hover:to-green-600 text-white font-medium text-base md:text-lg py-4 px-6 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg mb-2 md:mb-4"
        >
          Rejoindre le groupe
        </button>

        {/* Copy Link Button */}
        <button
          onClick={handleCopyLink}
          className="w-full bg-white border-2 border-gray-300 hover:bg-gray-50 text-gray-950 font-medium text-base md:text-lg py-4 px-6 rounded-xl transition-all duration-300 hover:scale-105 shadow-sm mb-4 md:mb-6"
        >
          {copied ? 'Lien copié !' : 'Copier le lien du groupe'}
        </button>

        {/* Instructions */}
        <div className="text-center mb-4 md:mb-6">
          <p className="text-gray-600 text-sm mb-1">
            Caso esteja com problemas para entrar no grupo,
          </p>
          <p className="text-gray-600 text-sm mb-1">
            abra o WhatsApp e cole o link em uma conversa.
          </p>
          <p className="text-gray-600 text-sm mb-1">
            Então clique no link para abrir direto no grupo.
          </p>
          <p className="text-[#51b1aa] text-sm font-semibold cursor-pointer hover:underline">
            Você pode clicar aqui para ver o QRCode.
          </p>
        </div>

        {/* QR Code */}
        <div className="flex justify-center">
          <div className="w-3/4 h-64   overflow-hidden shadow-lg">
            <div className="relative w-full h-full">
              <Image
                src="/images/master/qrcode-whatsapp.png"
                alt="QR Code WhatsApp"
                fill
                className="object-contain p-2"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ThankYouPage() {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Check on mount
    checkMobile();

    // Check on resize
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center  text-white px-6 py-20">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          key={isMobile ? 'mobile' : 'desktop'}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source
            src={isMobile ? '/videos/video_hero_mobile.mov' : '/videos/video_hero.mov'}
            type="video/mp4"
          />
        </video>
        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* Content */}
      <div className="relative z-20 text-center md:mt-26 md:max-w-5xl ">

        <h1 className="!text-[28px] md:!text-5xl font-light md:!mb-6 !mt-44 md:!mt-72 font-graphik font-normal drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          Merci Votre demande a bien été reçue
        </h1>

        <p className="!text-xl md:!text-2xl font-graphik text-white mb-1 md:!mb-8 leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          Votre transformation commence maintenant.
        </p>

        <div className="bg-white/5 border border-white/10 font-graphik p-2 md:p-8 mb-3 md:mb-8 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
   
          <p className="!text-xl md:!text-2xl font-normal text-white mb-1 md:mb-6 leading-relaxed">
           Prochaines étapes
          </p>

          <p className="!text-lg md:!text-2xl font-normal text-white  md:mb-6 leading-relaxed">
            Votre thérapeute vous contactera sous 24–48h pour fixer votre rdv<br></br> Vous êtes l’heureuse gagnante des 50 places offertes (valeur 1500 DH).<br></br> Vous pouvez accélérer via WhatsApp :
          </p>

          <div className="border-t border-white/10 pt-1 md:pt-6">
            <p className="!text-lg md:!text-2xl font-normal! text-white mb-1 md:mb-4">
               Parler à ma conseillère
            </p>
            <a
              href="https://wa.me/212600000000"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-3 bg-[#25D366] rounded-sm text-white font-medium font-graphik tracking-wider transition-all duration-300 hover:bg-[#20BA5A]"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              WhatsApp
            </a>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-white font-graphik text-sm drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            Un email de confirmation vient de vous être envoyé. <br></br>Bienvenue au RESET Club
          </p>
        </div>
      </div>
    </section>
  );
}

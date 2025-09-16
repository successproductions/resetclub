'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link, Instagram, Facebook, Youtube, Linkedin, Globe } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function LinktreePage() {
  const t = useTranslations('LinktreePage');
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate animation values based on scroll
  const logoOpacity = Math.max(0, 1 - scrollY / 150);
  const logoScale = Math.max(0.7, 1 - scrollY / 300);

  return (
    <div
      className="min-h-screen text-white relative"
      style={{
        background: `
          radial-gradient(circle at 30% 70%, rgba(204, 186, 168, 0.3) 0%, transparent 50%),
          linear-gradient(135deg, rgba(204, 186, 168, 0.2) 0%, transparent 40%, rgba(184, 163, 148, 0.2) 100%),
          linear-gradient(to bottom right, #ccbaa8, #ccbaa8, #b8a394)
        `
      }}
    >
      {/* Background Logo */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10">
        <Image
          src="/LOGO.png"
          alt="ResetClub Logo Background"
          width={600}
          height={580}
          className="object-contain"
        />
      </div>

      {/* Fixed Header Logo */}
      <div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-0">
        <div
          className=" flex items-center justify-center transition-all duration-300 ease-out"
          style={{
            opacity: logoOpacity,
            transform: `scale(${logoScale})`,
          }}
        >
          <Image
            src="/LOGO.png"
            alt="ResetClub Logo"
            width={320}
            height={256}
            className="object-contain"
          />
        </div>
      </div>


      {/* Scrollable Content */}
      <div className="max-w-md mx-auto px-4 sm:px-6 py-6 sm:py-8 relative z-10">
        {/* Header - space for logo initially */}
        <div className="text-center mb-8">
          {/* Invisible spacer for bigger logo */}
          <div className="w-64 h-44 md:h-56 mx-auto "></div>

          {/* Title and verified badge */}
          <div className="flex items-center justify-center mb-3">
            <h1 className="text-2xl font-bold">{t('title')}</h1>
            <div className="ml-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-sm text-white font-bold">✓</span>
            </div>
          </div>

          {/* Social Media Icons */}
          <div className="flex justify-center space-x-2 mb-4">
            <SocialIcon platform="instagram" />
            <SocialIcon platform="facebook" />
            <SocialIcon platform="tiktok" />
            <SocialIcon platform="youtube" />
            <SocialIcon platform="linkedin" />
            <SocialIcon platform="website" />
          </div>

          {/* Full name */}
          <p className="text-sm opacity-90 mb-2 font-medium">{t('fullName')}</p>

          {/* Mission/Slogan */}
          <p className="text-sm opacity-80 px-4 leading-relaxed">{t('slogan')}</p>
                  <div className="text-center text-sm opacity-80">
          <p className="mb-2">{t('contact')}</p>

        </div>

        </div>

        {/* Links as Image Cards */}
        <div className="space-y-3 mb-6 bg-gradient-to-br from-[#ccbaa8] via-[#ccbaa8] to-[#b8a394]">
          <PromoCard
            href="#"
            text={t('links.freeBilan')}
            imageUrl="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            height="tall"
            priority={true}
            hoverEffect="pulse"
          />

          <div className="grid grid-cols-2 gap-3">
            <PromoCard
              href="#"
              text={t('links.discover')}
              imageUrl="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              height="medium"
              hoverEffect="flip"
            />
            <PromoCard
              href="#"
              text={t('links.booking')}
              imageUrl="https://images.unsplash.com/photo-1551601651-2a8555f1a136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              height="medium"
              hoverEffect="slide"
            />
          </div>

          <PromoCard
            href="#"
            text={t('links.offers')}
            imageUrl="https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            height="regular"
            // priority={true}
            hoverEffect="glow"
          />

          <div className="grid grid-cols-2 gap-3">
            <PromoCard
              href="#"
              text={t('links.whatsapp')}
              imageUrl="https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              height="small"
              hoverEffect="bounce"
            />
            <PromoCard
              href="#"
              text={t('links.reviews')}
              imageUrl="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              height="small"
              hoverEffect="shake"
            />
          </div>

          <PromoCard
            href="#"
            text={t('links.location')}
            imageUrl="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            height="regular"
            hoverEffect="zoom"
          />
        </div>


      </div>
    </div>
  );
}

function PromoCard({
  href,
  text,
  imageUrl,
  height = "regular",
  priority = false,
  hoverEffect = "default"
}: {
  href: string;
  text: string;
  imageUrl: string;
  height?: "small" | "medium" | "regular" | "tall";
  priority?: boolean;
  hoverEffect?: "pulse" | "flip" | "slide" | "glow" | "bounce" | "shake" | "zoom" | "default";
}) {
  const getHeight = () => {
    switch (height) {
      case "small": return "h-32";
      case "medium": return "h-40";
      case "regular": return "h-48";
      case "tall": return "h-60";
      default: return "h-48";
    }
  };

  const getBorderGlow = () => {
    if (priority) {
      return "ring-2 ring-yellow-400/50 ring-offset-2 ring-offset-transparent";
    }
    return "";
  };

  const getHoverEffect = () => {
    switch (hoverEffect) {
      case "pulse":
        return "hover:animate-pulse hover:scale-[1.05] hover:shadow-2xl hover:shadow-yellow-400/30";
      case "flip":
        return "hover:rotate-y-12 hover:scale-[1.02] hover:-translate-y-2 hover:shadow-lg";
      case "slide":
        return "hover:translate-x-2 hover:-translate-y-3 hover:rotate-3 hover:scale-[1.03]";
      case "glow":
        return "hover:shadow-2xl hover:shadow-[#ccbaa8]/50 hover:ring-4 hover:ring-yellow-400/60 hover:scale-[1.04]";
      case "bounce":
        return "hover:animate-bounce hover:scale-[1.1] hover:shadow-xl";
      case "shake":
        return "hover:animate-pulse hover:rotate-2 hover:-rotate-2 hover:scale-[1.05]";
      case "zoom":
        return "hover:scale-[1.08] hover:-translate-y-4 hover:shadow-2xl hover:shadow-[#ccbaa8]/40";
      default:
        return "hover:scale-[1.03] hover:shadow-2xl hover:-translate-y-1";
    }
  };

  return (
    <a
      href={href}
      className={`block relative overflow-hidden rounded-2xl transition-all duration-500 shadow-xl group cursor-pointer
        ${getHoverEffect()} active:scale-[0.97]
        ${getBorderGlow()}
        ${priority ? 'hover:ring-yellow-400/70' : 'hover:ring-white/30 hover:ring-2'}
      `}
      style={{
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Background Image */}
      <div className={`relative ${getHeight()}`}>
        <Image
          src={imageUrl}
          alt={text}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Dynamic overlay that changes on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent
          group-hover:from-black/80 group-hover:via-black/40 transition-all duration-300"></div>

        {/* Lucide Link icon in top right */}
        <div className="absolute top-3 right-3 z-10 opacity-70 group-hover:opacity-100 transition-opacity duration-300">
          <Link className="w-5 h-5 text-white drop-shadow-lg" />
        </div>

        {/* Priority badge */}
        {priority && (
          <div className="absolute top-3 left-3 z-10">
            <div className="bg-yellow-400 text-black px-2 py-1 rounded-full text-xs font-bold">
              ⭐ PRIORITY
            </div>
          </div>
        )}

        {/* Text overlay with better positioning */}
        <div className="absolute inset-0 flex items-end justify-center text-center text-white p-4">
          <div className="transform transition-transform duration-300 group-hover:scale-105">
            <p className={`font-bold leading-tight drop-shadow-lg
              ${height === 'small' ? 'text-sm' : height === 'tall' ? 'text-lg' : 'text-base'}
            `}>
              {text}
            </p>

            {/* Hover underline */}
            <div className="w-0 h-0.5 bg-white mx-auto mt-2 transition-all duration-300 group-hover:w-full"></div>
          </div>
        </div>

        {/* Shimmer effect on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent
            transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
        </div>
      </div>
    </a>
  );
}

function SocialIcon({ platform }: { platform: string }) {
  const getIconAndBg = () => {
    switch (platform) {
      case 'instagram':
        return {
          icon: <Instagram className="w-4 h-4 text-white" />,
          bgClass: "bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 hover:from-purple-700 hover:via-pink-700 hover:to-orange-600"
        };
      case 'facebook':
        return {
          icon: <Facebook className="w-4 h-4 text-white" />,
          bgClass: "bg-blue-600 hover:bg-blue-700"
        };
      case 'tiktok':
        return {
          icon: <div className="w-4 h-4 text-[#ccbaa8] font-bold text-xs flex items-center justify-center">T</div>,
          bgClass: "bg-white hover:bg-white/90"
        };
      case 'youtube':
        return {
          icon: <Youtube className="w-4 h-4 text-[#ccbaa8]" />,
          bgClass: "bg-white hover:bg-white/90"
        };
      case 'linkedin':
        return {
          icon: <Linkedin className="w-4 h-4 text-[#ccbaa8]" />,
          bgClass: "bg-white hover:bg-white/90"
        };
      case 'website':
        return {
          icon: <Globe className="w-4 h-4 text-[#ccbaa8]" />,
          bgClass: "bg-white hover:bg-white/90"
        };
      default:
        return {
          icon: <Globe className="w-4 h-4 text-white" />,
          bgClass: "bg-gray-700 hover:bg-gray-800"
        };
    }
  };

  const { icon, bgClass } = getIconAndBg();

  return (
    <div className={`w-10 h-10 ${bgClass} rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer shadow-lg border-2 border-white/20`}>
      {icon}
    </div>
  );
}
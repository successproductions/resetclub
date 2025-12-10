'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link, Instagram, Facebook, Youtube, Linkedin, Globe } from 'lucide-react';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';
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
    <div className="min-h-screen text-white relative font-graphik ">
      {/* Background Images */}
      <div className="absolute inset-0">
        {/* Mobile Background */}
        <Image
          src="/PALMSBACKGORUNDMOBILE.jpg"
          alt="Reset Club Background Mobile"
          fill
          className="object-cover md:hidden"
          priority
        />
        {/* Desktop Background */}
        <Image
          src="/PALMSBACKGROUND.jpg"
          alt="Reset Club Background Desktop"
          fill
          className="object-cover hidden md:block"
          priority
        />
      </div>

      {/* Language Switcher - Fixed Top Right */}
      <div className="fixed top-4 right-4 z-50">
        <LanguageSwitcher variant="header" />
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
            src="/images/logogras.png"
            alt="ResetClub Logo"
            width={320}
            height={256}
            className="object-contain h-44  md:h-60"
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
          {/* <div className="flex items-center justify-center mb-3">
            <h1 className="text-2xl font-bold">{t('title')}</h1>
            <div className="ml-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-sm text-white font-bold">✓</span>
            </div>
          </div> */}

          {/* Social Media Icons */}
          <div className="flex justify-center space-x-2 mb-4">
            <SocialIcon platform="instagram" />
            <SocialIcon platform="facebook" />
            <SocialIcon platform="tiktok" />
            <SocialIcon platform="youtube" />
            <SocialIcon platform="linkedin" />
            <SocialIcon platform="website" />
          </div>
 <p className="text-lg md:text-lg opacity-90 pb-2 px-4 font-graphik font-normal leading-relaxed">2.4M Total Flollowers </p>
          {/* Full name */}
          <p className="text-sm opacity-90 mb-2 font-medium">{t('fullName')}</p>

          {/* Mission/Slogan */}
         
                  <div className="text-center text-sm opacity-80">
          <p className="mb-2">{t('contact')}</p>

        </div>

        </div>

        {/* Links as Image Cards */}
        <div className="space-y-3 mb-6 font-graphik ">
          <PromoCard
            href="#"
            text={t('links.freeBilan')}
            imageUrl="/images/OUT2.png"
            height="tall"
            priority={true}
            hoverEffect="pulse"
          />


            <PromoCard
              href="#"
              text={t('links.discover')}
              imageUrl="/images/REST.jpg"
            height="regular"
            hoverEffect="zoom"
            />
            <PromoCard
              href="#"
              text={t('links.booking')}
              imageUrl="/images/linktree2.jpg"
            height="regular"
            hoverEffect="zoom"
            />


          <PromoCard
            href="#"
            text={t('links.offers')}
            imageUrl="/images/offerLinktree.png"
            height="regular"

            hoverEffect="zoom"
          />
            <PromoCard
              href="#"
              text={t('links.whatsapp')}
              imageUrl="/images/WhatsappLinktree.jpg"
            height="regular"
            hoverEffect="zoom"
            />
            <PromoCard
              href="#"
              text={t('links.reviews')}
              imageUrl="/images/image14.png"
            height="regular"
            hoverEffect="zoom"
            />


          <PromoCard
            href="#"
            text={t('links.location')}
            imageUrl="/images/locationLinktree.png"
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
      return "ring-2 ring-white ring-offset-2 ring-offset-transparent";
    }
    return "";
  };

  const getHoverEffect = () => {
    switch (hoverEffect) {
      case "pulse":
        return "hover:animate-pulse hover:scale-[1.05] hover:shadow-2xl hover:shadow-yellow-100/30";
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
      className={`block relative overflow-hidden rounded-sm transition-all duration-500 shadow-xl group cursor-pointer
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
            <div className="bg-yellow-50 text-black px-2 py-1 rounded-lg text-xs font-bold">
              ⭐ PRIORITY
            </div>
          </div>
        )}

        {/* Text overlay with better positioning */}
        <div className="absolute inset-0 flex items-end justify-center text-center text-white p-4">
          <div className="transform transition-transform duration-300 group-hover:scale-105">
            <p className={`font-medium leading-tight drop-shadow-lg font-graphik  text-2xl
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
          icon: <div className="w-4 h-4 text-white font-bold text-xs flex items-center justify-center">T</div>,
          bgClass: "bg-black hover:bg-gray-900"
        };
      case 'youtube':
        return {
          icon: <Youtube className="w-4 h-4 text-white" />,
          bgClass: "bg-red-600 hover:bg-red-700"
        };
      case 'linkedin':
        return {
          icon: <Linkedin className="w-4 h-4 text-white" />,
          bgClass: "bg-blue-700 hover:bg-blue-800"
        };
      case 'website':
        return {
          icon: <Globe className="w-4 h-4 text-white" />,
          bgClass: "bg-gray-700 hover:bg-gray-800"
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
    <div className={`w-10 h-10 ${bgClass} rounded-xl flex items-center justify-center transition-all duration-200 cursor-pointer shadow-lg border-2 border-white/20`}>
      {icon}
    </div>
  );
}
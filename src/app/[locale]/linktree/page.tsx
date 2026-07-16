'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import {
  Instagram,
  MessageCircle,
  Globe,
  CalendarCheck,
  Sparkles,
  CalendarDays,
  Gift,
  Star,
  MapPin,
  type LucideIcon,
} from 'lucide-react';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';

const BRAND = '#c19f7d';
const CREAM = '#f2eadf';
const BUTTON_BG = '#efe3cf';
const BUTTON_TEXT = '#5f4a33';

export default function LinktreePage() {
  const t = useTranslations('LinktreePage');

  const cards = [
    { key: 'freeBilan', icon: CalendarCheck, imageUrl: '/images/OUT2.png' },
    { key: 'discover', icon: Sparkles, imageUrl: '/images/REST.jpg' },
    { key: 'booking', icon: CalendarDays, imageUrl: '/images/linktree2.jpg' },
    { key: 'offers', icon: Gift, imageUrl: '/images/offerLinktree.png' },
    { key: 'whatsapp', icon: MessageCircle, imageUrl: '/images/WhatsappLinktree.jpg' },
    { key: 'reviews', icon: Star, imageUrl: '/images/image14.png' },
    { key: 'location', icon: MapPin, imageUrl: '/images/locationLinktree.png' },
  ] as const;

  return (
    <div className="min-h-screen font-graphik" style={{ backgroundColor: CREAM }}>
      {/* Language Switcher - Fixed Top Right */}
      <div className="fixed top-4 right-4 z-50">
        <LanguageSwitcher variant="header" />
      </div>

      <div className="max-w-md mx-auto min-h-screen shadow-2xl" style={{ backgroundColor: CREAM }}>
        {/* Header */}
        <header
          className="relative overflow-hidden rounded-b-[2.5rem]"
          style={{ backgroundColor: BRAND }}
        >
          <div className="flex items-stretch min-h-[300px]">
            {/* Portrait */}
            <div className="relative w-[45%]">
              <Image
                src="/images/nahed1.png"
                alt={t('title')}
                fill
                sizes="(max-width: 448px) 45vw, 200px"
                className="object-cover object-top"
                priority
              />
              {/* Fade the portrait into the header color */}
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(to right, transparent 60%, ${BRAND} 100%)`,
                }}
              ></div>
            </div>

            {/* Logo, socials and slogan */}
            <div className="flex-1 flex flex-col items-center justify-center text-center px-5 py-8">
              <Image
                src="/images/LOGOBLANC.png"
                alt={t('title')}
                width={718}
                height={990}
                className="w-24 md:w-28 h-auto mb-4 drop-shadow-sm"
                priority
              />

              {/* Social Icons */}
              <div className="flex items-center justify-center gap-4 mb-4">
                <SocialIcon href="#" icon={Instagram} label="Instagram" />
                <SocialIcon href="#" icon={MessageCircle} label="WhatsApp" />
                <SocialIcon href="#" icon={Globe} label="Website" />
              </div>

              <p className="text-white text-sm leading-relaxed opacity-95">
                {t('slogan')}
              </p>
              <p className="text-white/80 text-xs mt-2">{t('contact')}</p>
            </div>
          </div>
        </header>

        {/* Link Cards */}
        <main className="px-4 py-6 space-y-4">
          {cards.map(({ key, icon, imageUrl }) => (
            <LinkCard
              key={key}
              href="#"
              icon={icon}
              title={t(`linksTitle.${key}`)}
              description={t(`links.${key}`)}
              buttonLabel={t('access')}
              imageUrl={imageUrl}
            />
          ))}
        </main>

        {/* Footer */}
        <footer className="text-center text-xs pb-8 px-4" style={{ color: BUTTON_TEXT }}>
          {t('copyright')}
        </footer>
      </div>
    </div>
  );
}

function LinkCard({
  href,
  icon: Icon,
  title,
  description,
  buttonLabel,
  imageUrl,
}: {
  href: string;
  icon: LucideIcon;
  title: string;
  description: string;
  buttonLabel: string;
  imageUrl: string;
}) {
  return (
    <a
      href={href}
      className="group flex items-stretch overflow-hidden rounded-2xl shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl active:scale-[0.98]"
      style={{ backgroundColor: BRAND }}
    >
      {/* Icon */}
      <div className="flex items-center pl-4 shrink-0">
        <Icon className="w-8 h-8 text-white" strokeWidth={1.5} />
      </div>

      {/* Text content */}
      <div className="flex-1 flex flex-col justify-center px-4 py-5 min-w-0">
        <p className="text-white font-semibold uppercase tracking-wide text-base leading-tight mb-1">
          {title}
        </p>
        <p className="text-white/90 text-xs leading-snug mb-3">{description}</p>
        <span
          className="self-start uppercase text-[11px] font-bold tracking-[0.15em] px-5 py-1.5 rounded-sm shadow-sm transition-colors duration-300 group-hover:bg-white"
          style={{ backgroundColor: BUTTON_BG, color: BUTTON_TEXT }}
        >
          {buttonLabel}
        </span>
      </div>

      {/* Image */}
      <div className="relative w-[35%] shrink-0 overflow-hidden rounded-l-3xl">
        <Image
          src={imageUrl}
          alt={title}
          fill
          sizes="(max-width: 448px) 35vw, 160px"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
    </a>
  );
}

function SocialIcon({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: LucideIcon;
  label: string;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      className="text-white opacity-90 hover:opacity-100 hover:scale-110 transition-all duration-200"
    >
      <Icon className="w-6 h-6" strokeWidth={1.75} />
    </a>
  );
}

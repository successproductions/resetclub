'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

const Footer: React.FC = () => {
  const t = useTranslations('Footer');
  const [currentYear, setCurrentYear] = useState<number>(2025);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const footerLinks = {
    company: {
      titleKey: 'company.title',
      links: [
        { labelKey: 'company.ourStory', href: '/about' },
        { labelKey: 'company.ourTeam', href: '/team' },
        { labelKey: 'company.contact', href: '/contact' },
      ],
    },
    services: {
      titleKey: 'services.title',
      links: [
        { labelKey: 'services.programs', href: '/programs' },
        { labelKey: 'services.coaching', href: '/coaching' },
        { labelKey: 'services.online', href: '/online' },
      ],
    },
    support: {
      titleKey: 'support.title',
      links: [
        { labelKey: 'support.faq', href: '/faq' },
        { labelKey: 'support.bookings', href: '/contac' },
        { labelKey: 'support.testimonials', href: '/testimonials' }
      ],
    },
  };

  return (
    <footer className="bg-[#e4ded5] text-white">
      {/* Desktop Footer - Hidden on Mobile */}
      <div className="hidden md:block max-w-7xl mx-auto px-6 py-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-2">
          {/* Brand Section - Takes 2 columns on large screens */}
          <div className="lg:col-span-2">
            <div className="mb-4">
              <Image
                src="/images/LOGORESETCLUBBEIGE.png"
                alt="Reset Club™ - Premier centre de transformation holistique au Maroc"
                width={180}
                height={72}
                className="h-34 w-28 mb-1"
                sizes="180px"
              />
              {/* Contact Info */}
              <div className="space-y-3 mb-4">
                <div className="flex items-center text-[#524029]">
                  <svg className="w-5 h-5 mr-3 text-[#c26d4c]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  contact@resetclub.ma
                </div>
                <div className="flex items-center text-[#524029]">
                  <svg className="w-5 h-5 mr-3 text-[#c26d4c]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  +212 6 XX XX XX XX
                </div>
                <div className="flex items-center text-[#524029]">
                  <svg className="w-5 h-5 mr-3 text-[#c26d4c]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  Rabat, Maroc
                </div>
              </div>

              {/* Social Media Icons */}
              <div className="flex space-x-3">
                <a
                  href="#"
                  className="w-12 h-12 bg-[#524029] rounded-full flex items-center justify-center transition-all duration-300 hover:bg-[#c26d4c] hover:transform hover:scale-110"
                  aria-label="Facebook"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-12 h-12 bg-[#524029] rounded-full flex items-center justify-center transition-all duration-300 hover:bg-[#c26d4c] hover:transform hover:scale-110"
                  aria-label="Instagram"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.014 5.367 18.647.001 12.017.001zm0 1.847c3.179 0 3.556.014 4.812.07 1.163.053 1.794.249 2.214.412.557.217.954.477 1.372.896.419.418.679.815.896 1.371.163.42.359 1.051.412 2.214.056 1.256.07 1.633.07 4.812s-.014 3.556-.07 4.812c-.053 1.163-.249 1.794-.412 2.214-.217.557-.477.954-.896 1.372-.418.419-.815.679-1.371.896-.42.163-1.051.359-2.214.412-1.256.056-1.633.07-4.812.07s-3.556-.014-4.812-.07c-1.163-.053-1.794-.249-2.214-.412-.557-.217-.954-.477-1.372-.896-.419-.418-.679-.815-.896-1.371-.163-.42-.359-1.051-.412-2.214-.056-1.256-.07-1.633-.07-4.812s.014-3.556.07-4.812c.053-1.163.249-1.794.412-2.214.217-.557.477-.954.896-1.372.418-.419.815-.679 1.371-.896.42-.163 1.051-.359 2.214-.412 1.256-.056 1.633-.07 4.812-.07z"/>
                    <path d="M12.017 5.838a6.149 6.149 0 1 0 0 12.298 6.149 6.149 0 0 0 0-12.298zm0 10.13a3.981 3.981 0 1 1 0-7.962 3.981 3.981 0 0 1 0 7.962z"/>
                    <circle cx="18.406" cy="5.594" r="1.44"/>
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-12 h-12 bg-[#524029] rounded-full flex items-center justify-center transition-all duration-300 hover:bg-[#c26d4c] hover:transform hover:scale-110"
                  aria-label="LinkedIn"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-12 h-12 bg-[#524029] rounded-full flex items-center justify-center transition-all duration-300 hover:bg-[#c26d4c] hover:transform hover:scale-110"
                  aria-label="YouTube"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {Object.entries(footerLinks).map(([key, section]) => (
            <div key={key}>
              <p className="text-xl mt-12 md:text-2xl font-normal mb-10 text-[#c26d4c] font-graphik">
                {t(section.titleKey)}
              </p>
              <ul className="space-y-3">
                {section.links.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-[#524029] hover:text-[#c26d4c] transition-colors duration-300 text-sm hover:underline font-poppins"
                    >
                      {t(link.labelKey)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

      
        {/* Bottom Section */}
        <div className="border-t border-[#e4ded5]  pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-[#524029] text-sm">
              © {currentYear} Reset Club™. {t('rights')}.
            </div>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/legal" className="text-[#524029] hover:text-[#c26d4c] text-sm transition-colors duration-300">
                {t('legal')}
              </Link>
              <Link href="/privacy" className="text-[#524029] hover:text-[#c26d4c] text-sm transition-colors duration-300">
                {t('privacy')}
              </Link>
              <Link href="/cookies" className="text-[#524029] hover:text-[#c26d4c] text-sm transition-colors duration-300">
                {t('cookies')}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Footer - Hidden on Desktop */}
      <div className="md:hidden flex flex-col items-center justify-center px-6 py-8 text-center bg-[#e4ded5] ">
        {/* Logo and Tagline */}
        <div className="">
          <Image
            src="/images/LOGORESETCLUBBEIGE.png"
            alt="Reset Club™"
            width={100}
            height={100}
            className="mx-auto mb-2"
          />
          <p className="text-[#524029] text-sm tracking-wide font-poppins">
            {t('tagline')}
          </p>
        </div>

        {/* Contact Information */}
        <div className="space-y-4 mb-8">
          <div className="flex items-center justify-center text-[#524029]">
            <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            Rabat, Maroc
          </div>
          <div className="flex items-center justify-center text-[#524029]">
            <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
            contact@resetclub.ma
          </div>
          <div className="flex items-center justify-center text-[#524029]">
            <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            +212 6 XX XX XX XX
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="flex space-x-4 mb-8">
          
          <a
            href="#"
            className="w-12 h-12 bg-[#524029] rounded-full flex items-center justify-center transition-all duration-300"
            aria-label="Facebook"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </a>
          <a
            href="#"
            className="w-12 h-12 bg-[#524029] rounded-full flex items-center justify-center transition-all duration-300"
            aria-label="LinkedIn"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
          <a
            href="#"
            className="w-12 h-12 bg-[#524029] rounded-full flex items-center justify-center transition-all duration-300"
            aria-label="YouTube"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
          </a>
        </div>

        {/* Copyright and Rights */}
        <div className="mb-6">
          <p className="text-sm text-[#524029] font-medium mb-2">© {currentYear} RESET CLUB™</p>
          <p className="text-sm text-[#524029]">{t('rights')}</p>
        </div>

        {/* Tagline */}
        <p className="text-[#524029] mb-8 max-w-sm text-sm font-poppins">
          {t('mobileTagline')}
        </p>

        {/* CTA Button */}
        <Link
          href="/contact"
          className="bg-transparent text-[#524029] text-lg font-graphik px-4 font-medium py-4   font-fraphik border border-[#524029] hover:border-[#] hover:bg-gray-950 hover:text-white transition-all duration-300 inline-block cursor-pointer hover:scale-105 shadow-lg hover:shadow-xl"
        >
          {t('mobileCtaButton')}
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
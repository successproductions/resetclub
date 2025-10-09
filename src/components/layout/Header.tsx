'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';
import { NAV_ITEMS } from '@/constants';
import { Phone, Menu } from 'lucide-react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const t = useTranslations('Navigation');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Check on mount
    handleResize();

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const navItems = NAV_ITEMS.map((item) => ({
    label: t(item.labelKey),
    href: item.href,
  }));

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-in-out
        ${isMobileMenuOpen
          ? 'bg-white shadow-lg py-2'
          : isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg py-2'
          : 'bg-transparent py-6'
        }
      `}
    >
      <nav className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          {/* Mobile Menu Button - Left */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-md transition-colors duration-300 ${
                isScrolled || isMobileMenuOpen ? 'text-gray-900' : 'text-white'
              }`}
              aria-label="Toggle mobile menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

          {/* Logo - Center on mobile, Left on desktop */}
          <div className="flex items-center md:flex-none flex-1 justify-center md:justify-start">
            <Link href="/" className="flex items-center">
              <Image
                src={isScrolled || isMobileMenuOpen ? "/images/logogras.png" : "/images/LOGOBLANC.png"}
                alt="Reset Club™ - Premier centre de transformation holistique au Maroc"
                width={180}
                height={82}
                priority
                className={`
                  w-auto transition-all duration-700 ease-in-out hover:opacity-80
                  ${isScrolled || isMobileMenuOpen ? 'h-18' : 'h-24'}
                `}
                sizes="(max-width: 768px) 140px, 180px"
              />
            </Link>
          </div>

          {/* Call Icon - Right on mobile, Hidden on desktop */}
          <div className="md:hidden">
            <a
              href="tel:+212000000000"
              className={`p-2 rounded-md transition-colors duration-300 ${
                isScrolled || isMobileMenuOpen ? 'text-gray-900' : 'text-white'
              }`}
              aria-label="Call us"
            >
              <Phone className="w-6 h-6" />
            </a>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={`
                  relative px-6 py-3 text-sm font-medium transition-all duration-300 ease-in-out
                  group
                  ${isScrolled || isMobileMenuOpen
                    ? 'text-gray-700 hover:text-gray-900'
                    : 'text-white hover:text-white'
                  }
                `}
              >
                {item.label}
                {/* Animated underline */}
                <span
                  className={`
                    absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 w-0
                    transition-all duration-300 ease-in-out
                    group-hover:w-8
                    ${isScrolled || isMobileMenuOpen ? 'bg-gray-900' : 'bg-white'}
                  `}
                />
              </Link>
            ))}

            {/* Language Switcher */}
            <div className="ml-2">
              <LanguageSwitcher isScrolled={isScrolled || isMobileMenuOpen} />
            </div>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block ml-6 font-le-jour-serif">
            <Button
              variant="primary"
              size="lg"
              href="/contact"
              className={isScrolled || isMobileMenuOpen ? 'scrolled-navbar' : ''}
            >
              {t('reserve')}
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 md:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Mobile Menu Header */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200">
          <Image
            src="/images/logogras.png"
            alt="Reset Club™"
            width={120}
            height={48}
            className="h-20 w-14"
          />
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-2 rounded-md text-gray-600 hover:text-gray-900 transition-colors"
            aria-label="Close menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu Content */}
        <div className="flex flex-col h-full">
          {/* Language Switcher - Mobile */}
          <div className="px-6 py-4 border-b border-gray-200">
            <LanguageSwitcher variant="mobile" />
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 px-6 py-8">
            <div className="space-y-4">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="block py-3 px-4 text-lg font-medium text-gray-800 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>

          {/* Mobile CTA Button */}
          <div className="p-6 border-t border-gray-200 ">
            <Button
              variant="primary"
              size="lg"
              href="/contact"
              className="w-full"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('reserve')}
            </Button>
          </div>

          {/* Social Media Links */}
          <div className="p-6 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-4">Suivez-nous</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-amber-600 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-amber-600 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.014 5.367 18.647.001 12.017.001zm0 1.847c3.179 0 3.556.014 4.812.07 1.163.053 1.794.249 2.214.412.557.217.954.477 1.372.896.419.418.679.815.896 1.371.163.42.359 1.051.412 2.214.056 1.256.07 1.633.07 4.812s-.014 3.556-.07 4.812c-.053 1.163-.249 1.794-.412 2.214-.217.557-.477.954-.896 1.372-.418.419-.815.679-1.371.896-.42.163-1.051.359-2.214.412-1.256.056-1.633.07-4.812.07s-3.556-.014-4.812-.07c-1.163-.053-1.794-.249-2.214-.412-.557-.217-.954-.477-1.372-.896-.419-.418-.679-.815-.896-1.371-.163-.42-.359-1.051-.412-2.214-.056-1.256-.07-1.633-.07-4.812s.014-3.556.07-4.812c.053-1.163.249-1.794.412-2.214.217-.557.477-.954.896-1.372.418-.419.815-.679 1.371-.896.42-.163 1.051-.359 2.214-.412 1.256-.056 1.633-.07 4.812-.07z"/>
                  <path d="M12.017 5.838a6.149 6.149 0 1 0 0 12.298 6.149 6.149 0 0 0 0-12.298zm0 10.13a3.981 3.981 0 1 1 0-7.962 3.981 3.981 0 0 1 0 7.962z"/>
                  <circle cx="18.406" cy="5.594" r="1.44"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-amber-600 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
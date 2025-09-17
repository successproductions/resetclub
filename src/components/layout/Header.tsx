'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import Button from '../ui/Button';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const t = useTranslations('Navigation');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: t('home'), href: '/' },
    { label: t('about'), href: '/about' },
    { label: t('team'), href: '/team' },
    { label: t('careers'), href: '/careers' },
    { label: t('contact'), href: '/contact' },
  ];

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-in-out
        ${isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg py-2'
          : 'bg-transparent py-6'
        }
      `}
    >
      <nav className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src={isScrolled ? "/logobrawon.png" : "/LOGO.png"}
                alt="Reset Club™ - Premier centre de transformation holistique au Maroc"
                width={180}
                height={72}
                priority
                className={`
                  w-auto transition-all duration-700 ease-in-out hover:opacity-80
                  ${isScrolled ? 'h-16' : 'h-20'}
                `}
                sizes="(max-width: 768px) 140px, 180px"
              />
            </Link>
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
                  ${isScrolled
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
                    ${isScrolled ? 'bg-gray-900' : 'bg-white'}
                  `}
                />
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block ml-6">
            <Button
              variant="primary"
              size="sm"
              href="/contact"
              className={isScrolled ? 'scrolled-navbar' : ''}
            >
              {t('reserve')}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              className={`p-2 rounded-md transition-colors duration-300 ${
                isScrolled ? 'text-gray-900' : 'text-white'
              }`}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
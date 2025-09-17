'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Footer: React.FC = () => {
  const [currentYear, setCurrentYear] = useState<number>(2025);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const footerLinks = {
    company: {
      title: 'Reset Club™',
      links: [
        { label: 'Notre histoire', href: '/about' },
        { label: 'Notre équipe', href: '/team' },
        { label: 'Carrières', href: '/careers' },
        { label: 'Contact', href: '/contact' },
        { label: 'Blog & Actualités', href: '/blog' },
      ],
    },
    services: {
      title: 'Nos Services',
      links: [
        { label: 'Programmes holistiques', href: '/programs' },
        { label: 'Coaching personnel', href: '/coaching' },
        { label: 'Formations & Certifications', href: '/training' },
        { label: 'Ateliers & Événements', href: '/workshops' },
        { label: 'Consultation en ligne', href: '/online' },
      ],
    },
    support: {
      title: 'Support',
      links: [
        { label: 'Centre d\'aide', href: '/help' },
        { label: 'FAQ', href: '/faq' },
        { label: 'Réservations', href: '/bookings' },
        { label: 'Témoignages clients', href: '/testimonials' },
        { label: 'Partenariats', href: '/partners' },
      ],
    },
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Section - Takes 2 columns on large screens */}
          <div className="lg:col-span-2">
            <div className="mb-8">
              <Image
                src="/LOGO.png"
                alt="Reset Club™ - Premier centre de transformation holistique au Maroc"
                width={180}
                height={72}
                className="h-16 w-auto mb-6"
                sizes="180px"
              />
              {/* Contact Info */}
              <div className="space-y-3 mb-8">
                <div className="flex items-center text-gray-300">
                  <svg className="w-5 h-5 mr-3 text-[#ccbaa8]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  contact@resetclub.ma
                </div>
                <div className="flex items-center text-gray-300">
                  <svg className="w-5 h-5 mr-3 text-[#ccbaa8]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  +212 6 XX XX XX XX
                </div>
                <div className="flex items-center text-gray-300">
                  <svg className="w-5 h-5 mr-3 text-[#ccbaa8]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  Rabat, Maroc
                </div>
              </div>

              {/* Social Media Icons */}
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-[#ccbaa8] hover:transform hover:scale-110"
                  aria-label="Facebook"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-[#ccbaa8] hover:transform hover:scale-110"
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
                  className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-[#ccbaa8] hover:transform hover:scale-110"
                  aria-label="LinkedIn"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-[#ccbaa8] hover:transform hover:scale-110"
                  aria-label="YouTube"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Footer Links - Each section takes 1 column */}
          {Object.entries(footerLinks).map(([key, section]) => (
            <div key={key}>
              <h4 className="text-xl font-bold mb-6 text-[#ccbaa8] font-playfair">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-[#ccbaa8] transition-colors duration-300 text-sm hover:underline font-poppins"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      
        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm">
              © {currentYear} Reset Club™. Tous droits réservés.
            </div>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/legal" className="text-gray-400 hover:text-[#ccbaa8] text-sm transition-colors duration-300">
                Mentions légales
              </Link>
              <Link href="/privacy" className="text-gray-400 hover:text-[#ccbaa8] text-sm transition-colors duration-300">
                Confidentialité
              </Link>
              <Link href="/cookies" className="text-gray-400 hover:text-[#ccbaa8] text-sm transition-colors duration-300">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

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
      ],
    },
    services: {
      title: 'Nos Services',
      links: [
        { label: 'Programmes holistiques', href: '/programs' },
        { label: 'Coaching personnel', href: '/coaching' },
        { label: 'Formations', href: '/training' },
        { label: 'Ateliers', href: '/workshops' },
      ],
    },
    legal: {
      title: 'Légal',
      links: [
        { label: 'Mentions légales', href: '/legal' },
        { label: 'Politique de confidentialité', href: '/privacy' },
        { label: 'Conditions d\'utilisation', href: '/terms' },
      ],
    },
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <Image
                src="/LOGO.png"
                alt="Reset Club™ - Premier centre de transformation holistique au Maroc"
                width={150}
                height={60}
                className="h-15 w-auto mb-4"
                sizes="150px"
              />
              <p className="text-gray-400 mt-4 leading-relaxed">
                Le premier centre premium de transformation holistique au Maroc.
                Votre parcours vers un bien-être complet commence ici.
              </p>
            </div>

            {/* Social Media Icons */}
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center transition-colors duration-300"
                onMouseEnter={(e) => (e.target as HTMLElement).style.backgroundColor = '#ccbaa8'}
                onMouseLeave={(e) => (e.target as HTMLElement).style.backgroundColor = '#1f2937'}
                aria-label="Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center transition-colors duration-300"
                onMouseEnter={(e) => (e.target as HTMLElement).style.backgroundColor = '#ccbaa8'}
                onMouseLeave={(e) => (e.target as HTMLElement).style.backgroundColor = '#1f2937'}
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.014 5.367 18.647.001 12.017.001zm0 1.847c3.179 0 3.556.014 4.812.07 1.163.053 1.794.249 2.214.412.557.217.954.477 1.372.896.419.418.679.815.896 1.371.163.42.359 1.051.412 2.214.056 1.256.07 1.633.07 4.812s-.014 3.556-.07 4.812c-.053 1.163-.249 1.794-.412 2.214-.217.557-.477.954-.896 1.372-.418.419-.815.679-1.371.896-.42.163-1.051.359-2.214.412-1.256.056-1.633.07-4.812.07s-3.556-.014-4.812-.07c-1.163-.053-1.794-.249-2.214-.412-.557-.217-.954-.477-1.372-.896-.419-.418-.679-.815-.896-1.371-.163-.42-.359-1.051-.412-2.214-.056-1.256-.07-1.633-.07-4.812s.014-3.556.07-4.812c.053-1.163.249-1.794.412-2.214.217-.557.477-.954.896-1.372.418-.419.815-.679 1.371-.896.42-.163 1.051-.359 2.214-.412 1.256-.056 1.633-.07 4.812-.07z"/>
                  <path d="M12.017 5.838a6.149 6.149 0 1 0 0 12.298 6.149 6.149 0 0 0 0-12.298zm0 10.13a3.981 3.981 0 1 1 0-7.962 3.981 3.981 0 0 1 0 7.962z"/>
                  <circle cx="18.406" cy="5.594" r="1.44"/>
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center transition-colors duration-300"
                onMouseEnter={(e) => (e.target as HTMLElement).style.backgroundColor = '#ccbaa8'}
                onMouseLeave={(e) => (e.target as HTMLElement).style.backgroundColor = '#1f2937'}
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([key, section]) => (
            <div key={key}>
              <h4 className="text-lg font-semibold mb-4 text-white">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-amber-400 transition-colors duration-300"
                    >
                      {link.label}
                    </a>
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
            <div className="text-gray-400 text-sm mt-4 md:mt-0">
              Rabat, Maroc
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
'use client';

import React, { useCallback, useRef } from 'react';
import Script from 'next/script';

/**
 * TrustBox Trustpilot.
 *
 * Les identifiants viennent du tableau de bord Trustpilot :
 * Integrations → TrustBox → choisir un modèle → copier le code.
 * Tant qu'ils ne sont pas renseignés, le composant affiche le lien de repli
 * ci-dessous : aucune note, aucun chiffre inventé.
 *
 * ⚠️ Avec 0 avis, n'utiliser qu'un modèle « Review Collector » : les modèles
 * qui affichent la note rendraient « 0,0 ★ · 0 avis » en pleine page d'accueil.
 */
const BUSINESS_UNIT_ID = ''; // ex. « 5f2a3b4c5d6e7f8a9b0c1d2e »
const TEMPLATE_ID = ''; // ex. Review Collector « 56278e9abfbbba0bdcd568bc »

const PROFIL_URL = 'https://fr.trustpilot.com/review/resetclub.ma';
const EVALUER_URL = 'https://fr.trustpilot.com/evaluate/resetclub.ma';

const Trustpilot: React.FC = () => {
  const widget = useRef<HTMLDivElement>(null);
  const configure = Boolean(BUSINESS_UNIT_ID && TEMPLATE_ID);

  // Le script Trustpilot ne parcourt le DOM qu'une fois, au chargement. En
  // navigation côté client la section est montée après coup : sans ce rappel
  // explicite, le widget reste vide.
  const initialiser = useCallback(() => {
    if (widget.current && window.Trustpilot) {
      window.Trustpilot.loadFromElement(widget.current, true);
    }
  }, []);

  return (
    <section className="py-3 pb-4 md:py-0 md:pb-6 bg-white">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-xl text-center">
          {configure ? (
            <>
              <Script
                src="https://widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js"
                strategy="afterInteractive"
                onLoad={initialiser}
              />
              <div
                ref={widget}
                className="trustpilot-widget"
                data-locale="fr-FR"
                data-template-id={TEMPLATE_ID}
                data-businessunit-id={BUSINESS_UNIT_ID}
                data-style-height="52px"
                data-style-width="100%"
              >
                {/* Remplacé par Trustpilot une fois le script chargé. Reste
                    visible si un bloqueur de publicité l'empêche. */}
                <a href={PROFIL_URL} target="_blank" rel="noopener noreferrer">
                  Trustpilot
                </a>
              </div>
            </>
          ) : (
            <Repli />
          )}
        </div>
      </div>
    </section>
  );
};

/**
 * Repli sans widget : on invite à déposer un avis plutôt que d'en afficher.
 * Aucune note n'est montrée — nous n'en avons pas encore.
 */
const Repli: React.FC = () => (
  <a
    href={EVALUER_URL}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-2.5 rounded-full border border-[#E7DFD6] px-5 py-3 transition-colors hover:border-[#00B67A] focus:outline-none focus:ring-2 focus:ring-[#00B67A] focus:ring-offset-2"
  >
    <svg width="19" height="18" viewBox="0 0 19 18" aria-hidden="true">
      <path d="M9.5 0l2.35 6.18H18.5l-5.33 3.82 2.04 6.18L9.5 12.36 3.79 16.18l2.04-6.18L.5 6.18h6.65L9.5 0z" fill="#00B67A" />
    </svg>
    <span className="text-[14.5px] text-gray-700">
      Vous êtes déjà passée au centre ?{' '}
      <span className="font-medium text-gray-900">Laissez-nous un avis</span>
    </span>
  </a>
);

declare global {
  interface Window {
    Trustpilot?: { loadFromElement: (el: HTMLElement, force?: boolean) => void };
  }
}

export default Trustpilot;

/** Palette RESET CLUB reprise du reste du site, centralisée pour le quiz. */
export const RC = {
  teal: '#51B1AA',
  tealLight: '#91DBD3',
  tealDeep: '#2D6D68',
  tealDark: '#1A4D47',
  ink: '#0D2623',
  sand: '#CBB9A7',
  sandLight: '#D4C4B3',
  cream: '#F5EFE8',
  creamLight: '#FBF8F4',
  brown: '#524029',
  ash: '#7B7066',
} as const;

/** Une image d'ambiance par chapitre — placeholders Unsplash, à remplacer. */
export const IMAGES = {
  /** Visuel d'accueil du questionnaire. Chemin absolu depuis `public/` :
   *  next/image refuse un chemin relatif (« ./images/… » lève Invalid URL). */
  intro: '/images/REDLIGHT.png',
  introAlt:
    'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1600&q=80',
  DRAIN:
    'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=1200&q=80',
  CORTISOL:
    'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=1200&q=80',
  METABOLIQUE:
    'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1200&q=80',
  DIGEST:
    'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=80',
} as const;

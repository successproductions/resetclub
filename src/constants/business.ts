/**
 * Single source of truth for the business identity (NAP: Name, Address, Phone).
 * Every SEO surface — JSON-LD, metadata, header, footer — must read from here so
 * Google sees one consistent entity across the site and can match it to the
 * Google Business Profile (see `googleMapsUrl`).
 */
export const BUSINESS = {
  /** Must match the Google Business Profile name exactly. */
  name: 'Reset Club',
  alternateNames: ['ResetClub', 'ResetClub™', 'RESET CLUB', 'Reset Club Rabat'],
  url: 'https://www.resetclub.ma',
  logo: 'https://www.resetclub.ma/logo.png',
  ogImage: 'https://www.resetclub.ma/og-image.jpg',
  email: 'contact@resetclub.ma',
  /** E.164, used by tel: links and schema. */
  phone: '+212689464650',
  phoneDisplay: '+212 689 464 650',
  landline: '+212537570521',
  landlineDisplay: '05 375 705 21',
  address: {
    street: 'N° 11, Rue Clarkia, Secteur 15, Hay Riad',
    locality: 'Rabat',
    region: 'Rabat-Salé-Kénitra',
    postalCode: '10000',
    country: 'MA',
  },
  /** Taken from the Google Maps listing — keep in sync if the pin moves. */
  geo: { latitude: 33.952661, longitude: -6.877653 },
  /** CID of the Google Business Profile — the strongest site ⇄ GBP link. */
  googleMapsUrl: 'https://www.google.com/maps?cid=17155663660440778754',
  social: {
    facebook: 'https://www.facebook.com/profile.php?id=61572122909339',
    instagram: 'https://www.instagram.com/resetclub_rabat/',
    linkedin: 'https://www.linkedin.com/in/reset-club-34b5573b5/',
    tiktok: 'https://www.tiktok.com/@holisticare_rabat',
  },
  /** Mirrors the hours published on /contact — keep both in sync with GBP. */
  openingHours: {
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    opens: '10:00',
    closes: '20:00',
  },
} as const;

/** Every profile Google should treat as the same entity. */
export const BUSINESS_SAME_AS: string[] = [
  BUSINESS.googleMapsUrl,
  BUSINESS.social.facebook,
  BUSINESS.social.instagram,
  BUSINESS.social.linkedin,
  BUSINESS.social.tiktok,
];

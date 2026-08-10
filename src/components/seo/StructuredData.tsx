import { BUSINESS, BUSINESS_SAME_AS } from '@/constants/business';

interface StructuredDataProps {
  locale: string;
}

const BASE = BUSINESS.url;
const ORG_ID = `${BASE}/#organization`;
const WEBSITE_ID = `${BASE}/#website`;

/**
 * Site-wide JSON-LD. Emitted once per page as a single @graph so Google resolves
 * ONE entity for resetclub.ma instead of several competing ones.
 *
 * The business is modelled as a single HealthAndBeautyBusiness node (a subtype of
 * LocalBusiness, itself a subtype of Organization) rather than as separate
 * Organization + LocalBusiness nodes — duplicate nodes are what makes Google
 * hesitate to bind the site to the Google Business Profile.
 */
export default function StructuredData({ locale }: StructuredDataProps) {
  const isFr = locale === 'fr';

  const description = isFr
    ? 'Reset Club est un centre premium de transformation holistique et de biohacking à Hay Riad, Rabat. Bilan personnalisé, coaching sportif, nutrition et rééquilibrage du système nerveux.'
    : 'Reset Club is a premium holistic transformation and biohacking center in Hay Riad, Rabat. Personalized assessment, sports coaching, nutrition and nervous-system rebalancing.';

  const services = isFr
    ? [
      { name: 'Bilan Reset™', description: 'Bilan personnalisé complet de transformation holistique' },
      { name: 'Coaching Sportif', description: 'Programme de coaching sportif personnalisé' },
      { name: 'Nutrition & Biohacking', description: 'Programme de nutrition et biohacking personnalisé' },
    ]
    : [
      { name: 'Reset™ Assessment', description: 'Complete personalized holistic transformation assessment' },
      { name: 'Sports Coaching', description: 'Personalized sports coaching program' },
      { name: 'Nutrition & Biohacking', description: 'Personalized nutrition and biohacking program' },
    ];

  const graph = [
    {
      '@type': 'HealthAndBeautyBusiness',
      '@id': ORG_ID,
      name: BUSINESS.name,
      alternateName: [...BUSINESS.alternateNames],
      legalName: BUSINESS.name,
      description,
      url: `${BASE}/${locale}`,
      logo: {
        '@type': 'ImageObject',
        '@id': `${BASE}/#logo`,
        url: BUSINESS.logo,
        contentUrl: BUSINESS.logo,
        caption: BUSINESS.name,
      },
      image: [BUSINESS.ogImage, BUSINESS.logo],
      telephone: BUSINESS.phone,
      email: BUSINESS.email,
      address: {
        '@type': 'PostalAddress',
        streetAddress: BUSINESS.address.street,
        addressLocality: BUSINESS.address.locality,
        addressRegion: BUSINESS.address.region,
        postalCode: BUSINESS.address.postalCode,
        addressCountry: BUSINESS.address.country,
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: BUSINESS.geo.latitude,
        longitude: BUSINESS.geo.longitude,
      },
      hasMap: BUSINESS.googleMapsUrl,
      areaServed: {
        '@type': 'City',
        name: 'Rabat',
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: [...BUSINESS.openingHours.dayOfWeek],
          opens: BUSINESS.openingHours.opens,
          closes: BUSINESS.openingHours.closes,
        },
      ],
      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: BUSINESS.phone,
          email: BUSINESS.email,
          contactType: 'customer service',
          areaServed: 'MA',
          availableLanguage: ['fr', 'en', 'ar'],
        },
      ],
      sameAs: BUSINESS_SAME_AS,
      priceRange: '$$',
      currenciesAccepted: 'MAD',
      paymentAccepted: 'Cash, Credit Card',
      knowsLanguage: ['fr', 'en', 'ar'],
      founder: {
        '@type': 'Person',
        name: 'Nahed Rachad',
        jobTitle: isFr ? 'Fondatrice & Directrice' : 'Founder & Director',
      },
      makesOffer: services.map((service) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: service.name,
          description: service.description,
          provider: { '@id': ORG_ID },
        },
      })),
    },
    {
      '@type': 'WebSite',
      '@id': WEBSITE_ID,
      url: BASE,
      name: BUSINESS.name,
      alternateName: [...BUSINESS.alternateNames],
      description,
      publisher: { '@id': ORG_ID },
      inLanguage: isFr ? 'fr-MA' : 'en-US',
    },
  ];

  // A plain <script> (not next/script) so the JSON-LD is in the server-rendered
  // HTML. next/script injects it client-side, where crawlers only see it after
  // executing JS.
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }),
      }}
    />
  );
}

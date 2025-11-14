import Script from 'next/script';

interface StructuredDataProps {
  locale: string;
}

export default function StructuredData({ locale }: StructuredDataProps) {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'HealthAndBeautyBusiness',
    name: 'ResetClub™️',
    alternateName: 'Reset Club',
    description: locale === 'fr'
      ? 'Le premier centre premium de transformation holistique au Maroc. Coaching sportif, nutrition, biohacking et bien-être.'
      : 'Morocco\'s first premium holistic transformation center. Sports coaching, nutrition, biohacking, and wellness.',
    url: `https://www.resetclub.ma/${locale}`,
    logo: 'https://www.resetclub.ma/LOGO.png',
    image: 'https://www.resetclub.ma/LOGO.png',
    telephone: '+212 6 XX XX XX XX',
    email: 'contact@resetclub.ma',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Casablanca',
      addressRegion: 'Casablanca-Settat',
      addressCountry: 'MA',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '33.5731',
      longitude: '-7.5898',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '20:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '09:00',
        closes: '18:00',
      },
    ],
    sameAs: [
      'https://www.facebook.com/resetclub',
      'https://www.instagram.com/resetclub',
      'https://www.linkedin.com/company/resetclub',
    ],
    priceRange: '$$',
    currenciesAccepted: 'MAD',
    paymentAccepted: 'Cash, Credit Card',
    founder: {
      '@type': 'Person',
      name: 'Nahed Rachad',
      jobTitle: locale === 'fr' ? 'Fondatrice & Directrice' : 'Founder & Director',
    },
    makesOffer: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: locale === 'fr' ? 'Bilan Reset™' : 'Reset™ Assessment',
          description: locale === 'fr'
            ? 'Bilan personnalisé complet de transformation holistique'
            : 'Complete personalized holistic transformation assessment',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: locale === 'fr' ? 'Coaching Sportif' : 'Sports Coaching',
          description: locale === 'fr'
            ? 'Programme de coaching sportif personnalisé'
            : 'Personalized sports coaching program',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: locale === 'fr' ? 'Nutrition & Biohacking' : 'Nutrition & Biohacking',
          description: locale === 'fr'
            ? 'Programme de nutrition et biohacking personnalisé'
            : 'Personalized nutrition and biohacking program',
        },
      },
    ],
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'ResetClub™️',
    url: 'https://www.resetclub.ma',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://www.resetclub.ma/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
    inLanguage: [locale === 'fr' ? 'fr-FR' : 'en-US'],
  };

  return (
    <>
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <Script
        id="website-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
    </>
  );
}

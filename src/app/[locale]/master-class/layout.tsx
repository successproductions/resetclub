import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Masterclass Biohacking Féminin | Nahed Rachad - RESET Club',
  description: 'Découvrez les secrets du biohacking féminin avec Nahed Rachad. Comprenez ce qui bloque votre énergie et métabolisme. Accès gratuit.',
  keywords: 'biohacking féminin, masterclass, Nahed Rachad, RESET Club, énergie, métabolisme, bien-être, transformation, Maroc',
  openGraph: {
    title: 'Masterclass Biohacking Féminin | Nahed Rachad',
    description: 'Découvrez les secrets du biohacking féminin avec Nahed Rachad. Accès gratuit.',
    type: 'website',
    locale: 'fr_FR',
    images: [
      {
        url: '/images/master/NAHED.png',
        width: 1200,
        height: 630,
        alt: 'Nahed Rachad - Masterclass Biohacking Féminin',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Masterclass Biohacking Féminin | Nahed Rachad',
    description: 'Découvrez les secrets du biohacking féminin avec Nahed Rachad.',
  },
};

export default function MasterClassLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

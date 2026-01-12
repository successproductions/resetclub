import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Masterclass Biohacking Féminin | Nahed Rachad - RESET Club',
  description: 'Découvrez les secrets du biohacking féminin avec Nahed Rachad. Une journée pour comprendre ce qui bloque votre énergie, métabolisme et silhouette. Réservez votre accès gratuit maintenant.',
  keywords: 'biohacking féminin, masterclass, Nahed Rachad, RESET Club, énergie, métabolisme, bien-être, transformation, Maroc',
  openGraph: {
    title: 'Masterclass Biohacking Féminin | Nahed Rachad',
    description: 'Une journée pour découvrir les méthodes inédites du biohacking féminin et comprendre ce qui bloque réellement votre énergie.',
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

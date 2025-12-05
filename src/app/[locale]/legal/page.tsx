import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'SEO.legal' });

  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `https://www.resetclub.ma/${locale}/legal`,
      siteName: 'ResetClub™️',
      images: [
        {
          url: '/LOGO.png',
          width: 1200,
          height: 630,
          alt: 'ResetClub™️',
        },
      ],
      locale: locale === 'fr' ? 'fr_FR' : 'en_US',
      type: 'website',
    },
    alternates: {
      canonical: `https://www.resetclub.ma/${locale}/legal`,
      languages: {
        'en': 'https://www.resetclub.ma/en/legal',
        'fr': 'https://www.resetclub.ma/fr/legal',
      },
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function LegalPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <h1 className="text-4xl md:text-5xl font-serif text-gray-900 mb-8">
            Mentions légales
          </h1>

          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-serif text-gray-900 mb-4">Éditeur du site</h2>
              <p className="text-gray-700 leading-relaxed">
                <strong>Nom de la société :</strong> Reset Club™<br />
                <strong>Forme juridique :</strong> [À compléter]<br />
                <strong>Adresse du siège social :</strong> Rabat, Maroc<br />
                <strong>Email :</strong> contact@resetclub.ma<br />
                <strong>Téléphone :</strong> + 212 689 464 650
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif text-gray-900 mb-4">Directeur de la publication</h2>
              <p className="text-gray-700 leading-relaxed">
                Nahed Rachad, Fondatrice & Directrice
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif text-gray-900 mb-4">Hébergement</h2>
              <p className="text-gray-700 leading-relaxed">
                <strong>Hébergeur :</strong> [À compléter]<br />
                <strong>Adresse :</strong> [À compléter]
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif text-gray-900 mb-4">Propriété intellectuelle</h2>
              <p className="text-gray-700 leading-relaxed">
                L&apos;ensemble de ce site relève de la législation marocaine et internationale sur le droit d&apos;auteur et la propriété intellectuelle.
                Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                La reproduction de tout ou partie de ce site sur un support électronique ou autre quel qu&apos;il soit est formellement interdite
                sauf autorisation expresse du directeur de la publication.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif text-gray-900 mb-4">Données personnelles</h2>
              <p className="text-gray-700 leading-relaxed">
                Conformément à la loi marocaine n° 09-08 relative à la protection des personnes physiques à l&apos;égard du traitement des données à caractère personnel,
                vous disposez d&apos;un droit d&apos;accès, de rectification et de suppression des données vous concernant.
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                Pour exercer ce droit, veuillez nous contacter à l&apos;adresse : contact@resetclub.ma
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif text-gray-900 mb-4">Responsabilité</h2>
              <p className="text-gray-700 leading-relaxed">
                Les informations contenues sur ce site sont aussi précises que possible et le site est périodiquement remis à jour,
                mais peut toutefois contenir des inexactitudes, des omissions ou des lacunes.
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                Reset Club™ ne pourra être tenu responsable des dommages directs ou indirects qui pourraient résulter de l&apos;accès au site
                ou de l&apos;utilisation des informations qui y sont contenues.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'SEO.privacy' });

  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `https://www.resetclub.ma/${locale}/privacy`,
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
      canonical: `https://www.resetclub.ma/${locale}/privacy`,
      languages: {
        'en': 'https://www.resetclub.ma/en/privacy',
        'fr': 'https://www.resetclub.ma/fr/privacy',
      },
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <h1 className="text-4xl md:text-5xl font-serif text-gray-900 mb-8">
            Politique de confidentialité
          </h1>

          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-serif text-gray-900 mb-4">Introduction</h2>
              <p className="text-gray-700 leading-relaxed">
                Reset Club™ accorde une grande importance à la protection de vos données personnelles.
                Cette politique de confidentialité décrit comment nous collectons, utilisons et protégeons vos informations personnelles.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif text-gray-900 mb-4">Données collectées</h2>
              <p className="text-gray-700 leading-relaxed">
                Nous collectons les données suivantes lorsque vous utilisez notre site ou nos services :
              </p>
              <ul className="list-disc list-inside text-gray-700 leading-relaxed mt-4 space-y-2">
                <li>Nom et prénom</li>
                <li>Adresse email</li>
                <li>Numéro de téléphone</li>
                <li>Informations relatives à votre demande ou réservation</li>
                <li>Données de navigation (cookies, adresse IP, pages visitées)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-serif text-gray-900 mb-4">Utilisation des données</h2>
              <p className="text-gray-700 leading-relaxed">
                Vos données personnelles sont utilisées pour :
              </p>
              <ul className="list-disc list-inside text-gray-700 leading-relaxed mt-4 space-y-2">
                <li>Traiter vos demandes de contact et réservations</li>
                <li>Vous envoyer des informations sur nos services et offres</li>
                <li>Améliorer notre site web et nos services</li>
                <li>Respecter nos obligations légales</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-serif text-gray-900 mb-4">Protection des données</h2>
              <p className="text-gray-700 leading-relaxed">
                Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles appropriées pour protéger vos données
                contre tout accès non autorisé, modification, divulgation ou destruction.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif text-gray-900 mb-4">Partage des données</h2>
              <p className="text-gray-700 leading-relaxed">
                Nous ne vendons ni ne louons vos données personnelles à des tiers. Nous pouvons partager vos informations uniquement avec :
              </p>
              <ul className="list-disc list-inside text-gray-700 leading-relaxed mt-4 space-y-2">
                <li>Nos prestataires de services techniques (hébergement, email)</li>
                <li>Les autorités compétentes si requis par la loi</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-serif text-gray-900 mb-4">Vos droits</h2>
              <p className="text-gray-700 leading-relaxed">
                Conformément à la loi marocaine n° 09-08, vous disposez des droits suivants :
              </p>
              <ul className="list-disc list-inside text-gray-700 leading-relaxed mt-4 space-y-2">
                <li>Droit d&apos;accès à vos données personnelles</li>
                <li>Droit de rectification de vos données</li>
                <li>Droit de suppression de vos données</li>
                <li>Droit d&apos;opposition au traitement de vos données</li>
                <li>Droit à la portabilité de vos données</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-4">
                Pour exercer ces droits, contactez-nous à : <a href="mailto:contact@resetclub.ma" className="text-[#ccbaa8] hover:underline">contact@resetclub.ma</a>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif text-gray-900 mb-4">Conservation des données</h2>
              <p className="text-gray-700 leading-relaxed">
                Vos données personnelles sont conservées pendant la durée nécessaire aux finalités pour lesquelles elles ont été collectées,
                et conformément aux obligations légales applicables.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif text-gray-900 mb-4">Modifications</h2>
              <p className="text-gray-700 leading-relaxed">
                Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment.
                Les modifications entreront en vigueur dès leur publication sur cette page.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif text-gray-900 mb-4">Contact</h2>
              <p className="text-gray-700 leading-relaxed">
                Pour toute question concernant cette politique de confidentialité, contactez-nous :<br />
                <strong>Email :</strong> <a href="mailto:contact@resetclub.ma" className="text-[#ccbaa8] hover:underline">contact@resetclub.ma</a><br />
                <strong>Téléphone :</strong> + 212 689 464 650
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

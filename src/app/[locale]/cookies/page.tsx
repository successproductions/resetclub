import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'SEO.cookies' });

  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `https://www.resetclub.ma/${locale}/cookies`,
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
      canonical: `https://www.resetclub.ma/${locale}/cookies`,
      languages: {
        'en': 'https://www.resetclub.ma/en/cookies',
        'fr': 'https://www.resetclub.ma/fr/cookies',
      },
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function CookiesPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <h1 className="text-4xl md:text-5xl font-serif text-gray-900 mb-8">
            Politique de cookies
          </h1>

          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-2xl! font-serif text-gray-900 mb-4">Qu&apos;est-ce qu&apos;un cookie ?</h2>
              <p className="text-gray-700 leading-relaxed">
                Un cookie est un petit fichier texte déposé sur votre ordinateur ou appareil mobile lors de la visite d&apos;un site web.
                Les cookies permettent au site de mémoriser vos actions et préférences pendant une période donnée,
                afin que vous n&apos;ayez pas à les ressaisir lors de chaque visite ou navigation entre les pages.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif text-gray-900 mb-4">Types de cookies utilisés</h2>

              <div className="mt-4">
                <h3 className="text-xl! font-semibold text-gray-900 mb-2">Cookies essentiels</h3>
                <p className="text-gray-700 leading-relaxed">
                  Ces cookies sont nécessaires au fonctionnement du site. Ils vous permettent de naviguer sur le site
                  et d&apos;utiliser ses fonctionnalités de base. Sans ces cookies, certaines parties du site ne fonctionneront pas correctement.
                </p>
              </div>

              <div className="mt-4">
                <h3 className="text-xl! font-semibold text-gray-900 mb-2">Cookies de performance</h3>
                <p className="text-gray-700 leading-relaxed">
                  Ces cookies collectent des informations sur la façon dont les visiteurs utilisent notre site,
                  comme les pages les plus visitées et les messages d&apos;erreur reçus. Ces cookies nous aident à améliorer
                  le fonctionnement de notre site.
                </p>
              </div>

              <div className="mt-4">
                <h3 className="text-xl! font-semibold text-gray-900 mb-2">Cookies fonctionnels</h3>
                <p className="text-gray-700 leading-relaxed">
                  Ces cookies permettent au site de mémoriser vos choix (comme votre langue préférée ou votre région)
                  et de fournir des fonctionnalités améliorées et personnalisées.
                </p>
              </div>

              <div className="mt-4">
                <h3 className="text-xl! font-semibold text-gray-900 mb-2">Cookies publicitaires</h3>
                <p className="text-gray-700 leading-relaxed">
                  Ces cookies sont utilisés pour diffuser des publicités plus pertinentes pour vous et vos centres d&apos;intérêt.
                  Ils sont également utilisés pour limiter le nombre de fois que vous voyez une publicité
                  et pour mesurer l&apos;efficacité des campagnes publicitaires.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl! font-serif text-gray-900 mb-4">Cookies tiers</h2>
              <p className="text-gray-700 leading-relaxed">
                Nous utilisons également des services tiers qui peuvent placer des cookies sur votre appareil, notamment :
              </p>
              <ul className="list-disc list-inside text-gray-700 leading-relaxed mt-4 space-y-2">
                <li><strong>Google Analytics :</strong> Pour analyser l&apos;utilisation de notre site</li>
                <li><strong>Facebook Pixel :</strong> Pour mesurer l&apos;efficacité de nos campagnes publicitaires</li>
                <li><strong>YouTube :</strong> Si vous regardez des vidéos intégrées sur notre site</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl! font-serif text-gray-900 mb-4">Gestion des cookies</h2>
              <p className="text-gray-700 leading-relaxed">
                Vous pouvez contrôler et/ou supprimer les cookies comme vous le souhaitez. Vous pouvez supprimer tous les cookies
                déjà présents sur votre ordinateur et configurer la plupart des navigateurs pour qu&apos;ils les bloquent.
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                Toutefois, si vous bloquez les cookies, vous devrez peut-être ajuster manuellement certaines préférences
                à chaque visite du site, et certains services et fonctionnalités peuvent ne pas fonctionner correctement.
              </p>
            </section>

            <section>
              <h2 className="text-2xl! font-serif text-gray-900 mb-4">Comment gérer les cookies dans votre navigateur</h2>
              <p className="text-gray-700 leading-relaxed">
                Vous pouvez gérer les cookies via les paramètres de votre navigateur :
              </p>
              <ul className="list-disc list-inside text-gray-700 leading-relaxed mt-4 space-y-2">
                <li><strong>Chrome :</strong> Paramètres &gt; Confidentialité et sécurité &gt; Cookies</li>
                <li><strong>Firefox :</strong> Options &gt; Vie privée et sécurité &gt; Cookies</li>
                <li><strong>Safari :</strong> Préférences &gt; Confidentialité &gt; Cookies</li>
                <li><strong>Edge :</strong> Paramètres &gt; Confidentialité et services &gt; Cookies</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl! font-serif text-gray-900 mb-4">Durée de conservation</h2>
              <p className="text-gray-700 leading-relaxed">
                La durée de conservation des cookies varie selon leur type :
              </p>
              <ul className="list-disc list-inside text-gray-700 leading-relaxed mt-4 space-y-2">
                <li><strong>Cookies de session :</strong> Supprimés à la fermeture de votre navigateur</li>
                <li><strong>Cookies persistants :</strong> Restent sur votre appareil jusqu&apos;à leur expiration ou jusqu&apos;à ce que vous les supprimiez</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl! font-serif text-gray-900 mb-4">Modifications</h2>
              <p className="text-gray-700 leading-relaxed">
                Nous pouvons modifier cette politique de cookies à tout moment. Toute modification sera publiée sur cette page
                avec une date de mise à jour révisée.
              </p>
            </section>

            <section>
              <h2 className="text-2xl! font-serif text-gray-900 mb-4">Contact</h2>
              <p className="text-gray-700 leading-relaxed">
                Pour toute question concernant notre utilisation des cookies, contactez-nous :<br />
                <strong>Email :</strong> <a href="mailto:contact@resetclub.ma" className="text-[#ccbaa8] hover:underline">contact@resetclub.ma</a><br />
                <strong>Téléphone :</strong> + 212 689 464 650
              </p>
            </section>

            <p className="text-sm text-gray-500 mt-8">
              Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

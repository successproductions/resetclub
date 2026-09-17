'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';

/**
 * Les quatre causes du JSON, puis le bloc de conclusion : cinq rangées au
 * total. L'image alterne de côté d'une rangée à l'autre — la première la place
 * à droite, texte à gauche.
 */
const RANGEES = [
  { cle: 'training', image: '/images/nourrir.png' },
  { cle: 'nutrition', image: '/images/adapte.png' },
  { cle: 'nervousSystem', image: '/images/hero/hero60.jpeg' },
  { cle: 'imbalances', image: '/images/hero/hero40.jpeg' },
] as const;

/** Ombre portée légère, mobile uniquement : le texte garde sa couleur et sa place. */
const OMBRE_TEXTE_MOBILE = '[text-shadow:0_1px_1px_rgb(0_0_0/0.2)] md:[text-shadow:none]';

const BiologicalResistanceBlock: React.FC = () => {
  const t = useTranslations('BiologicalResistanceBlock');
  const locale = useLocale();

  return (
    <section className="bg-white px-6 py-2 md:bg-[#fbf8f4] md:py-16">
      <div className="mx-auto max-w-6xl">
        <h2 className={`mb-8 max-w-4xl text-3xl! leading-tight text-gray-950 md:mb-14 md:text-3xl! lg:text-[29px]! ${OMBRE_TEXTE_MOBILE}`}>
          {t('title')}
        </h2>

        <div className="space-y-4 md:space-y-4">
          {RANGEES.map((r, i) => (
            <Rangee key={r.cle} image={r.image} alt={t(`causes.${r.cle}.title`)} imageADroite={i % 2 === 0}>
              <h3 className={`font-graphik text-lg! font-normal text-gray-950 md:text-2xl! ${OMBRE_TEXTE_MOBILE}`}>
                {t(`causes.${r.cle}.title`)}
              </h3>
              <p className={`mt-3 font-graphik text-lg! leading-relaxed text-gray-700 md:text-lg! ${OMBRE_TEXTE_MOBILE}`}>
                {t(`causes.${r.cle}.description`)}
              </p>
              <p className={`mt-3 font-graphik text-lg! font-normal leading-relaxed text-gray-950 md:text-lg! ${OMBRE_TEXTE_MOBILE}`}>
                {t(`causes.${r.cle}.result`)}
              </p>
            </Rangee>
          ))}

          {/* Conclusion : plus de texte ni d'image, seulement l'appel à l'action. */}
          <div className="flex justify-center pt-6 md:pt-10">
            <Link
              href={`/${locale}/payment`}
              className="inline-block cursor-pointer border border-[#524029] bg-transparent px-8 py-4 font-graphik text-lg! font-normal text-gray-900 shadow-lg transition-all duration-300 hover:scale-105 hover:bg-gray-950 hover:text-white hover:shadow-xl md:text-lg!"
            >
              {t('cta')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

/**
 * Une rangée image / texte.
 *
 * L'image vient toujours en premier dans le DOM : sur mobile elle se place donc
 * naturellement au-dessus du texte, et `rc-bleed-mobile` la sort du padding de
 * la section pour qu'elle occupe toute la largeur. Le côté n'est inversé qu'à
 * partir de `md`, via `order`.
 */
function Rangee({
  image,
  alt,
  imageADroite,
  children,
}: {
  image: string;
  alt: string;
  imageADroite: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="grid items-center gap-4 md:grid-cols-2 md:gap-12 lg:gap-16">
      <div
        className={`rc-bleed-mobile relative aspect-[3/2] overflow-hidden bg-black md:aspect-[5/4] ${imageADroite ? 'md:order-2' : 'md:order-1'
          }`}
      >
        <Image
          src={image}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 46vw"
        />
      </div>

      <div className={imageADroite ? 'md:order-1' : 'md:order-2'}>{children}</div>
    </div>
  );
}

export default BiologicalResistanceBlock;

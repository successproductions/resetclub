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
  { cle: 'training', image: '/images/hero/hero8.jpeg' },
  { cle: 'nutrition', image: '/images/hero/hero4.jpeg' },
  { cle: 'nervousSystem', image: '/images/hero/hero6.jpeg' },
  { cle: 'imbalances', image: '/images/hero/hero9.jpeg' },
] as const;

/** Rangée de conclusion : « ce n'est pas votre faute », puis l'appel à l'action. */
const IMAGE_CONCLUSION = '/images/hero/hero7.jpeg';

const BiologicalResistanceBlock: React.FC = () => {
  const t = useTranslations('BiologicalResistanceBlock');
  const locale = useLocale();

  return (
    <section className="bg-white px-6 py-10 md:bg-[#fbf8f4] md:py-16">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-10 max-w-4xl text-3xl! leading-tight text-gray-950 md:mb-14 md:text-3xl! lg:text-[29px]!">
          {t('title')}
        </h2>

        <div className="space-y-12 md:space-y-16">
          {RANGEES.map((r, i) => (
            <Rangee key={r.cle} image={r.image} alt={t(`causes.${r.cle}.title`)} imageADroite={i % 2 === 0}>
              <h3 className="font-graphik text-lg! font-normal text-gray-950 md:text-lg!">
                {t(`causes.${r.cle}.title`)}
              </h3>
              <p className="mt-3 font-graphik text-lg! leading-relaxed text-gray-700 md:text-lg!">
                {t(`causes.${r.cle}.description`)}
              </p>
              <p className="mt-3 font-graphik text-lg! font-normal leading-relaxed text-gray-950 md:text-lg!">
                {t(`causes.${r.cle}.result`)}
              </p>
            </Rangee>
          ))}

          {/* Cinquième rangée : l'image repasse à droite, la suite d'une alternance à quatre. */}
          <Rangee image={IMAGE_CONCLUSION} alt={t('fault')} imageADroite>
            <p className="font-graphik text-lg! font-normal text-gray-950 md:text-lg!">
              {t('fault')}
            </p>
            <p className="mt-3 font-graphik text-lg! leading-relaxed text-gray-700 md:text-lg!">
              {t('closing')}
            </p>
            <Link
              href={`/${locale}/payment`}
              className="mt-6 inline-block cursor-pointer border border-[#524029] bg-transparent px-8 py-4 font-graphik text-lg! font-normal text-gray-900 shadow-lg transition-all duration-300 hover:scale-105 hover:bg-gray-950 hover:text-white hover:shadow-xl md:text-lg!"
            >
              {t('cta')}
            </Link>
          </Rangee>
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
    <div className="grid items-center gap-6 md:grid-cols-2 md:gap-12 lg:gap-16">
      <div
        className={`rc-bleed-mobile relative aspect-[4/3] overflow-hidden bg-black md:aspect-[5/4] ${
          imageADroite ? 'md:order-2' : 'md:order-1'
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

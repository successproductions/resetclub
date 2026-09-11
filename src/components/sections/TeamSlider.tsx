'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { X } from 'lucide-react';

type TeamMember = {
  id: number;
  key: string;
  image: string;
  /** Mosaic placement: mobile spans first, desktop placement from `lg:`. */
  tileClassName: string;
};

const teamMembers: TeamMember[] = [
  {
    id: 1,
    key: 'fatima',
    image: 'https://media.sixsenses.com/B60H3R33/at/59kb6f3rfrq76gn8fb9gng7/Alphinah_Ashinai.jpg?format=webp&width=680&height=900&fit=crop',
    tileClassName: 'col-span-2 row-span-2 lg:col-start-3 lg:col-span-2 lg:row-start-1 lg:row-span-1',
  },
  {
    id: 2,
    key: 'nahed',
    image: '/images/nahed1.png',
    tileClassName: 'col-span-1 row-span-3 lg:col-start-5 lg:col-span-1 lg:row-start-1 lg:row-span-2',
  },
  {
    id: 3,
    key: 'amina',
    image: 'https://media.sixsenses.com/B60H3R33/at/59kb6f3rfrq76gn8fb9gng7/Alphinah_Ashinai.jpg?format=webp&width=680&height=900&fit=crop',
    tileClassName: 'col-span-1 row-span-3 lg:col-start-3 lg:col-span-1 lg:row-start-2 lg:row-span-1',
  },
  {
    id: 4,
    key: 'salima',
    image: 'https://media.sixsenses.com/B60H3R33/at/3cfgp7953pj9t9f3tbqj9p6/Wellness_Acupuncture.jpg?format=webp&width=680&height=900&fit=crop',
    tileClassName: 'col-span-1 row-span-2 lg:col-start-4 lg:col-span-1 lg:row-start-2 lg:row-span-3',
  },
  {
    id: 5,
    key: 'yasmine',
    image: '/images/hero/hero7.jpeg',
    tileClassName: 'col-span-1 row-span-2 lg:col-start-2 lg:col-span-1 lg:row-start-3 lg:row-span-1',
  },
  {
    id: 6,
    key: 'rim',
    image: '/images/hero/hero8.jpeg',
    tileClassName: 'col-span-1 row-span-3 lg:col-start-3 lg:col-span-1 lg:row-start-3 lg:row-span-2',
  },
  {
    id: 7,
    key: 'Siham',
    image: '/images/siam.jpeg',
    tileClassName: 'col-span-1 row-span-3 lg:col-start-5 lg:col-span-1 lg:row-start-3 lg:row-span-2',
  },
  {
    id: 8,
    key: 'alexandre',
    image: 'https://media.sixsenses.com/B60H3R33/at/3cfgp7953pj9t9f3tbqj9p6/Wellness_Acupuncture.jpg?format=webp&width=680&height=900&fit=crop',
    tileClassName: 'col-span-2 row-span-2 lg:col-start-1 lg:col-span-2 lg:row-start-4 lg:row-span-2',
  },
  {
    id: 9,
    key: 'youssef',
    image: '/images/hero/hero5.jpeg',
    tileClassName: 'col-span-1 row-span-3 lg:col-start-3 lg:col-span-2 lg:row-start-5 lg:row-span-1',
  },
  {
    id: 10,
    key: 'sofia',
    image: '/images/woman-put.jpg',
    tileClassName: 'col-span-1 row-span-3 lg:col-start-5 lg:col-span-1 lg:row-start-5 lg:row-span-1',
  },
];

const TeamSlider: React.FC = () => {
  const t = useTranslations('TeamPage.team');
  const [selected, setSelected] = useState<TeamMember | null>(null);

  // Close on Escape and freeze the page behind the lightbox.
  useEffect(() => {
    if (!selected) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelected(null);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [selected]);

  return (
    <section id="notre-equipe" className="py-5 bg-white md:py-10">
      <div className="mx-auto max-w-[1520px] px-5 md:px-10">
        <div className="lg:grid lg:grid-cols-5 lg:auto-rows-[132px] lg:gap-4 xl:auto-rows-[152px]">
          {/* Heading */}
          <div className="mb-8 lg:mb-0 lg:col-start-1 lg:col-span-2 lg:row-start-1 lg:row-span-2 lg:pr-8">
            <h2 className="font-inter text-[26px]! font-normal! italic leading-[1.25]! text-gray-900 md:text-[34px]!">
              <span className="mr-5 hidden h-px w-[76px] translate-y-[-9px] bg-gray-400 align-middle lg:inline-block" aria-hidden="true"></span>
              {t('expertsTitle')}
            </h2>
            <p className="mt-5 font-graphik text-base leading-[1.55] text-gray-800 md:mt-6 md:text-[17px]">
              {t('subtitle')}
            </p>
          </div>

          {/* Mosaic: its own grid on mobile, dissolved into the outer grid from lg. */}
          <div className="rc-bleed-mobile grid grid-flow-row-dense grid-cols-2 auto-rows-[110px] gap-3 md:auto-rows-[140px] md:gap-4 lg:contents">
            {teamMembers.map((member) => (
              <button
                key={member.id}
                type="button"
                onClick={() => setSelected(member)}
                aria-label={t(`members.${member.key}.name`)}
                className={`group relative block overflow-hidden bg-gray-200 text-left ${member.tileClassName}`}
              >
                <Image
                  src={member.image}
                  alt={t(`members.${member.key}.name`)}
                  fill
                  sizes="(max-width: 1024px) 50vw, 40vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/15 to-transparent"></div>
                <div className="absolute inset-x-0 bottom-0 px-4 pb-3.5 md:px-5 md:pb-4">
                  <p className="font-graphik text-[15px] font-normal leading-tight text-white">
                    {t(`members.${member.key}.name`)}
                  </p>
                  <p className="mt-1 font-graphik text-[12px] leading-[1.3] text-white/80">
                    {t(`members.${member.key}.role`)}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {selected && (
        <div
          onClick={(event) => {
            if (event.target === event.currentTarget) setSelected(null);
          }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 md:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={t(`members.${selected.key}.name`)}
        >
          <div className="relative max-h-full w-full max-w-3xl overflow-hidden bg-black">
            <div className="relative aspect-4/5 w-full md:aspect-3/2">
              <Image
                src={selected.image}
                alt={t(`members.${selected.key}.name`)}
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/25 to-black/10"></div>

              <button
                type="button"
                onClick={() => setSelected(null)}
                aria-label="Close"
                className="absolute right-4 top-4 text-white/90 transition-colors hover:text-white md:right-6 md:top-6"
              >
                <X size={28} />
              </button>

              <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                <p className="font-graphik text-lg leading-tight text-white md:text-xl">
                  {t(`members.${selected.key}.name`)}
                </p>
                <p className="mt-1 font-graphik text-base leading-tight text-white/90 md:text-lg">
                  {t(`members.${selected.key}.role`)}
                </p>
                {t.has(`members.${selected.key}.description`) && (
                  <p className="mt-5 max-w-2xl font-graphik text-sm leading-relaxed text-white/80 md:text-base">
                    {t(`members.${selected.key}.description`)}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default TeamSlider;

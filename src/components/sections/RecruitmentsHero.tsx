import { useTranslations } from 'next-intl';

export default function RecruitmentsHero() {
  const t = useTranslations('RecrutonsPage');

  return (
    <div
      className="relative pt-32 pb-12 md:pb-20  min-h-[20dvh] md:min-h-[28dvh] flex items-center justify-center"
      style={{
        backgroundImage: `url('/PALMSBACKGROUND.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="container mx-auto px-2 mt-4 md:px-6 text-center relative z-10">
        <h1 className="text-2xl md:text-3xl lg:text-5xl text-white mb-1 md:mb-6 drop-shadow-lg">
          {t('hero.title')}
        </h1>
        <p className="text-sm md:text-1xl text-white max-w-4xl mx-auto leading-relaxed drop-shadow-lg">
          {t('hero.subtitle')}
        </p>
      </div>
    </div>
  );
}
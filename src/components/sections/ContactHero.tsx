import { useTranslations } from 'next-intl';

export default function ContactHero() {
  const t = useTranslations('ContactPage');

  return (
    <div
      className="relative pt-30 pb-10 md:pb-20 min-h-[38vh] flex items-center justify-center"
      style={{
        backgroundImage: `url('/PALMSBACKGROUND.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="container mx-auto px-2 pt-6 md:px-6 text-center relative z-10">
        <h1 className="text-2xl md:text-3xl lg:text-5xl font-graphik  text-white mb-1 md:mb-6 drop-shadow-lg">
          {t('title').toUpperCase()}
        </h1>
        {/* <p className="text-sm md:text-1xl text-white max-w-4xl mx-auto leading-relaxed drop-shadow-lg">
          {t('subtitle')}
        </p> */}
      </div>
    </div>
  );
}
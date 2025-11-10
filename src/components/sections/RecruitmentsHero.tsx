import { useTranslations } from 'next-intl';

export default function RecruitmentsHero() {
  const t = useTranslations('RecrutonsPage');

  return (
    <section className="relative h-[38vh]  flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="https://rakxawellness.com/wp-content/uploads/2025/08/website-banner-vdo.mp4" type="video/mp4" />
        </video>

        {/* Video Overlay */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 mt-28 md:mt-18 text-center px-6 max-w-4xl mx-auto">
        <h1 className="text-2xl md:text-4xl lg:text-5xl uppercase text-white mb-4 font-normal font-graphik tracking-tight">
          {t('hero.title')}
        </h1>
        <p className="text-lg md:text-xl lg:text-1xl text-white font-graphik tracking-wide">
          {t('hero.subtitle')}
        </p>
      </div>

      {/* Background Pattern Overlay */}
      <div className="absolute inset-0 z-5 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-amber-500/20 to-transparent" />
      </div>
    </section>
  );
}
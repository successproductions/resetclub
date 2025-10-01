import { useTranslations } from 'next-intl';

export default function TeamHero() {
  const t = useTranslations('TeamPage');

  return (
    <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
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
      <div className="relative z-10 mt-14 md:mt-0 text-center px-6 max-w-4xl mx-auto">
        <h1 className="text-white mb-8">
          <div className="text-3xl md:text-4xl lg:text-6xl xl:text-7xl font-normal tracking-tight text-white">
            {t('video.title').toUpperCase()}
          </div>
          <div className="text-sm md:text-xl lg:text-1xl font-light mb-4 tracking-wide text-white">
            {t('video.subtitle')}
          </div>
        </h1>
      </div>

      {/* Background Pattern Overlay */}
      <div className="absolute inset-0 z-5 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-amber-500/20 to-transparent" />
      </div>
    </section>
  );
}
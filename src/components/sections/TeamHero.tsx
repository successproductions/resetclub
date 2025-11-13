import { useTranslations } from 'next-intl';

export default function TeamHero() {
  const t = useTranslations('TeamPage');

  return (
    <section className="relative h-[38vh] flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="https://rakxawellness.com/wp-content/uploads/2025/08/website-banner-vdo.mp4" type="video/mp4" />
        </video>

        {/* Video Overlay */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 mt-4 md:mt-18 text-center px-6 max-w-4xl mx-auto">
        <h3 className="text-white mb-8">
          <div className="text-3xl md:text-4xl lg:text-5xl  xl:text-5xl font-normal font-graphik tracking-tight text-white">
            {t('video.title')}
          </div>
          <div className="text-lg md:text-xl mt-4 md:mt-0 lg:text-1xl font-graphik  md:mb-4 tracking-wide text-white">
            {t('video.subtitle')}
          </div>
        </h3>
      </div>

      {/* Background Pattern Overlay */}
      <div className="absolute inset-0 z-5 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-amber-500/20 to-transparent" />
      </div>
    </section>
  );
}